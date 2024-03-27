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
export function generateUniquePositions(items, range, positionsMap, cellSize) {
    const spatialHash = {};

    items.forEach((item) => {
        let pos;
        do {
            pos = roundVectorToCellSize(getRandomGridPosition(range, item.size), cellSize);
        } while (isOverlapping(pos, item.size, positionsMap, spatialHash, cellSize));

        const key = computeHashKey(pos, cellSize);
        if (!spatialHash[key]) {
            spatialHash[key] = [];
        }
        spatialHash[key].push(pos);
        positionsMap.set(item.id, pos);
    });
}

export function processCategories(categories, works, spacingFactor, cellSize, categoryPositions, gridSize, workPositions, smallCellSize) {
    const spatialHash = {};
    let updatedCategories = categories.map(category => {
        const categoryWorks = works.filter(work => work.category === category.id).map(work => ({
            ...work,
            size: new Vector3(smallCellSize,smallCellSize,smallCellSize) ,
            position: new Vector3(), // Initialize position for each work
        }));
        return { ...category, works: categoryWorks, size: new Vector3(cellSize, cellSize, cellSize) };
    });

    let paddedGridSize = new Vector3 (gridSize.x - 2000, gridSize.y - 2000, gridSize.z - 2000);

    updatedCategories.forEach(category => {
        generateUniquePositions(updatedCategories, paddedGridSize, categoryPositions, cellSize);
        updatedCategories = updatedCategories.map(category => ({
            ...category,
            position: categoryPositions.get(category.id)
        }));

    });


    updatedCategories = updatedCategories.flatMap(category => {
        const workParts = [];
        for (let i = 0; i < category.works.length; i += 8) {
            const newCategory = {
                ...category,
                id: `${category.id}-${i / 8}`,
                works: category.works.slice(i, i + 8)
            };
            
            let newPosition;
            do {
                const newPosRange = new Vector3(
                    category.size.x + spacingFactor + cellSize,
                    category.size.y + spacingFactor + cellSize,
                    category.size.z + spacingFactor + cellSize
                );
    
                newPosition = getRandomGridPosition(newPosRange, newCategory.size);
                newPosition.add(category.position);
                newPosition = roundVectorToCellSize(newPosition, cellSize);
            } while (isOverlapping(newPosition, newCategory.size, categoryPositions, spatialHash, cellSize));
    
            const key = computeHashKey(newPosition, cellSize);
            if (!spatialHash[key]) {
                spatialHash[key] = [];
            }
            spatialHash[key].push(newPosition);
    
            categoryPositions.set(newCategory.id, newPosition);

            workParts.push({ ...newCategory, position: newPosition });
        }
        return workParts;
    });

    updatedCategories.forEach(category => {
        category.works.forEach(work => {
            generateUniquePositions([work], new Vector3(cellSize, cellSize, cellSize), workPositions, smallCellSize);
            work.position = workPositions.get(work.id).clone().add(category.position);;
            
        });
    });
    
    return updatedCategories;
}