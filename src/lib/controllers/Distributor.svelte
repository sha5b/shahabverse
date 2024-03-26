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
		cellSize,
		spacingFactor,
		categoryPositions,
		gridSize

	} from '$lib/store.js';
	import SmallGrid from '$lib/components/SmallGrid.svelte';
	import { HTML } from '@threlte/extras';

	onMount(() => {
		$categories = processCategories(
			$categories,
			$works,
			$spacingFactor,
			$cellSize,
			$categoryPositions,
			$gridSize
		);
		
	});
</script>


{#each $categories as category (category.id)}
	<T.Group>
		<Box position={category.position} size={category.size}>
			<SmallGrid />
			<T.Mesh>
				<HTML transform distanceFactor={1000} >
					<p> hi</p>
				</HTML>
			</T.Mesh>
		</Box>
	</T.Group>
{/each}