import { Vector3 } from 'three';
import { writable } from 'svelte/store';

//BackgroundGrid
export let bgGridSize = writable(new Vector3(10000, 10000, 10000));
export let bgGridCellSize = writable(500);
export let bgGridColor = writable('black');
export let bgGridLinewidth = writable(1);
export let bgGridOpacity = writable(.25);

