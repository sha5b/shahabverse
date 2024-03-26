<script>
	//@ts-nocheck
	import { T } from '@threlte/core';
	import { Vector3 } from 'three';
	import { MeshLineGeometry, MeshLineMaterial, interactivity } from '@threlte/extras';
	import { createEventDispatcher, onMount } from 'svelte';
	import * as THREE from 'three';
	import { createBoxLines } from '$lib/utils/boxUtils.js'; // Import the utility function

	export let position = new Vector3(0, 0, 0);
	export let size = new Vector3(1000, 1000, 1000);
	export let width = 10;
	export let color = '#1f2833';

	$: lines = createBoxLines(size); // Use the utility function
</script>

<T.Group position={[position.x, position.y, position.z]}>
	{#each lines as line}
		<T.Mesh>
			<MeshLineGeometry points={line} />
			<MeshLineMaterial
				{width}
				{color}
				transparent={true}
				attenuate={true}
				dashArray={0.05}
				dashRatio={0.5}
			/>
		</T.Mesh>
	{/each}
	<slot />
</T.Group>
