import { Vector3 } from 'three';
import { writable } from 'svelte/store';

//BackgroundGrid
export let bgGridSize = writable(new Vector3(1000, 1000, 1000));
export let bgGridCellSize = writable(100);
export let bgGridColor = writable('black');
export let bgGridLinewidth = writable(3);
export let bgGridOpacity = writable(1);

