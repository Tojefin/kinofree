#!/bin/sh
set -eu

# ==========================================
# CONFIGURATION
# ==========================================

OWNER="tojefin"
REPO="kinofree"
BRANCH="gh-pages"
PORT="8080"

BASE_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
SITE_DIR="$BASE_DIR/site"
TEMP_DIR="$BASE_DIR/temp"
VERSION_FILE="$BASE_DIR/version.txt"
SITE_ZIP="$BASE_DIR/site.zip"
NEW_SITE="$BASE_DIR/.site-new.$$"
BACKUP_DIR="$BASE_DIR/.site-backup.$$"
VERSION_TMP="$BASE_DIR/.version-new.$$"

API_URL="https://api.github.com/repos/$OWNER/$REPO/tags"
SITE_URL="https://github.com/$OWNER/$REPO/archive/refs/heads/$BRANCH.zip"

# ==========================================
# HELPERS
# ==========================================

say() {
    printf '%s\n' "$*"
}

fail() {
    printf '\nERROR: %s\n' "$*" >&2
    exit 1
}

SWAPPED=0
COMMITTED=0

cleanup() {
    rm -rf "$TEMP_DIR" "$SITE_ZIP" "$NEW_SITE" "$VERSION_TMP"

    # Restore the previous site if an update was interrupted or failed.
    if [ "$COMMITTED" -eq 0 ] && [ "$SWAPPED" -eq 1 ]; then
        rm -rf "$SITE_DIR"
        if [ -d "$BACKUP_DIR" ]; then
            mv "$BACKUP_DIR" "$SITE_DIR" || true
        fi
    else
        rm -rf "$BACKUP_DIR"
    fi
}

trap cleanup EXIT
trap 'exit 1' HUP INT TERM

# ==========================================
# CHECK DEPENDENCIES
# ==========================================

PYTHON_BIN=${PYTHON_BIN:-}
if [ -z "$PYTHON_BIN" ]; then
    PYTHON_BIN=$(command -v python3 || true)
fi

[ -n "$PYTHON_BIN" ] || fail "Python 3 is not installed. Install Python 3 and run this script again."
command -v curl >/dev/null 2>&1 || fail "curl is not installed."

cd "$BASE_DIR"

say ""
say "=========================================="
say "         LOCAL WEBSITE LAUNCHER"
say "=========================================="
say ""

# ==========================================
# CHECK LATEST GITHUB TAG
# ==========================================

say "Checking latest version..."

TAGS_JSON=$(curl -fsSL \
    -H "Accept: application/vnd.github+json" \
    -H "User-Agent: LocalWebsiteLauncher" \
    "$API_URL") || fail "Could not retrieve GitHub tags. Check your internet connection or GitHub API availability."

LATEST_TAG=$(printf '%s' "$TAGS_JSON" | "$PYTHON_BIN" -c '
import json
import sys

try:
    tags = json.load(sys.stdin)
    if not isinstance(tags, list) or not tags:
        raise ValueError("No tags found")
    print(tags[0]["name"])
except Exception as exc:
    print("Could not parse GitHub tags: " + str(exc), file=sys.stderr)
    sys.exit(1)
') || fail "Could not determine the latest GitHub tag."

CURRENT_TAG=""
if [ -f "$VERSION_FILE" ]; then
    IFS= read -r CURRENT_TAG < "$VERSION_FILE" || true
fi

say "Local version:  ${CURRENT_TAG:-none}"
say "Latest version: $LATEST_TAG"

if [ "$CURRENT_TAG" = "$LATEST_TAG" ] && [ -f "$SITE_DIR/index.html" ]; then
    say ""
    say "Website is up to date."
else
    # ==========================================
    # DOWNLOAD LATEST GH-PAGES BUILD
    # ==========================================

    say ""
    say "Updating website from $BRANCH..."

    rm -rf "$TEMP_DIR" "$NEW_SITE" "$BACKUP_DIR"
    mkdir -p "$TEMP_DIR"

    curl -fL --progress-bar "$SITE_URL" -o "$SITE_ZIP" \
        || fail "Could not download the website archive."

    if ! "$PYTHON_BIN" - "$SITE_ZIP" "$TEMP_DIR" <<'PYTHON_EXTRACT'
import os
import sys
from zipfile import BadZipFile, ZipFile

archive_path, destination = sys.argv[1], os.path.abspath(sys.argv[2])

try:
    with ZipFile(archive_path) as archive:
        # Reject paths that would extract files outside the temporary directory.
        for entry in archive.infolist():
            target = os.path.abspath(os.path.join(destination, entry.filename))
            if os.path.commonpath((destination, target)) != destination:
                raise ValueError(f"Unsafe path in archive: {entry.filename}")

        archive.extractall(destination)
except (BadZipFile, OSError, ValueError) as exc:
    print(f"Could not extract the website archive: {exc}", file=sys.stderr)
    sys.exit(1)
PYTHON_EXTRACT
    then
        fail "Could not extract the website archive."
    fi

    ROOT_DIR=""
    for candidate in "$TEMP_DIR"/*; do
        if [ -d "$candidate" ]; then
            ROOT_DIR=$candidate
            break
        fi
    done

    [ -n "$ROOT_DIR" ] || fail "The downloaded archive is empty or has an invalid structure."
    [ -f "$ROOT_DIR/index.html" ] || fail "index.html was not found in the downloaded archive."

    mkdir -p "$NEW_SITE"
    cp -R "$ROOT_DIR"/. "$NEW_SITE"/ \
        || fail "Could not prepare the new website files."

    # Replace the old site only after the new archive has been validated.
    if [ -e "$SITE_DIR" ]; then
        mv "$SITE_DIR" "$BACKUP_DIR" || fail "Could not back up the current website."
    fi
    SWAPPED=1

    mv "$NEW_SITE" "$SITE_DIR" || fail "Could not install the new website files."

    printf '%s\n' "$LATEST_TAG" > "$VERSION_TMP" \
        || fail "Could not write the version file."
    mv "$VERSION_TMP" "$VERSION_FILE" \
        || fail "Could not update the version file."

    COMMITTED=1
    rm -rf "$BACKUP_DIR"

    say "Website updated to $LATEST_TAG."
fi

# ==========================================
# START SERVER
# ==========================================

say ""
say "=========================================="
say "Website: http://localhost:$PORT"
say "Version: $LATEST_TAG"
say "Press CTRL+C to stop the server."
say "=========================================="
say ""

# Open the website in the default browser where possible.
if command -v open >/dev/null 2>&1; then
    open "http://localhost:$PORT" >/dev/null 2>&1 || true
elif command -v xdg-open >/dev/null 2>&1; then
    xdg-open "http://localhost:$PORT" >/dev/null 2>&1 || true
fi

# Lightweight HTTP server with Apache-like extensionless .html fallback.
"$PYTHON_BIN" -u - "$PORT" <<'PY'
import os
import sys
from http.server import HTTPServer, SimpleHTTPRequestHandler

ROOT = os.path.abspath("site")
HOST = "0.0.0.0"
PORT = int(sys.argv[1])


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def translate_path(self, path):
        translated = super().translate_path(path)

        if os.path.isfile(translated) or os.path.isdir(translated):
            return translated

        if not os.path.splitext(translated)[1]:
            html_path = translated + ".html"
            if os.path.isfile(html_path):
                return html_path

        return translated

    def log_message(self, format, *args):
        pass


if __name__ == "__main__":
    try:
        print(f"Serving {ROOT} at http://localhost:{PORT}", flush=True)
        HTTPServer((HOST, PORT), Handler).serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped", flush=True)
PY
