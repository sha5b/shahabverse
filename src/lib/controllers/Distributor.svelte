<script>
	//@ts-nocheck
	import { T } from '@threlte/core';
	import { Vector3 } from 'three';
	import Box from '$lib/components/Box.svelte';
	import { onMount } from 'svelte';
	import { processCategories } from '$lib/utils/transformUtils';
	import {
		works,
		categories,
		cellDivision,
		cellSize,
		spacingFactor,
		categoryPositions
	} from '$lib/store.js';
	import SmallGrid from '$lib/components/SmallGrid.svelte';

	onMount(() => {
		$categories = processCategories(
			$categories,
			$works,
			$spacingFactor,
			$cellSize,
			$categoryPositions
		);
		
	});
</script>


{#each $categories as category (category.id)}
	{console.log(category.title, category.works ,category.position)}
	<T.Group>
		<Box position={category.position} size={category.size}>
			<SmallGrid />
		</Box>
	</T.Group>
{/each}