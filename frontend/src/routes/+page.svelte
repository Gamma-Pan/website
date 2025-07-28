<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Scene from './tiles/Scene.svelte';

	let tile_image: string | null = $state(null);

	let menu_is_open = $state(false);

	$effect(() => {
		function handle_resize() {
			menu_is_open = false;
		}

		window.addEventListener('resize', handle_resize);

		return () => {
			window.removeEventListener('resize', handle_resize);
		};
	});
</script>

<nav>
	<div
		class="navbar-outer-container shady-block"
		onblur={() => {}}
		onmouseleave={() => {
			tile_image = 'null';
		}}
		role="navigation"
	>
		<div class="name-item">
			<span>Yiorgos Panagiotopoulos</span>
		</div>

		<div class="links">
			<span class="nav-link" tabindex="0" role="link">
				<a
					href="./fourier"
					onmouseenter={() => {
						tile_image = 'arrows';
					}}
				>
					links</a
				>
			</span>

			<span class="link-sep">/</span>

			<span class="nav-link" role="link" tabindex="0">
				<a
					onmouseenter={() => {
						tile_image = 'chess';
					}}
					href="./fourier">playground</a
				></span
			>
			<span class="link-sep">/</span>
			<span
				class="nav-link"
				role="link"
				tabindex="0"
				onmouseenter={() => {
					tile_image = 'profile';
				}}><a href="./fourier">cv</a></span
			>
		</div>
	</div>

	<div
		class="hamburger-menu shady-block"
		onclick={(e) => {
			menu_is_open = !menu_is_open;
		}}
	>
		<div class="inner-container" class:open={menu_is_open}>
			<div class="line a"></div>
			<div class="line b"></div>
			<div class="line c"></div>
		</div>

		<div
			class="hamburger-list"
			class:open={menu_is_open}
			onmouseleave={() => {
				tile_image = 'null';
			}}
		>
			<span class="ham-link" tabindex="0" role="link">
				<a
					onmouseenter={() => {
						tile_image = 'arrows';
					}}
					href="./fourier">links</a
				>
			</span>

			<span class="ham-link" role="link" tabindex="0">
				<a
					onmouseenter={() => {
						tile_image = 'chess';
					}}
					href="./fourier">playground</a
				></span
			>

			<span class="ham-link" role="link" tabindex="0">
				<a
					onmouseenter={() => {
						tile_image = 'profile';
					}}
					href="./fourier">cv</a
				></span
			>
		</div>
	</div>
</nav>

<div class="canvas-container">
	<Canvas>
		<Scene {tile_image} />
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
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 1rem;
	}

	.hamburger-list {
		position: relative;
		top: 1rem;
		right: 1rem;
		display: flex;
		flex-direction: column;
		display: none;
	}

	.hamburger-list.open {
		display: flex;
	}

	.hamburger-menu {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 5rem;

		margin-right: 2rem;
		right: 0;

		position: absolute;
		transition: margin-right 0.5s;

		z-index: 100;
		overflow: hidden;
	}

	.hamburger-menu:has(.open) {
		height: 10rem;
		width: min(90vh, 15rem);
		position: absolute;
		top: 0;
		right: 0;
		z-index: 1000;
		transition:
			height 0.3s,
			width 0.3s;
	}

	.hamburger-menu > .inner-container {
		width: 1.8rem;
		height: 1.8rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: column;
		position: absolute;
		top: 1.6rem;
		right: 1.6rem;
	}

	.line {
		transition:
			transform 0.4s,
			width 0.3s;
	}

	.hamburger-menu > .inner-container > .line {
		height: 4px;
		background-color: rgba(0, 0, 0, 0.9);
		width: 100%;
		border-radius: 2px;
	}

	.hamburger-menu > .open.inner-container > .line.a {
		position: relative;
		transform: translateY(0.8rem) rotate(45deg);
	}

	.hamburger-menu > .open.inner-container > .line.b {
		width: 0;
	}

	.hamburger-menu > .open.inner-container > .line.c {
		position: relative;
		transform: translateY(-0.7rem) rotate(-45deg);
	}

	.navbar-outer-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		white-space: nowrap;
		width: 100%;
		overflow: hidden;
		position: relative;
		transition: margin 0.3s;
		z-index: 200;

		margin-left: 2rem;
		margin-right: 2rem;
	}

	.shady-block {
		height: 5rem;
		border-radius: 30px;
		border: 2px solid rgba(0, 0, 0, 0.9);

		background-color: rgb(242, 240, 233);
		box-shadow: 10px 10px 0px 0px rgba(0, 0, 0, 0.9);
	}

	.name-item {
		flex-grow: 1;
		margin-left: 1rem;
		padding-top: 0.4rem;
		font-size: 2.3rem;
	}

	.links {
		position: relative;
		margin-right: 0.8rem;
		margin-top: 0.4rem;
		overflow: hidden;
		justify-content: center;
		align-items: center;
		display: flex;
	}

	@media (max-width: 800px) {
		.hamburger-menu {
			margin-right: 1.5rem;
		}

		.links {
			padding-left: 100%;
			transition: padding-left 0.5s;
		}

		.navbar-outer-container {
			margin-left: 1rem;
			margin-right: 8rem;
		}
	}

	@media (max-width: 550px) {
		.navbar-outer-container {
			height: 6rem;
			margin-left: 0;
			margin-right: 0;
			border: 0;
			border-radius: 0px 0px 30px 30px;
			border-left: 2px solid black;
			border-right: 2px solid black;
			border-bottom: 2px solid black;
		}

		.name-item {
			font-size: 1.8rem;
			transition: font-size 0.7s;
		}

		.links {
			display: none;
		}

		.hamburger-menu:has(.open) {
			border: 2px solid black;
		}

		.hamburger-menu {
			margin-top: 0.5rem;
			margin-right: 2rem;
			top: 0;
			border: none;
			box-shadow: none;
			z-index: 1000;
		}

		nav {
			padding: 0;
			margin-top: 0;
			width: 105%;
			justify-content: center;
		}
	}

	.ham-link {
		font-size: 1.5rem;
		margin-bottom: 0.5rem;
	}

	.ham-link > a {
		border: 1px solid rgba(0, 0, 0, 0);
		color: black;
		text-decoration: none;
	}

	.nav-link {
		font-size: 1.5rem;
	}

	.link-sep {
		margin-left: 0.5rem;
		margin-right: 0.5rem;
		font-size: 2rem;
		position: relative;
		top: 0.1rem;
		color: hotpink;
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
		background-color: #e0d3af;
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
