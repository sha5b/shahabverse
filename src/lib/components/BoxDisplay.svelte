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
	import { categoryId, workId, isCameraMoving, pirmaryColor, secondaryColor } from '$lib/store.js';
	export let work;
	export let cellSize;
	let active;
	export let idCategory
	export let idWork

	let rotationTitle = [-Math.PI / 2, 0, 0];

	$: active = $categoryId !== idCategory || ($workId !== null && $workId !== idWork);
	$: console.log(active)
</script>

<!-- the + 1 in the z position is to make the images dont collide -->
	<T.Mesh position={[0, 0, -cellSize + 25]}> 
		<HTML transform distanceFactor={175} pointerEvents={'none'}>
			<div class="content-wrapper" style={`width: ${cellSize * 2}px; height: ${cellSize * 2}px;`}>
				<img src={getImageURL(work.collectionId, work.id, work.thump)} alt={work.title} />
			</div>
		</HTML>
	</T.Mesh>
	<T.Mesh rotation={rotationTitle} position={[0, -cellSize / 2, -cellSize / 2]}>
		<HTML transform distanceFactor={175} pointerEvents={'none'}>
			<div class="text-wrapper" style={`width: ${cellSize * 2}px; height: ${cellSize * 2 -50}px;`}>
				<h1>{work.title}</h1>
				<flex>
					<p>{work.expand.category.title}</p>
					<p>{work.type} media</p>
				</flex>
			</div>
			{#if !active}
			<p>I did it</p>
			{/if}
		</HTML>
	</T.Mesh>

<style>
	.content-wrapper {
		display: flex;
		justify-content: center;
		align-items: flex-end;
	}
	.text-wrapper {
		display: flex;
		justify-content: left;
		align-items: flex-start;
		flex-direction: column;
		justify-content: space-between;
	}
	flex {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	img {
		object-fit: contain;
		max-width: 100%;
		max-height: 100%;
	}
	h1 {
		font-size: 3rem;
	}
	p {
		font-size: 1.5rem;
	}
</style>
