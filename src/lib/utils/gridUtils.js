//@ts-nocheck
import { Vector3 } from 'three';

export const createGridLinesGeometry = (size, divisions) => {
    const halfSize = size.clone().multiplyScalar(0.5);
    const stepSize = size.clone().divideScalar(divisions);

    const lines = [];

    // Horizontal lines (top and bottom)
    for (let i = 0; i <= divisions; i++) {
        for (let j = 0; j <= divisions; j++) {
            const start = new Vector3(-halfSize.x + i * stepSize.x, -halfSize.y + j * stepSize.y, -halfSize.z);
            const end = new Vector3(-halfSize.x + i * stepSize.x, -halfSize.y + j * stepSize.y, halfSize.z);
            lines.push([start, end]);
        }
    }

    // Vertical lines (left and right)
    for (let i = 0; i <= divisions; i++) {
        for (let k = 0; k <= divisions; k++) {
            const start = new Vector3(-halfSize.x + i * stepSize.x, -halfSize.y, -halfSize.z + k * stepSize.z);
            const end = new Vector3(-halfSize.x + i * stepSize.x, halfSize.y, -halfSize.z + k * stepSize.z);
            lines.push([start, end]);
        }
    }

    // Depth lines (front and back)
    for (let j = 0; j <= divisions; j++) {
        for (let k = 0; k <= divisions; k++) {
            const start = new Vector3(-halfSize.x, -halfSize.y + j * stepSize.y, -halfSize.z + k * stepSize.z);
            const end = new Vector3(halfSize.x, -halfSize.y + j * stepSize.y, -halfSize.z + k * stepSize.z);
            lines.push([start, end]);
        }
    }

    return lines;
};
