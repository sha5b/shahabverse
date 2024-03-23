<script>
    //@ts-nocheck
	import { T } from '@threlte/core';
	import { Vector3 } from 'three';
	import { MeshLineGeometry, MeshLineMaterial, interactivity } from '@threlte/extras';
	import { createEventDispatcher, onMount } from 'svelte';
	import * as THREE from 'three';
	import { createBoxLines } from '$lib/utils/boxUtils.js'; // Import the utility function


	export let position = new Vector3(0, 0, 0);
	export let size = new Vector3(100, 100, 100);
	export let cellSize = 500;
	export let width = 10;
	export let color = 'red';
	let rotation = [0, 0, 0]; // Rotation as an array [x, y, z]


	onMount(() => {
		// Set rotation to 0, 90, 180, or 270 degrees (in radians) for each axis
		rotation = [0, (Math.floor(Math.random() * 4) * Math.PI) / 2, 0];
	});

	$: lines = createBoxLines(size); // Use the utility function
    
</script>

<T.Group position={[position.x, position.y, position.z]} {rotation}>
<T.Mesh>
    {#each lines as line}
        <T.Mesh>
            <MeshLineGeometry points={line} />
            <MeshLineMaterial color={color} width={width} attenuate/>
        </T.Mesh>
    {/each}
</T.Mesh></T.Group>
