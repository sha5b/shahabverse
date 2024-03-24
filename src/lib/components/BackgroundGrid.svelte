<script>
    //@ts-nocheck
    import { T } from '@threlte/core';
    import { MeshLineGeometry, MeshLineMaterial } from '@threlte/extras';
    import { Vector3 } from 'three';
    import { createGridLinesGeometry } from '$lib/utils/gridUtils.js';
    import { createEventDispatcher } from 'svelte';
    import { bgGridSize, bgGridCellSize, bgGridColor, bgGridLinewidth, bgGridOpacity } from '$lib/store.js';

    const gridLines = createGridLinesGeometry($bgGridSize,$bgGridCellSize);

    
</script>

<T.Group>
    {#each gridLines as [start, end]}
        <T.Mesh>
            <MeshLineGeometry points={[start, end]} />
            <MeshLineMaterial
                color={$bgGridColor}
                linewidth={$bgGridLinewidth}
                opacity={$bgGridOpacity}
                transparent={true}
                
                dashArray={0.005}
                dashRatio={0.5}
            />
        </T.Mesh>
    {/each}
</T.Group>
