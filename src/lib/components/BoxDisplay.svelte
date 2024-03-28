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
	let rotationTitle = [-Math.PI / 2, 0, 0];

	async function loadTextureForWork(work) {
		let loadedTexture;
		let textureAspectRatio;
		let loadedGeometryWidth;
		let loadedGeometryHeight;

		const imageUrl = getImageURL(work.collectionId, work.id, work.thump);

		try {
			loadedTexture = await useTexture(imageUrl); // Assuming useTexture is async
			textureAspectRatio = loadedTexture.source.data.height / loadedTexture.source.data.width;
			loadedGeometryWidth = Math.min(cellSize, loadedTexture.source.data.width);
			loadedGeometryHeight = loadedGeometryWidth * textureAspectRatio;
		} catch (error) {
			console.error('Error loading texture:', error);
		}

		return {
			texture: loadedTexture,
			geometryWidth: loadedGeometryWidth,
			geometryHeight: loadedGeometryHeight
		};
	}

	// Reactive statement to load the texture when 'work' changes
	let textureDataPromise;
	$: if (work) {
		textureDataPromise = loadTextureForWork(work);
	}
</script>

{#await textureDataPromise then { texture, geometryWidth, geometryHeight }}
<!-- the + 1 in the z position is to make the images dont collide -->
	<T.Mesh position={[0, 0, -cellSize ]}> 
		<T.PlaneGeometry args={[geometryWidth / 1.5, geometryHeight / 1.5]} />
		<T.MeshBasicMaterial
			side={THREE.DoubleSide}
			map={texture}
			transparent={true}
		/>
	</T.Mesh>
	<T.Mesh rotation={rotationTitle} position={[0, -cellSize / 2, -cellSize / 2]}>
		<HTML transform distanceFactor={175} pointerEvents={'none'}>
			<div class="text-wrapper" style={`width: ${cellSize * 2}px; height: ${cellSize * 2}px;`}>
				<h1>{work.title}</h1>
				<flex>
					<p>{work.expand.category.title}</p>
					<p>{work.type} media</p>
				</flex>
			</div>
		</HTML>
	</T.Mesh>
{/await}

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
