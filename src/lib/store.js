import { Vector3 } from 'three';
import { writable, derived } from 'svelte/store';

export const gridSize = writable(new Vector3(10000, 10000, 10000));

export const gridColor = writable('blue');
export const gridLinewidth = writable(2);
export const gridOpacity = writable(.75);
export const cellDivision = writable(10);
export const spacingFactor = writable(10);
export const cellSize = derived(
    [gridSize, cellDivision],
    ([$gridSize, $cellDivision]) => $gridSize.x / $cellDivision
);

export const categories = writable([]);
export const categoryPositions = writable(new Map());

export const works = writable([]);
export const workPositions = writable(new Map());

export const workSize = new Vector3(100, 100, 100);

