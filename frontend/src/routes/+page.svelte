<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Scene from './tiles/Scene.svelte';
	
</script>

<nav>
	<div id="navbar-outer-container">
		<div id="name-item">
			<span>Yiorgos Panagiotopoulos</span>
		</div>
		<div id="links">
			<span
				role="link"
				tabindex="0"
				class="nav-link"><a href="./fourier">links</a></span
			>
			<span class="link-sep">/</span>
			<span class="nav-link"><a href="./fourier">playground</a></span>
			<span class="link-sep">/</span>
			<span class="nav-link"><a href="./fourier">cv</a></span>
		</div>
	</div>
</nav>

<div class="canvas-container">
	<Canvas>
		<Scene />
	</Canvas>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&display=swap');

	* {
		font-family: 'Newsreader', serif;
	}

	nav {
		position: fixed;
		z-index: 1000;
		width: 100vw;
		height: 0;
	}

	#navbar-outer-container {
		background-color: rgba(255, 255, 255, 0.9);
		display: flex;
		justify-content: left;
		align-items: center;
		width: 70%;

		margin-top: 3em;
		margin-left: auto;
		margin-right: auto;

		padding-right: 2rem;
		padding-left: 2rem;
		padding-top: 1em;
		padding-bottom: 1em;

		border: 2px solid rgba(0, 0, 0, 0.9);
		border-radius: 1em;

		box-shadow: rgba(0, 0, 0, 0.9) 10px 10px 1px 1px;
	}

	#name-item {
		flex: 1;
		display: flex;
		justify-content: left;
		font-size: 3rem;
		padding-top: 0.3rem;
	}

	#links {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.nav-link {
		font-size: 1.5rem;
	}

	.link-sep {
		margin-left: 0.5rem;
		margin-right: 0.5rem;
		font-size: 2rem;
		opacity: 0.2;
	}

	.nav-link > a {
		padding: 1rem;
		padding-top: 0.5rem;
		padding-bottom: 0.3rem;

		border: 1px solid rgba(0, 0, 0, 0);
		color: black;
		text-decoration: none;
	}

	a:hover {
		color: hotpink;
		transition: color 1s;
	}

	.canvas-container {
		background-color: rgb(0,8,6);
		position: absolute;
		margin: 0;
		width: 100%;
		height: 100%;
		position: fixed;
	}

	:global(html),
	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>
