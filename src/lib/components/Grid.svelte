<script>
    //@ts-nocheck
    import { T } from '@threlte/core';
    import { MeshLineGeometry, MeshLineMaterial } from '@threlte/extras';
    import { Vector3 } from 'three';
    import { createGridLinesGeometry } from '$lib/utils/gridUtils.js';
    import { createEventDispatcher } from 'svelte';
    import { gridSize, cellDivision, gridLinewidth, gridOpacity, cellSize, pirmaryColor, secondaryColor } from '$lib/store.js';

    const gridLines = createGridLinesGeometry($gridSize,$cellDivision);

</script>

<T.Group position={[$cellSize / 2,$cellSize / 2,$cellSize / 2]}>
    {#each gridLines as [start, end]}
        <T.Mesh renderOrder={0}>
            <MeshLineGeometry points={[start, end]} />
            <MeshLineMaterial
                color={$pirmaryColor}
                width={$gridLinewidth}
                opacity={$gridOpacity}
                transparent={true}
                dashArray={0.005}
                dashRatio={0.5}
                attenuate={true}s
            />
        </T.Mesh>
    {/each}
</T.Group>
