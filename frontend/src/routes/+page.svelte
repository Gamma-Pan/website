<script lang="ts">
	import Fourier from './fourier.svelte';
	import Round from './round.svelte';

	let w, h;
</script>

<div
	bind:clientWidth={w}
	bind:clientHeight={h}
	style="width:800px;height:800px"
>
	<Fourier {w} {h} />
</div>

<style>
</style>
