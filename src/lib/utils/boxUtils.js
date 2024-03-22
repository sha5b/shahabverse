// @ts-nocheck
import { Vector3 } from 'three';

export const createBoxLines = (size) => {
    const halfSize = size.clone().multiplyScalar(0.5);
    const corners = [
        new Vector3(-halfSize.x, -halfSize.y, -halfSize.z),
        new Vector3(halfSize.x, -halfSize.y, -halfSize.z),
        new Vector3(halfSize.x, -halfSize.y, halfSize.z),
        new Vector3(-halfSize.x, -halfSize.y, halfSize.z),
        new Vector3(-halfSize.x, halfSize.y, -halfSize.z),
        new Vector3(halfSize.x, halfSize.y, -halfSize.z),
        new Vector3(halfSize.x, halfSize.y, halfSize.z),
        new Vector3(-halfSize.x, halfSize.y, halfSize.z)
    ];

    const pairs = [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 0],
        [4, 5],
        [5, 6],
        [6, 7],
        [7, 4],
        [0, 4],
        [1, 5],
        [2, 6],
        [3, 7]
    ];

    return pairs.map(([start, end]) => [corners[start], corners[end]]);
};