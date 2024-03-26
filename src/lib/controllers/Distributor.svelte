<script>
	//@ts-nocheck
	import { T } from '@threlte/core';
	import { Vector3 } from 'three';
	import Box from '$lib/components/Box.svelte';
	import { onMount } from 'svelte';
	import {
		enrichCategories,
		getMaxScaledSize,
		generateUniquePositions,
		calculateContainerRange
	} from '$lib/utils/transformUtils';

	import { works, categories, cellDivision, cellSize, spacingFactor, categoryPositions } from '$lib/store.js';
	import SmallGrid from '$lib/components/SmallGrid.svelte';
	

	onMount(() => {
		let updatedCategories = enrichCategories($categories, $works, $cellDivision, $spacingFactor, $cellSize);
		let maxScaledSize = getMaxScaledSize(updatedCategories, $works, new Vector3(200, 200, 200));
		let range = calculateContainerRange(updatedCategories, maxScaledSize);

		// Generate unique positions for each category
		generateUniquePositions(updatedCategories, range, $categoryPositions, $cellSize);

		// Update `updatedCategories` with the new positions
		$categories =  updatedCategories.map((category) => {
			const position = $categoryPositions.get(category.id);
			return { ...category, position };
		});	
	});

</script>

{#each $categories as category (category.id)}
{console.log(category)}
{console.log(category.position)}
	<T.Group >
		<Box position={category.position} size={category.size}>
	</Box>
	</T.Group>
{/each}
