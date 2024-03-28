<script>
	//@ts-nocheck
	import { T } from '@threlte/core';
	import { Vector3 } from 'three';
	import * as THREE from 'three';
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

	import { HTML } from '@threlte/extras';
	import BoxDisplay from '$lib/components/BoxDisplay.svelte';

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
		<Box position={category.position} size={category.size} idWork={null} idCategory={category.id}>
			<T.Mesh position={[0, 0, $cellSize / 2]}>
				<HTML transform distanceFactor={750} pointerEvents="none" occlude>
					<div style={`width: ${$cellSize / 2}px; height: ${$cellSize / 2}px;`}>
						<h1>{category.title}</h1>
					</div>
				</HTML>
			</T.Mesh>
		</Box>
		{#if category.works}
			{#each category.works as work (work.id)}
					<Box position={work.position} size={work.size} width={3} idCategory={work.category} idWork={work.id} work={work}>
						<T.Mesh position={[0, 0, $smallCellSize / 2]}
							><BoxDisplay {work} cellSize={$smallCellSize} /></T.Mesh
						>
					</Box>
			{/each}
		{/if}
	</T.Group>
{/each}

<style>
	div {
	}
</style>
