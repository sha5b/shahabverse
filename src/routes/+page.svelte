<script>
  import App from '$lib/App.svelte'
  export let data
</script>

<div>
  <App {data}/>
</div>

<style>
  :global(body) {
    margin: 0;
  }

  div {
    width: 100vw;
    height: 100vh;
  }
</style>
