<script>
  import { Canvas } from '@threlte/core'
  import Grid3D from '$lib/scenes/Grid3D.svelte'
  export let data
</script>

<Canvas>
  <Grid3D {data}/>
</Canvas>
