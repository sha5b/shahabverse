<script>
	//@ts-nocheck
	import { T } from '@threlte/core';
	import { Vector3 } from 'three';
	import Box from '$lib/components/Box.svelte';
	import { onMount, tick } from 'svelte';
	import { processCategories } from '$lib/utils/transformUtils';
	import {
		works,
		categories,
		cellSize,
		spacingFactor,
		categoryPositions,
		gridSize,
		smallCellSize,
		workPositions
	} from '$lib/store.js';
	import SmallGrid from '$lib/components/SmallGrid.svelte';
	import { HTML } from '@threlte/extras';

	onMount(async () => {
		await smallCellSize;

		$categories = processCategories(
			$categories,
			$works,
			$spacingFactor,
			$cellSize,
			$categoryPositions,
			$gridSize,
			$workPositions,
			$smallCellSize
		);
	});
</script>

{#each $categories as category (category.id)}
	<T.Group>
		<Box position={category.position} size={category.size}>
			<SmallGrid />
			<T.Mesh position={[-$cellSize / 4, -$cellSize / 4, $cellSize / 2]}>
				<HTML transform distanceFactor={1000}>
					<h1>{category.title}</h1>
				</HTML>
			</T.Mesh>
			{#if category.works}
				{#each category.works as work (work.id)}
					<Box position={work.position} size={work.size} />
				{/each}
			{/if}
		</Box>
	</T.Group>
{/each}
