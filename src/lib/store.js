import { Vector3 } from 'three';
import { writable } from 'svelte/store';

export const bgGridSize = writable(new Vector3(10000, 10000, 10000));
export const bgGridCellSize = writable(15);
export const bgGridColor = writable('black');
export const bgGridLinewidth = writable(5);
export const bgGridOpacity = writable(.25);

export const categories = writable([]);
export const works = writable([]);
export const cellSize = writable(10);
export const spacingFactor = writable(10);
export const updatedCategories = writable([]);
export const categoryPositions = writable(new Map());