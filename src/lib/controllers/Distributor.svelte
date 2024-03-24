<script>
	//@ts-nocheck
	import { T } from '@threlte/core';
	import { Vector3 } from 'three';
	import Box from '$lib/components/Box.svelte';
	import { prepareCategoriesForRendering } from '$lib/utils/transformUtils.js';
	
	export let categories = [];
	export let works = [];
	export let size = new Vector3(500, 500, 500);

	let color = 'black';
	const spacingFactor = 2; // Used to scale the size
	let cellSize = 500;

	const { updatedCategories, categoryPositions } = prepareCategoriesForRendering(categories, works, size, cellSize, spacingFactor);
</script>

{#each updatedCategories as category (category.id)}
	<T.Group>
		<Box
			position={categoryPositions.get(category.id)}
			size={category.size}
			{cellSize}
			id={category.id}
			{color}
		>
			<T.Mesh
				position={[
					0, // Half the size to the right
					0, // Half the size down
					category.size.z / 2 // Assuming you want it aligned with the front of the box
				]}
			>
				<div style="pointer-events: none; width: {category.size.x}px; height: {category.size.y}px;">
					<h1>{category.title}</h1>
				</div>
			</T.Mesh>
		</Box>
	</T.Group>
{/each}