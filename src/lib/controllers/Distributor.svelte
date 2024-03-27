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

{#each $categories as category, index (category.id)}
	<T.Group>
		<Box position={category.position} size={category.size} index={index}>
			<SmallGrid />
			<T.Mesh position={[0, 0, $cellSize / 2]}>
				<HTML transform distanceFactor={750} pointerEvents="none" occlude>
					<div style={`width: ${$cellSize / 2}px; height: ${$cellSize / 2}px;`}>
						<h1>{category.title}</h1>
					</div>
				</HTML>
			</T.Mesh>
		</Box>
		{#if category.works}
			{#each category.works as work, workIndex (work.id)}
				<Box position={work.position} size={work.size} width={5} index={workIndex}></Box>
			{/each}
		{/if}
	</T.Group>
{/each}

<style>
	div {
	}
</style>
