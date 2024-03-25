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

export function calculateContainerRange(categories, maxScaledSize, padding = 0) {
	const numCategoriesPerSide = Math.ceil(Math.cbrt(categories.length) / 2); // Halving the number of categories per side
	const paddedSize = (dimension, numBoxes) => dimension * numBoxes + (numBoxes + 1) * padding; // Adjusted formula
	const volume = ['x', 'y', 'z'].reduce(
		(vol, axis) => vol * paddedSize(maxScaledSize[axis], numCategoriesPerSide),
		1
	);
	return new Vector3(...Array(3).fill(Math.cbrt(volume)));
}

export function countWorksPerCategory(works, categoryId) {
    if (!Array.isArray(works)) {
        console.error('works must be an array');
        return 0;
    }
    return works.filter(work => work.category === categoryId).length;
}

export function calculateSize(minSize, gridSize) {
    return Math.max(minSize, gridSize);
   }

export function calculateScaledSize(originalSize, scaleFactor) {
    return originalSize.multiplyScalar(scaleFactor);
}

export function calculateScaledCategorySize(workCount, cellSize, spacingFactor) {
    if (workCount === 0) return new Vector3();
    const baseSize = Math.ceil(Math.sqrt(workCount));
    return new Vector3(
        baseSize * cellSize * spacingFactor,
        baseSize * cellSize * spacingFactor,
        baseSize * cellSize * spacingFactor
    );
}

export function enrichCategories(categories, works, cellSize, spacingFactor) {
    return categories.map((category) => {
        const categoryWorks = works.filter((work) => work.category === category.id);
        const workCount = categoryWorks.length;
        return { ...category, works: categoryWorks, size: calculateScaledCategorySize(workCount, cellSize, spacingFactor) };
    });
}

export function getMaxScaledSize(categories, works, size) {
    return categories.reduce((maxSize, category) => {
        const scaleFactor = countWorksPerCategory(works, category.id);
        const scaledSize = calculateScaledSize(size.clone(), scaleFactor);
        return {
            x: Math.max(maxSize.x, scaledSize.x),
            y: Math.max(maxSize.y, scaledSize.y),
            z: Math.max(maxSize.z, scaledSize.z)
        };
    }, new Vector3());
}
