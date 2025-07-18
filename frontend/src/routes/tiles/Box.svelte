<script lang="ts">
	import { T } from '@threlte/core';
	import { RoundedBoxGeometry, type IntersectionEvent } from '@threlte/extras';
	import { Tween } from 'svelte/motion';
	import { PointLight } from 'three';
	const pi = Math.PI;

	let {
		position,
		index,
		active = $bindable(),
	}: {
		position: [number, number, number];
		index: [number, number];
		active: [number, number];
	} = $props();

	let castShadow = $state(true);
	let receiveShadow = $state(true);

	let d_height = $state(new Tween(0));
	let emisive_intensity = $state(new Tween(0));
	let emisive: undefined | string = $state(undefined);

	function box_up(event: IntersectionEvent<PointerEvent>) {
		d_height.target = 1.7;

		active[0] = index[0]
		active[1] = index[1]

		castShadow = false;
		receiveShadow = false;

		emisive = 'pink';
		emisive_intensity.target = 0.2;
	}

	$effect(() => {
		if (index[0] != active[0] || index[1] != active[1]) {
			emisive = undefined;
			emisive_intensity.set(0);

			d_height.set(0);

			castShadow = true;
			receiveShadow = true;
		}
	});
</script>

<T.PointLight position={position} position.y = {position[1] +d_height.current} intensity={emisive_intensity.current} color='hotpink'/>

<T.Mesh
	onclick={box_up}
	rotation.y={pi / 4}
	{receiveShadow}
	{castShadow}
	{position}
	position.y={position[1] + d_height.current}
>
	<RoundedBoxGeometry args={[0.98, 1, 0.98]} radius={0.05} bevelSegments={3} />
	<T.MeshPhongMaterial
		color="#edcf9a"
		emissive={emisive}
		emissiveIntensity={emisive_intensity.current}
	/>
</T.Mesh>
