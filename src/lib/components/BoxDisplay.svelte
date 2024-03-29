<script>
	//@ts-nocheck
	import { T } from '@threlte/core';
	import { useTexture, Text, HTML } from '@threlte/extras';
	import * as THREE from 'three';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { onMount, onDestroy } from 'svelte';
	import { getImageURL } from '$lib/utils/getURL';
	import { Vector3 } from 'three';
	import { categoryId, workId, isCameraMoving, pirmaryColor, secondaryColor } from '$lib/store.js';
	export let work;
	export let cellSize;
	let active;
	export let idCategory;
	export let idWork;

	let rotationTitle = [-Math.PI / 2, 0, 0];
	let rotationSub = [0, -Math.PI / 2, 0];

	$: active = $categoryId !== idCategory || ($workId !== null && $workId !== idWork);

	function formatDate(dateString) {
		const options = {
			year: 'numeric',
			month: 'long'
		};
		const date = new Date(dateString);
		return date.toLocaleDateString(undefined, options);
	}

</script>

<!-- the + 1 in the z position is to make the images dont collide -->
<T.Mesh position={[-8, 0, -cellSize + 25]}>
	<HTML transform distanceFactor={175} pointerEvents={!active ? 'all' : 'none'}>
		<flex-image style={`width: ${cellSize * 2}px; height: ${cellSize * 2}px;`}>
			{#if active}
				<img src={getImageURL(work.collectionId, work.id, work.thump)} alt={work.title} />
			{/if}
			{#if !active}
				<img src={getImageURL(work.collectionId, work.id, work.thump)} alt={work.title} />
				{#if work.gallery}
					{#each work.gallery as image}
						<img src={getImageURL(work.collectionId, work.id, image)} alt={work.title} />{/each}
				{/if}
			{/if}
		</flex-image>
	</HTML>
</T.Mesh>
<T.Mesh rotation={rotationTitle} position={[0, -cellSize / 2, -cellSize / 2]}>
	<HTML transform distanceFactor={175} pointerEvents={!active ? 'all' : 'none'}>
		<div
			class="text-wrapper"
			style={`width: ${cellSize * 2}px; height: ${cellSize * 2 - 50}px; max-height: ${cellSize * 2 - 50}px;`}
		>
			<h1>{work.title}</h1>
			{#if !active}
				{#if work.synopsis}
					<div class="synopsis">
						{@html work.synopsis}
					</div>
				{/if}
			{/if}
			<flex>
				<p>{work.expand.category.title}</p>
				<p>{work.type} media</p>
			</flex>
		</div>
		{#if !active}
			<flex>
				{#if work.dimension}
					<div class="info-item">
						<span class="info-title">dimension:</span>
						<span class="info-content">{work.dimension}</span>
					</div>
				{/if}
				{#if work.fomat}
					<div class="info-item">
						<span class="info-title">format:</span>
						<span class="info-content">{work.format}</span>
					</div>
				{/if}
				{#if work.type}
					<div class="info-item">
						<span class="info-title">media:</span>
						<span class="info-content">{work.type}</span>
					</div>
				{/if}
				{#if work.edition > 0}
					<div class="info-item">
						<span class="info-title">editions:</span>
						<span class="info-content">{work.editions}</span>
					</div>
				{/if}
				{#if work.date}
					<div class="info-item">
						<span class="info-title">date:</span>
						<span class="info-content">{formatDate(work.date)}</span>
					</div>
				{/if}
			</flex>
		{/if}
	</HTML>
</T.Mesh>
{#if !active && work.expand && work.expand.colab && work.expand.colab.length > 0 && work.expand.exhibitions && work.expand.exhibitions.length > 0}

	<T.Mesh rotation={rotationSub} position={[cellSize / 2, 0, -cellSize / 2]}>
		<HTML transform distanceFactor={175} pointerEvents={!active ? 'all' : 'none'}>
			<div
				class="text-wrapper"
				style={`width: ${cellSize * 2}px; height: ${cellSize * 2 - 50}px; max-height: ${cellSize * 2 - 50}px;`}
			>
				<flex style="flex-direction: column">
					{#if work.expand && work.expand.colab && work.expand.colab.length > 0}
						<div class="info-item">
							<span class="info-title">collaborations:</span>
							<div class="info-content">
								{#each work.expand.colab as colab}
									<a href={colab.link} class="list-item" target="_blank">{colab.title}</a>
								{/each}
							</div>
						</div>
					{/if}
					{#if work.expand.exhibitions && work.exhibitions.length > 0}
						<div class="info-item">
							<span class="info-title">exhibitions:</span>
							<flex class="info-content">
								{#each work.expand.exhibitions as exhibition}
									<div>
										<a class="list-item" href={exhibition.link} target="_blank"
											>{exhibition.title}</a
										>
									</div>
								{/each}
							</flex>
						</div>
					{/if}
				</flex>
			</div>
		</HTML>
	</T.Mesh>
{/if}

<style>
	/* The scrollbar track (the part that the scrollbar thumb moves along) */
	::-webkit-scrollbar-track {
		background: #f1f1f1; /* Track color */
	}

	/* The scrollbar thumb (the draggable piece of the scrollbar) */
	::-webkit-scrollbar-thumb {
		background: #000000; /* Thumb color */
	}

	/* Handle the scrollbar thumb hover state */
	::-webkit-scrollbar-thumb:hover {
		background: #555; /* Color when the thumb is hovered */
	}

	/* The scrollbar itself (including thumb and track) */
	::-webkit-scrollbar {
		width: 12px; /* Width of the entire scrollbar */
	}

	/* For vertical scrolling areas */
	.synopsis::-webkit-scrollbar {
		width: 8px; /* Smaller width for the synopsis scrollbar */
	}

	.flex-image::-webkit-scrollbar {
		width: 8px; /* Smaller width for the flex-image scrollbar */
	}

	flex-image {
		align-items: center; /* Center items horizontally in the container */
		justify-content: center; /* Center items vertically in the container */
		display: flex;
		flex-direction: column; /* Keep items in a column */
		overflow-x: hidden; /* Hide horizontal overflow */
		overflow-y: auto; /* Enable vertical scrolling */
		gap: 100px; /* Gap between items */
	}

	.synopsis {
		max-height: 400px; /* Adjust the height as needed */
		overflow-y: auto; /* Enable vertical scrolling */
	}
	.info-item {
		color: black;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		/* Align info item content to the right */
		margin-left: 2rem;
		/* Space between items, now on the left */
	}

	.info-title {
		color: black;
		font-size: 0.8rem;
		font-weight: bold;
		/* Optional: make the content bold */
		margin-bottom: 0.25rem;
	}

	.info-content {
		text-align: right;
		/* Align text to the right */
		color: black;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		word-wrap: break-word;
		word-break: normal;
		max-width: 100%;
	}
	.text-wrapper {
		display: flex;
		justify-content: left;
		align-items: flex-start;
		flex-direction: column;
		justify-content: space-between;
	}
	flex {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	img {
		object-fit: contain;
		max-width: 100%;
		max-height: 100%;
	}
	h1 {
		font-size: 3rem;
	}
	p {
		font-size: 1.5rem;
	}

	a {
		display: block;
		word-wrap: break-word;
		word-break: normal;
		transition:
			background-color 0.3s ease,
			color 0.3s ease; /* Smooth transition for background and text color */
		background-color: rgba(255, 255, 255, 0);
		/* Make the link fill the exhibition item's row */
		text-decoration: none;
		/* Optional: Removes underline from links */
		color: inherit;
		/* Optional: Inherits color from parent */
		line-height: 2rem;
	}

	a:hover {
		background-color: rgba(0, 0, 0, 1);
		filter: invert(100%); /* Invert colors on hover */
	}
</style>
