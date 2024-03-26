<script>
	//@ts-nocheck
	import Grid from '$lib/components/Grid.svelte';
	import Box from '$lib/components/Box.svelte';
	import Distributor from '$lib/controllers/Distributor.svelte';
	import { T } from '@threlte/core';
	import { ContactShadows, OrbitControls } from '@threlte/extras';
	import { categories, works } from '$lib/store.js';
	export let data



	$categories = data.categories;
	$works = data.works;
	
</script>

<T.Scene>
	<T.PerspectiveCamera makeDefault position={[-1000, 1000, 1000]} fov={45} far={15000}>
		<OrbitControls
			autoRotate
			enableZoom={true}
			enableDamping
			autoRotateSpeed={0.1}
			target.y={1.5}
		/>
	</T.PerspectiveCamera>

	<T.DirectionalLight intensity={0.8} position.x={5} position.y={10} />
	<T.AmbientLight intensity={0.2} />

	<Grid />
	
	<Distributor/>

	<ContactShadows scale={10} blur={2} far={2.5} opacity={0.5} />
</T.Scene>
