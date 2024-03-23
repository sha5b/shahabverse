import { Vector3 } from 'three';
import { writable } from 'svelte/store';

export const bgGridSize = writable(new Vector3(1000, 1000, 1000));
export const bgGridCellSize = writable(10);
export const bgGridColor = writable('black');
export const bgGridLinewidth = writable(1);
export const bgGridOpacity = writable(.25);
