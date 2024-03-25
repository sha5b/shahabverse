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

	
	export let categories = [];
	export let works = [];
	let cellSize = 10;
	let spacingFactor = 10;

	let categoryPositions = new Map();
	let updatedCategories = [];
	let range; // The range will be calculated based on the maxScaledSize

	onMount(() => {
		updatedCategories = enrichCategories(categories, works, cellSize, spacingFactor);
		let maxScaledSize = getMaxScaledSize(updatedCategories, works, new Vector3(100, 100, 100));
		range = calculateContainerRange(updatedCategories, maxScaledSize);

		// Generate unique positions for each category
		generateUniquePositions(updatedCategories, range, categoryPositions, cellSize);

		// Update `updatedCategories` with the new positions
		updatedCategories = updatedCategories.map((category) => {
			const position = categoryPositions.get(category.id);
			return { ...category, position };
		});

		console.log(updatedCategories);
	});
</script>

{#each updatedCategories as category (category.id)}
	<T.Group >
		<Box position={category.position} size={category.size} />
	</T.Group>
{/each}
