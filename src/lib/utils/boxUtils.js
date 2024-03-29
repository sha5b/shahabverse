// @ts-nocheck
import { Vector3 } from 'three';

export const createBoxLines = (size) => {
    const hx = size.x * 0.5;
    const hy = size.y * 0.5;
    const hz = size.z * 0.5;

    // You can initialize these only once outside of this function if 'size' doesn't change
    const corners = [
        { x: -hx, y: -hy, z: -hz },
        { x:  hx, y: -hy, z: -hz },
        { x:  hx, y: -hy, z:  hz },
        { x: -hx, y: -hy, z:  hz },
        { x: -hx, y:  hy, z: -hz },
        { x:  hx, y:  hy, z: -hz },
        { x:  hx, y:  hy, z:  hz },
        { x: -hx, y:  hy, z:  hz }
    ];

    // Preallocate the array with the known size to avoid push() overhead
    const lines = new Array(12);
    
    // Directly assign pairs
    lines[0] = [corners[0], corners[1]];
    lines[1] = [corners[1], corners[2]];
    lines[2] = [corners[2], corners[3]];
    lines[3] = [corners[3], corners[0]];
    lines[4] = [corners[4], corners[5]];
    lines[5] = [corners[5], corners[6]];
    lines[6] = [corners[6], corners[7]];
    lines[7] = [corners[7], corners[4]];
    lines[8] = [corners[0], corners[4]];
    lines[9] = [corners[1], corners[5]];
    lines[10] = [corners[2], corners[6]];
    lines[11] = [corners[3], corners[7]];

    return lines;
};