import { Vector3 } from 'three';
import { writable, derived } from 'svelte/store';

export const gridSize = writable(new Vector3(10000, 10000, 10000));

export const gridColor = writable('blue');
export const gridLinewidth = writable(2);
export const gridOpacity = writable(.75);

export const categories = writable([]);
export const works = writable([]);
export const cellSize = writable(10);
export const spacingFactor = writable(10);
export const updatedCategories = writable([]);
export const categoryPositions = writable(new Map());

export const cellSizeZ = derived(
    [gridSize, cellSize],
    ([$gridSize, $cellSize]) => $gridSize.x / $cellSize
);
