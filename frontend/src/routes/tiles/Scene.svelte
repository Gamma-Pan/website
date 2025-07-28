<script lang="ts">
	import { T } from '@threlte/core';
	import CC from 'camera-controls';
	import {
		interactivity,
		CameraControls,
		type CameraControlsRef
	} from '@threlte/extras';
	import Box from './Box.svelte';
	import { Tween } from 'svelte/motion';
	import { setContext } from 'svelte';
	import { bounceIn, bounceOut, elasticIn, elasticOut, expoIn, expoOut, sineIn, sineInOut, sineOut } from 'svelte/easing';

	export const easing_all = sineInOut

	const pi = Math.PI;
	
	let is_touch = false;
	if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
		is_touch = true;
	}

	interactivity({
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		filter: (hits, state) => {
			return hits.slice(0, 1);
		}
	});

	const num_boxes = 7;
	let active: [number, number] = $state([num_boxes, num_boxes]);

	let plight_position: [number, Tween<number>, number] = $state([
		0,
		new Tween(0, {easing: easing_all}),
		0
	]);
	let plight_intensity = $state(new Tween(0, {easing: easing_all}));

	function update_light(
		x: number,
		y_val: number,
		y_args: object,
		z: number,
		i_val: number,
		i_args: object
	) {
		plight_position[0] = x;
		plight_position[1].set(y_val, y_args);
		plight_position[2] = z;
		plight_intensity.set(i_val, i_args);
	}

	let d_heights = $state(
		Array.from({ length: num_boxes }, () =>
			Array.from({ length: num_boxes }, () => new Tween(-10, {easing: easing_all}))
		)
	);
	setContext('d_heights', d_heights);

	let { tile_image } = $props();

	const arrows = [
		[0, 0, 0, 0, 0, 0, 0],
		[0, 1, 0, 0, 0, 0, 0],
		[0, 0, 1, 0, 0, 0, 0],
		[0, 0, 0, 1, 0, 1, 0],
		[0, 0, 0, 0, 0, 1, 0],
		[0, 0, 0, 1, 1, 1, 0],
		[0, 0, 0, 0, 0, 0, 0]
	];

	const profile = [
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 1, 1, 0],
		[0, 0, 0, 0, 1, 1, 0],
		[0, 1, 1, 1, 0, 0, 0],
		[0, 1, 1, 1, 0, 0, 0],
		[0, 1, 1, 1, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0]
	];

	const chess = [
		[0, 0, 0, 0, 0, 0, 0],
		[0, 1, 0, 1, 0, 1, 0],
		[0, 0, 1, 0, 1, 0, 0],
		[0, 1, 0, 1, 0, 1, 0],
		[0, 0, 1, 0, 1, 0, 0],
		[0, 1, 0, 1, 0, 1, 0],
		[0, 0, 0, 0, 0, 0, 0],
	];

	const none = Array(num_boxes).fill(Array(num_boxes).fill(1));

	const arrays: { [key: string]: number[][] } = {
		arrows: arrows,
		profile: profile,
		chess: chess,
		none: none
	};

	let tile_array = $derived(arrays[tile_image]);

	function handle_link_hover() {
		update_light(0, 0, {}, 0, 0, { duration: 0 });
		active = [num_boxes + 1, num_boxes + 1];

		tile_array.forEach((eli, idx) => {
			eli.forEach((elj, jdx) => {
				if (elj) {
					d_heights[idx][num_boxes - 1 - jdx].set(0);
				} else {
					d_heights[idx][num_boxes - 1 - jdx].set(-4, {
						duration: 500
					});
				}
			});
		});
	}

	$effect(() => {
		if (tile_array) {
			handle_link_hover();
		} else {
			d_heights.forEach((eli) => {
				eli.forEach((elj) => {
					elj.set(0, {duration: 500+ Math.random()*500}) 
				})
			})

			active = [3,3]
		}
	});

	let camera_controls = $state<CameraControlsRef>();

	function handle_mouse_move(e: MouseEvent) {
		if(is_touch) return
		const dx = (e.clientX - window.innerWidth / 2) * 1e-4;
		const dy = (e.clientY - window.innerHeight / 2) * 1e-4;
		camera_controls?.rotateTo(pi / 4 - dx, pi / 3 - dy);
	}

	if (navigator.maxTouchPoints == undefined){
		document.addEventListener('mousemove', handle_mouse_move);
	}
	
</script>

<T.OrthographicCamera makeDefault position={[10, 10, 10]} zoom={100}>
	<CameraControls
		bind:ref={camera_controls}
		oncreate={(ref: CameraControlsRef) => {
			ref.setTarget(0, 1, 0);
			ref.rotateTo(pi / 4, pi / 3);
			ref.mouseButtons.wheel = CC.ACTION.NONE;
			ref.mouseButtons.right = CC.ACTION.NONE
			ref.mouseButtons.left = CC.ACTION.NONE
			ref.touches.one = CC.ACTION.NONE;
			ref.touches.two = CC.ACTION.NONE;
			ref.touches.three = CC.ACTION.NONE;
		}}
	/>
</T.OrthographicCamera>

<T.DirectionalLight position={[-10, 20, 10]} intensity={0.1} />

<T.PointLight
	position={[
		plight_position[0],
		plight_position[1].current,
		plight_position[2]
	] as [x: number, y: number, z: number]}
	intensity={plight_intensity.current}
	color="hotpink"
	castShadow
/>

{#each Array.from({ length: num_boxes }, (_, i) => i) as idx}
	{#each Array.from({ length: num_boxes }, (_, j) => j) as jdx}
		{@const delta = Math.floor(num_boxes / 2)}
		{@const position = [0.5 + idx - delta, 0, 0.5 + jdx - delta] as [
			x: number,
			y: number,
			z: number
		]}
		<Box bind:active {position} index={[idx, jdx]} {update_light}  {easing_all}/>
	{/each}
{/each}
