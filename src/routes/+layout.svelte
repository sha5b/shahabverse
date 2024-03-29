<script>
	import { pirmaryColor, secondaryColor } from '$lib/store.js';
</script>

<svelte:head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="icon" type="image/png" href="/favicon.png" />
	<title>Shahabverse</title>
</svelte:head>

<slot />

<style global>
	@import url('https://fonts.googleapis.com/css?family=Oxanium&display=swap');

	[data-theme='light'],
	:root:not([data-theme='dark']) {
		--primary: #df8766;
		--primary-hover: #df8766;
		--primary-focus: rgba(31, 24, 60, 0.125);
		--primary-inverse: #f4f5f5;
		font-family: 'Oxanium', sans-serif;
	}

	:root::-webkit-scrollbar {
		width: 0.25rem;
	}

	:root::-webkit-scrollbar-track {
		background: gray;
	}

	:root::-webkit-scrollbar-thumb {
		background: black;
	}

	:global(body) {
		margin: 0;
		background: lightgrey;
	}

	:global(h1) {
		margin: 0;
	}
	:global(h2) {
	}
	:global(p) {
		font-size: 1rem;
		letter-spacing: 0.1rem;
		line-height: 1.75rem;
	}
</style>
