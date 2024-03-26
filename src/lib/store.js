import { Vector3 } from 'three';
import { writable, derived } from 'svelte/store';

export const gridSize = writable(new Vector3(10000, 10000, 10000));
export const cellDivision = writable(10);
export const smallCellDivision = writable(3);
export const gridColor = writable('#a6bba1');
export const gridLinewidth = writable(5);
export const gridOpacity = writable(.75);
export const spacingFactor = writable(1);
export const cellSize = derived(
    [gridSize, cellDivision],
    ([$gridSize, $cellDivision]) => $gridSize.x / $cellDivision
);
export const smallCellSize = derived(
    [cellSize, smallCellDivision],
    ([$cellSize, $smallCellDivision]) => $cellSize / $smallCellDivision
);

export const categories = writable([]);
export const categoryPositions = writable(new Map());

export const works = writable([]);
export const workPositions = writable(new Map());

export const workSize = writable( new Vector3(100, 100, 100));

