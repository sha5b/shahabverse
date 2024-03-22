<script>
    //@ts-nocheck
    import { onMount } from 'svelte';
    import { bgGridSize, bgGridCellSize, bgGridColor, bgGridLinewidth, bgGridOpacity } from '$lib/store.js';
    import { T } from '@threlte/core';
    import { createGridLinesGeometry } from '$lib/utils/gridUtils.js';
    import { LineBasicMaterial } from 'three';

    let gridGeometry;
    let gridMaterial;

    onMount(() => {
        updateGrid();
    });

    $: {
        updateGrid();
    }

    function updateGrid() {
        gridGeometry = createGridLinesGeometry($bgGridSize, $bgGridCellSize);
        gridMaterial = new LineBasicMaterial({
            color: $bgGridColor,
            transparent: true,
            opacity: $bgGridOpacity,
            linewidth: $bgGridLinewidth,
        });
    }
</script>

<T.LineSegments geometry={gridGeometry} material={gridMaterial} />