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

export function countWorksPerCategory(works, categoryId) {
    if (!Array.isArray(works)) {
        console.error('works must be an array');
        return 0;
    }
    return works.filter(work => work.category === categoryId).length;
}

export function calculateScaledCategorySize(workCount, cellDivision, spacingFactor, minSize) {
    if (workCount === 0) return new Vector3(minSize, minSize, minSize);
    
    // Calculate the number of cells needed, incrementing for every 10 works
    const cellsNeeded = Math.ceil(workCount / 10);
    
    // Calculate the new size based on cells needed
    const newSize = cellsNeeded * cellDivision * spacingFactor;

    // Ensure the size does not fall below the minimum size
    return new Vector3(
        Math.max(newSize, minSize),
        Math.max(newSize, minSize),
        Math.max(newSize, minSize)
    );
}


export function enrichCategories(categories, works, cellSize, workPositions, categoryPositions, gridSize, smallCellSize) {
    const size = new Vector3(cellSize, cellSize, cellSize); // Use cellSize for all dimensions

    return categories.map((category) => {
        const categoryWorks = works.filter((work) => work.category === category.id);
        
        // Map the works to include size property
        const worksWithSize = categoryWorks.map((work) => ({ ...work, size: smallCellSize }));
        
        // Generate unique positions for each work within the category
        generateUniquePositions(worksWithSize, gridSize, workPositions, cellSize);
        console.log(gridSize, cellSize, size, smallCellSize)
        // Map the works again to attach the generated positions
        const positionedWorks = worksWithSize.map((work) => {
            const position = workPositions.get(work.id);
            return { ...work, position: position }; // Keep the absolute position
        });

        return { ...category, works: positionedWorks, size };
    });
}

export function processCategories(categories, works, spacingFactor, cellSize, categoryPositions, gridSize, workPositions, smallCellSize) {
    const spatialHash = {};
    let updatedCategories = enrichCategories(categories, works, cellSize, workPositions, categoryPositions, gridSize, smallCellSize);


    // Generate unique positions for each category
    generateUniquePositions(updatedCategories, gridSize, categoryPositions, cellSize);
    // Update `updatedCategories` with the new positions
    updatedCategories = updatedCategories.map((category) => {
        const position = categoryPositions.get(category.id);
        return { ...category, position };
    });

    updatedCategories = updatedCategories.flatMap(category => {
        const workParts = [];
        for (let i = 0; i < category.works.length; i += 10) {
            const newCategory = {
                ...category,
                id: `${category.id}-${i / 10}`,
                works: category.works.slice(i, i + 10)
            };
    
            let newPosition;
            do {
                // Define a range for the new position relative to the original category's position
                let newPosRange = new Vector3(
                    category.size.x + spacingFactor + cellSize,
                    category.size.y + spacingFactor + cellSize,
                    category.size.z + spacingFactor + cellSize
                );
    
                // Attempt to place the new category next to the original category
                newPosition = getRandomGridPosition(newPosRange, newCategory.size);
                newPosition.add(category.position); // Offset by the original category's position
    
                newPosition = roundVectorToCellSize(newPosition, cellSize); // Round the position to the grid
            } while (isOverlapping(newPosition, newCategory.size, categoryPositions, spatialHash, cellSize));
    
            // Update spatialHash with the new position
            const key = computeHashKey(newPosition, cellSize);
            if (!spatialHash[key]) {
                spatialHash[key] = [];
            }
            spatialHash[key].push(newPosition);
    
            // Update the position in the categoryPositions store
            categoryPositions.set(newCategory.id, newPosition);
            workParts.push({ ...newCategory, position: newPosition });
        }
        return workParts;
    });
    
    return updatedCategories;
}