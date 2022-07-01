import { writable } from 'svelte/store';

export const status = writable();
export const data = writable();
export const req = writable([]);
