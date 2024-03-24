// utils.js
//@ts-nocheck
import { Vector3 } from 'three';

// Utility function to round a value to the nearest cell size
export function roundToCellSize(value, cellSize) {
    return Math.round(value / cellSize) * cellSize;
}

// Utility function to round a Vector3 to the nearest cell size
export function roundVectorToCellSize(vector, cellSize) {
    return new Vector3(
        roundToCellSize(vector.x, cellSize),
        roundToCellSize(vector.y, cellSize),
        roundToCellSize(vector.z, cellSize)
    );
}

// Utility function to generate a random grid position within a given range and size
export function getRandomGridPosition(range, size) {
    const step = Math.max(size.x, size.y, size.z);
    return new Vector3(
        Math.floor(Math.random() * ((range.x - size.x) / step)) * step - (range.x - size.x) / 2,
        Math.floor(Math.random() * ((range.y - size.y) / step)) * step - (range.y - size.y) / 2,
        Math.floor(Math.random() * ((range.z - size.z) / step)) * step - (range.z - size.z) / 2
    );
}

// Utility function to compute a hash key based on position and cell size
function computeHashKey(position, cellSize) {
    return `${Math.floor(position.x / cellSize)},${Math.floor(position.y / cellSize)},${Math.floor(position.z / cellSize)}`;
}

// Utility function to check if a position overlaps with any existing positions
function isOverlapping(position, size, categoryPositions, spatialHash, cellSize) {
    const minX = Math.floor((position.x - size.x) / cellSize);
    const maxX = Math.floor((position.x + size.x) / cellSize);
    const minY = Math.floor((position.y - size.y) / cellSize);
    const maxY = Math.floor((position.y + size.y) / cellSize);
    const minZ = Math.floor((position.z - size.z) / cellSize);
    const maxZ = Math.floor((position.z + size.z) / cellSize);

    for (let x = minX; x <= maxX; x++) {
        for (let y = minY; y <= maxY; y++) {
            for (let z = minZ; z <= maxZ; z++) {
                const key = computeHashKey(new Vector3(x * cellSize, y * cellSize, z * cellSize), cellSize);
                const otherPositions = spatialHash[key];
                if (otherPositions) {
                    for (let otherPosition of otherPositions) {
                        if (
                            position.x < otherPosition.x + size.x &&
                            position.x + size.x > otherPosition.x &&
                            position.y < otherPosition.y + size.y &&
                            position.y + size.y > otherPosition.y &&
                            position.z < otherPosition.z + size.z &&
                            position.z + size.z > otherPosition.z
                        ) {
                            return true;
                        }
                    }
                }
            }
        }
    }
    return false;
}

// Utility function to generate unique positions for each category
export function generateUniquePositions(categories, range, categoryPositions, cellSize) {
    const spatialHash = {};

    categories.forEach((category) => {
        let pos;
        do {
            pos = roundVectorToCellSize(getRandomGridPosition(range, category.size), cellSize);
        } while (isOverlapping(pos, category.size, categoryPositions, spatialHash, cellSize));

        const key = computeHashKey(pos, cellSize);
        if (!spatialHash[key]) {
            spatialHash[key] = [];
        }
        spatialHash[key].push(pos);
        categoryPositions.set(category.id, pos);
    });
}

// Utility function to count the number of works per category
export function countWorksPerCategory(works, categoryId) {
    return works.filter((work) => work.category === categoryId).length;
}

// Utility function to calculate the scaled size of a category
export function calculateScaledSize(baseSize, scaleFactor) {
    return baseSize.multiplyScalar(scaleFactor);
}