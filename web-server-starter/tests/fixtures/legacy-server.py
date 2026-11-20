import os
from http.server import HTTPServer, SimpleHTTPRequestHandler

ROOT = os.path.join(os.path.dirname(__file__), "site")
HOST = "0.0.0.0"
PORT = 8080

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def translate_path(self, path):
        path = super().translate_path(path)

        if os.path.isfile(path) or os.path.isdir(path):
            return path

        if not os.path.splitext(path)[1]:
            html_path = path + ".html"
            if os.path.isfile(html_path):
                return html_path

        return path

    def log_message(self, format, *args):
        pass

if __name__ == "__main__":
    try:
        HTTPServer((HOST, PORT), Handler).serve_forever()
    except KeyboardInterrupt:
        print('Server stopped', flush=True)
