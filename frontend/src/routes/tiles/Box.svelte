<script lang="ts">
	import { T } from '@threlte/core';
	import {
		RoundedBoxGeometry,
	} from '@threlte/extras';
	import { getContext} from 'svelte';
	import { expoIn } from 'svelte/easing';
	import { Tween } from 'svelte/motion';

	let d_heights: Array<Array<Tween<number>>> = getContext('d_heights');

	let {
		position,
		index,
		active = $bindable(),
		update_light,
		easing_all
	}: {
		position: [number, number, number];
		index: [number, number];
		active: [number, number];
		update_light: CallableFunction;
		easing_all: (t:number) => number;
	} = $props();

	let castShadow = $state(true);
	let receiveShadow = $state(true);

	let d_height = d_heights[index[0]][index[1]];
	let emisive_intensity = $state(new Tween(0, {easing: easing_all}));
	let emisive: undefined | string = $state(undefined);

	function box_up() {
		if (d_height.target == 1.7) return;

		// put previous active down
		try {
			d_heights[active[0]][active[1]].set(0);
		} catch {
			//noop
		}

		d_height.target = 1.7;

		active[0] = index[0];
		active[1] = index[1];

		castShadow = false;
		receiveShadow = false;

		emisive = 'hotpink';
		emisive_intensity.target = 0.4;

		const pos = position;
		update_light(pos[0], 0, { duration: 0 }, pos[2], 0, { duration: 0 });
		update_light(pos[0], 1.7, {}, pos[2], 1, {});
	}

	$effect(() => {
		if (index[0] != active[0] || index[1] != active[1]) {
			//d_height.set(0);
			emisive = undefined;
			emisive_intensity.set(0);
			castShadow = true;
			receiveShadow = true;
		} else {
			box_up();
		}
	});
</script>

<T.Mesh
	onclick={box_up}
	{receiveShadow}
	{castShadow}
	{position}
	position.y={position[1] + d_height.current}
>
	<RoundedBoxGeometry
		args={[0.98, 1, 0.98]}
		radius={0.05}
		smoothness={5}
		creaseAngle={0.05}
	/>
	<T.MeshPhongMaterial
		opacity={d_height.current > 0 ? 1 : 1 + d_height.current * 0.5}
		transparent
		color="#ffffff"
		emissive={emisive}
		emissiveIntensity={emisive_intensity.current}
	/>
</T.Mesh>
