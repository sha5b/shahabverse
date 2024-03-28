<script>
	//@ts-nocheck
	import { T } from '@threlte/core';
	import { Vector3 } from 'three';
	import { MeshLineGeometry, MeshLineMaterial, interactivity } from '@threlte/extras';
	import { createEventDispatcher, onMount } from 'svelte';
	import * as THREE from 'three';

	import { categoryId, workId, isCameraMoving } from '$lib/store.js';
	import { createBoxLines } from '$lib/utils/boxUtils.js';

	// Position handling
	export let position = new Vector3(0, 0, 0);
	export let size = new Vector3(1000, 1000, 1000);
	export let width = 10;
	export let color = 'grey';

	let rotation = [0, 0, 0];

	$: lines = createBoxLines(size);

	interactivity();
	onMount(() => {
		rotation = [0, (Math.floor(Math.random() * 4) * Math.PI) / 2, 0];
	});

	// Event handling
	export let idWork; // Assume this is the work id
	export let idCategory; // Pass the category id as a prop
	let active = true;

	// Reactive statement to set active to true when camera has stopped moving and IDs have changed
	// Reactive statement to set active based on categoryId and workId changes
	$: active = !($categoryId === idCategory && ($workId === null || $workId === idWork));


	function handleClick(event) {
		event.stopPropagation();
		if ($categoryId !== idCategory || $workId !== idWork) {
			// If the IDs are different, the camera should move to the new target
			categoryId.set(idCategory);
			workId.set(idWork);
			active = false
		} else {
			active = true;
		}

	}
</script>

<T.Group position={[position.x, position.y, position.z]} {rotation}>
	{#each lines as line}
		<T.Mesh>
			<MeshLineGeometry points={line} />
			<MeshLineMaterial {width} {color} transparent={true} dashArray={0.05} dashRatio={0.5} attenuate={true} />
		</T.Mesh>
		{#if active}
			<T.Mesh interactive={active} on:click={handleClick}>
				<T.BoxGeometry args={[size.x - 25, size.y - 25, size.z - 25]} />
				<T.MeshBasicMaterial opacity={1} wireframe transparent /></T.Mesh
			>
		{/if}
		<!-- {#if active}
		<T.Mesh on:click={handleClick} {target} >
			<T.BoxGeometry args={[size.x - 25, size.y - 25, size.z - 25]}/>
			<T.MeshBasicMaterial opacity={0} wireframe transparent /></T.Mesh
		> 
		{/if} -->
	{/each}
	<slot />
</T.Group>
