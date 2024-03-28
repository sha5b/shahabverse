<script>
	//@ts-nocheck

	import { T } from '@threlte/core';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { ContactShadows, OrbitControls } from '@threlte/extras';
	import { Vector3 } from 'three';
	import Grid from '$lib/components/Grid.svelte';
	import Distributor from '$lib/controllers/Distributor.svelte';
	import {
		categories,
		works,
		categoryId,
		workId,
		categoryPositions,
		workPositions,
		cellSize,
		smallCellSize,
		isCameraMoving
	} from '$lib/store.js';
	export let data;

	$categories = data.categories;
	$works = data.works;

	let cameraPosition = [-2500, 2500, 2500];
	let cameraTarget = [0, 0, 0];

	let cameraFOV = 45;

	$: $categoryId, $workId, updateCameraPositionAndTarget($categoryId, $workId);

	function updateCameraPositionAndTarget(categoryId, workId) {
		let newPosition, newTarget, zoomLevel;

		// Find the position for the category or work
		if (categoryId && workId === null) {
			// When workId is null, but categoryId is set, use category position
			newPosition = $categoryPositions.get(categoryId);
			newTarget = newPosition;
			zoomLevel = $cellSize * 2; // Zoom level for category
		} else if (categoryId && workId !== null) {
			// When both categoryId and workId are set, use work position
			newPosition = $workPositions.get(workId);
			newTarget = newPosition;
			zoomLevel = $smallCellSize * 2; // Zoom level for work within a category
		}

		// If newPosition was found, update camera's position and target
		if (newPosition && newTarget) {
			cameraPosition = [newPosition.x, newPosition.y, newPosition.z + zoomLevel];
			cameraTarget = [newTarget.x, newTarget.y, newTarget.z];
		}
	}
	$: console.log($isCameraMoving);
</script>

<T.Scene>
	<T.PerspectiveCamera makeDefault bind:position={cameraPosition} fov={cameraFOV} far={50000}>
		<OrbitControls
			bind:target={cameraTarget}
			autoRotate
			enableZoom={true}
			enableDamping
			autoRotateSpeed={0.1}
			target.y={1.5}
			on:start={() => ($isCameraMoving = true)}
			on:end={() => ($isCameraMoving = true)}

		/>
	</T.PerspectiveCamera>

	<T.DirectionalLight intensity={0.8} position.x={5} position.y={10} />
	<T.AmbientLight intensity={0.2} />

	<Grid />

	<Distributor />

	<ContactShadows scale={10} blur={2} far={2.5} opacity={0.5} />
</T.Scene>
