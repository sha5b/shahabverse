import { Vector3 } from 'three';
import { writable, derived } from 'svelte/store';

export const gridSize = writable(new Vector3(10000, 10000, 10000));
export const cellDivision = writable(10);
export const smallCellDivision = writable(4);
export const gridColor = writable('white');
export const gridLinewidth = writable(2);
export const gridOpacity = writable(.25);
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
export const categoryId = writable(null);

export const works = writable([]);
export const workPositions = writable(new Map());
export const workId = writable(null);

export const isCameraMoving = writable(false)
export const active = writable(false)

export const pirmaryColor = writable('#000000');
export const secondaryColor = writable('#ffffff');
