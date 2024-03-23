<script>
    //@ts-nocheck
    import { T } from '@threlte/core';
    import { MeshLineGeometry, MeshLineMaterial } from '@threlte/extras';
    import { Vector3 } from 'three';
    import { createGridLinesGeometry } from '$lib/utils/gridUtils.js';
    import { createEventDispatcher } from 'svelte';

    export let size = new Vector3(1000, 1000, 1000);
    export let cellSize = 10;
    export let color = 'black';
    export let linewidth = 0.1;
    export let opacity = 0.1;


    const gridLines = createGridLinesGeometry(size, cellSize);
</script>

<T.Group>
    {#each gridLines as [start, end]}
        <T.Mesh>
            <MeshLineGeometry points={[start, end]} />
            <MeshLineMaterial
                color={color}
                linewidth={linewidth}
                opacity={opacity}
                transparent={true}
                attenuate={true}
            />
        </T.Mesh>
    {/each}
</T.Group>
