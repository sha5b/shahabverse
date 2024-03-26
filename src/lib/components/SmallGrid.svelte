<script>
    //@ts-nocheck
    import { T } from '@threlte/core';
    import { MeshLineGeometry, MeshLineMaterial } from '@threlte/extras';
    import { Vector3 } from 'three';
    import { createGridLinesGeometry } from '$lib/utils/gridUtils.js';
    import { createEventDispatcher } from 'svelte';
    import { gridColor, gridLinewidth, gridOpacity, cellSize, workSize } from '$lib/store.js';

    export let gridSize = new Vector3(1000, 1000, 1000);
    export let cellDivision = 5

    const gridLines = createGridLinesGeometry(gridSize,cellDivision);

</script>

<T.Group position={[$cellSize / 2,$cellSize / 2,$cellSize / 2]}>
    {#each gridLines as [start, end]}
        <T.Mesh>
            <MeshLineGeometry points={[start, end]} />
            <MeshLineMaterial
                color={'red'}
                width={$gridLinewidth}
                opacity={$gridOpacity}
                transparent={true}
                attenuate={true}
                dashArray={0.005}
                dashRatio={0.5}
            />
        </T.Mesh>
    {/each}
</T.Group>
