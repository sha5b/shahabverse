<script>
    //@ts-nocheck
    import { T } from '@threlte/core';
    import { MeshLineGeometry, MeshLineMaterial } from '@threlte/extras';
    import { Vector3 } from 'three';
    import { createGridLinesGeometry } from '$lib/utils/gridUtils.js';
    import { createEventDispatcher } from 'svelte';
    import { cellSize , smallCellDivision } from '$lib/store.js';

    export let gridSize = new Vector3($cellSize, $cellSize, $cellSize);
    export let width = 2
    export let opacity = .5
    export let color = '#1f2833'
    const gridLines = createGridLinesGeometry(gridSize,$smallCellDivision);
    
</script>

<T.Group >
    {#each gridLines as [start, end]}
        <T.Mesh>
            <MeshLineGeometry points={[start, end]} />
            <MeshLineMaterial
                color={color}
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
