<script>
    //@ts-nocheck
    import { T } from '@threlte/core';
    import { MeshLineGeometry, MeshLineMaterial } from '@threlte/extras';
    import { Vector3 } from 'three';
    import { createGridLinesGeometry } from '$lib/utils/gridUtils.js';
    import { createEventDispatcher } from 'svelte';
    import { gridSize, cellSize, gridColor, gridLinewidth, gridOpacity } from '$lib/store.js';

    const gridLines = createGridLinesGeometry($gridSize,$cellSize);

</script>

<T.Group>
    {#each gridLines as [start, end]}
        <T.Mesh>
            <MeshLineGeometry points={[start, end]} />
            <MeshLineMaterial
                color={$gridColor}
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
