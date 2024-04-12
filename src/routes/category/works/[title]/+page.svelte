<script>
	//@ts-nocheck
	export let data;
	import { page } from '$app/stores';

	// Access the title parameter from the URL
	let titleParam = $page.params.title;

	// Find the work data that matches the title parameter
	let workData = data.works.find((work) => work.title === titleParam);

	// Now you can access both the title and the id from the workData object
	let workId = workData ? workData.id : null;

	function formatDate(dateString) {
		const options = {
			year: 'numeric',
			month: 'long'
		};
		const date = new Date(dateString);
		return date.toLocaleDateString(undefined, options);
	}
</script>


<div>
	{#each data.works as work}
		{#if work.id === workId}
			<h1>{work.title}</h1>
			<h3>date: {formatDate(work.date)}</h3>
			<h3>category: {work.expand.category.title}</h3>
			<h3>{work.type} media</h3>
			<h3>format: {work.format}</h3>
			<h3>dimensions: {work.dimension}</h3>
			{#if work.editions}
				<p>printeditions: {work.editions}</p>
			{/if}
			{#if work.expand.colab}
				<h3>collaboration:</h3>
				{#each work.expand.colab as colab}
					<div>
						<a href={colab.link} target="_blank">{colab.title}</a>
					</div>
				{/each}
			{/if}
			{#if work.synopsis}
				<h3>synopsis</h3>
				<div>{@html work.synopsis}</div>
			{/if}
			{#if work.expand.exhibitions}
				<h3>exhibitoins</h3>
				{#each work.expand.exhibitions as exhibition}
					{#each data.colabs as colab}
						{#if colab.id === exhibition.curator}
							<div>
								<a href={exhibition.link} target="_blank">{exhibition.title}</a>
							</div>
						{/if}
					{/each}
				{/each}
			{/if}
			<!-- {#if work.expand.reference}
				{#each work.expand.reference as reference}
					<p>{reference.title}</p>
				{/each}
			{/if} -->
		{/if}
	{/each}
</div>

<style>
</style>
