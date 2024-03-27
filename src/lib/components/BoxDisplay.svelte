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
    export let smallCellSize;

	async function loadTextureForWork(work) {
		let loadedTexture;

		const imageUrl = getImageURL(work.collectionId, work.id, work.thump);

		try {
			loadedTexture = await useTexture(imageUrl); // Assuming useTexture is async

		} catch (error) {
			console.error('Error loading texture:', error);
		}

		return {
			texture: loadedTexture
		};
	}

	// Reactive statement to load the texture when 'work' changes
	let textureDataPromise;
	$: if (work) {
		textureDataPromise = loadTextureForWork(work);
	}
</script>
{#await textureDataPromise then {texture}}

<T.Mesh >
    <T.PlaneGeometry args={[smallCellSize, smallCellSize]} />
    <T.MeshBasicMaterial
        side={THREE.DoubleSide}
        map={texture}
    />
</T.Mesh>
{/await}