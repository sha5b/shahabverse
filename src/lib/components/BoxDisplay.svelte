<script>
	//@ts-nocheck
	import { T } from '@threlte/core';
	import { useTexture, Text, HTML } from '@threlte/extras';
	import * as THREE from 'three';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { onMount, onDestroy } from 'svelte';
	import { getImageURL } from '$lib/utils/getURL';
	import { Vector3 } from 'three';

	export let work;
	export let cellSize;

	const imageUrl = getImageURL(work.collectionId, work.id, work.thump);

</script>

<T.Mesh  position={[0, 0, -250]}>
	<HTML transform distanceFactor={700} pointerEvents={'none'}>
		<div style={`width: ${cellSize / 2}px; height: ${cellSize / 2}px;`}>
			<!-- Your HTML content with img tag -->
			<img src={getImageURL(work.collectionId, work.id, work.thump)} alt={work.title} />
		</div>
	</HTML>
</T.Mesh>
<T.Mesh >
	<HTML transform distanceFactor={700} pointerEvents={'none'}>
		<div style={`width: ${cellSize / 2}px; height: ${cellSize / 2}px;`}>
			<h1>{work.title}</h1>
		</div>
	</HTML>
</T.Mesh>

<style>
	div {
		display: flex;
		justify-content: center;
		align-items: flex-end;
	}
	img {
		object-fit: contain;
		max-width: 100%;
		max-height: 100%;
	}
	h1 {
		font-size: 1rem;
	}
</style>
