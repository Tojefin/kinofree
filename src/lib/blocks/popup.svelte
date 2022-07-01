<script>
import { onMount } from "svelte"
import { active } from "$lib/elements/popups/store-popup.js";
import { fade } from 'svelte/transition';

let templates;
let popup;

$: active, activeObserver($active);
const activeObserver = (x) => {
  popupShow(x)
}

onMount(() => {
  urlfix()
})

function urlfix() {
  window.onhashchange = function(event) {
    if (event.oldURL.split('#').reverse()[0] == 'popup') {
      return popupShow();
    }
  }

  if (window.location.href.split('#').reverse()[0] == 'popup') {
    history.replaceState("", document.title, window.location.pathname + window.location.search);
  }
}

function popupShow(id) {
  if (id) {
    popup =  templates.querySelector('#'+id).outerHTML;
    window.location.hash = 'popup';
    window.addEventListener('click', function(event){
      if (event.target.id == "container") {popupShow();}
    })
    return
  }

  if ($active) {
    container.innerHTML = '';
    history.replaceState("", document.title, window.location.pathname + window.location.search);
    return $active = undefined
  }
}

</script>
{#if $active}
  <div transition:fade class="popup-container" id="container">{@html popup}</div>
{/if}
<div id="popups" class="hide" bind:this={templates}>
  <slot></slot>
</div>

<style lang="scss">
@import "../scss/variables";

.popup-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  height: 100vh;
  width: 100vw;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
  transition: all ease 0.3s;
  backdrop-filter: blur(7px);
  opacity: 1;
  z-index: 10;
}
</style>
