<script>
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

export let id = 'ID';
export let options = [];
export let value = 0;
export let className = '';

let select;
let title;
let list;

let isOpen = false;

function listtoggle() {
  isOpen = !isOpen
  if (isOpen) {
    select.focus();
    select.addEventListener('focusout', () => {
      isOpen = !isOpen
    }, {once: true})
  }
}

function optionselect(event) {
  value = event.target.value
  select.blur();
  dispatch('optionselect', {
    value: value
  });
}
</script>

<div id="{id}" tabindex="-1" value={value} class="selector__container" bind:this={select}>
  <span class="selector {className}" bind:this={title} on:click={listtoggle}>{options[value]}</span>
  {#if isOpen}
    <ul class="selector__list {className}" bind:this={list}>
      {#each options as opt, i}
        <li class="selector__item" value="{i}" on:click={optionselect}>{opt}</li>
      {/each}
    </ul>
  {/if}
</div>

<style lang="scss">
@import "../scss/variables";
.selector {
  border: none;
  border-radius: 0;
  background: none;
  padding: 0;
  width: fit-content;
  text-align: center;
  padding-bottom: 8px;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    background: #6A6A6A;
    bottom: 0;
    left: 0;
    transition: all 0.5s ease;
  }

  &:hover {
    &::after {
      bottom: 6px;
    }
  }
}

.selector__container {
  display: inline-block;
}

.selector__list {
  position: absolute;
  padding: 0 10px;
  border-radius: 5px;
  background: rgba(0,0,0,0.1);
  @supports not (backdrop-filter: blur(30px)) {
    background: rgba(62,62,62,0.9)
  }
  backdrop-filter: blur(30px);
  overflow: hidden;
  transition: 0.3s all ease;
  top: -8px;
  left: -10px;
  z-index: 10;
  opacity: 1;
}

.selector__item {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: rel(1920, 18);
  line-height: rel(1920, 22);
  color: #C9C9C9;
  cursor: pointer;
  margin: 10px auto;
  white-space: nowrap;

  &--active {
    color: #FFFFFF;
  }

  @media (max-width: 1023px) {
    font-size: 18px;
    line-height: 22px;
    margin-right: 15px;
  }

  @media (max-width: 567px) {
    font-size: 16px;
    line-height: 20px;
  }
}

</style>
