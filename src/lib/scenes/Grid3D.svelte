<script>
	//@ts-nocheck
	import BackgroundGrid from '$lib/components/BackgroundGrid.svelte';
	import Box from '$lib/components/Box.svelte';
	import Distributor from '$lib/controllers/Distributor.svelte';
	import { T } from '@threlte/core';
	import { ContactShadows, Float, Grid, OrbitControls } from '@threlte/extras';
	export let data

</script>

<T.Scene>
	<T.PerspectiveCamera makeDefault position={[-10, 10, 10]} fov={15} far={10000}>
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

	<BackgroundGrid />
	
	<Distributor categories={data.categories} works={data.works}/>

	<Box />

	<ContactShadows scale={10} blur={2} far={2.5} opacity={0.5} />
</T.Scene>
