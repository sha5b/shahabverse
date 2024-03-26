<script>
    //@ts-nocheck
    import { T } from '@threlte/core';
    import { MeshLineGeometry, MeshLineMaterial } from '@threlte/extras';
    import { Vector3 } from 'three';
    import { createGridLinesGeometry } from '$lib/utils/gridUtils.js';
    import { createEventDispatcher } from 'svelte';
    import { gridColor, gridLinewidth, gridOpacity, cellSize, workSize } from '$lib/store.js';

    export let gridSize = new Vector3(1000, 1000, 1000);
    export let cellDivision = 3
    export let width = 2
    export let opacity = .25

    const gridLines = createGridLinesGeometry(gridSize,cellDivision);

</script>

<T.Group >
    {#each gridLines as [start, end]}
        <T.Mesh>
            <MeshLineGeometry points={[start, end]} />
            <MeshLineMaterial
                color={'black'}
                width={width}
                opacity={opacity}
                transparent={true}
                attenuate={true}
                dashArray={0.03}
                dashRatio={0.5}
            />
        </T.Mesh>
    {/each}
</T.Group>
