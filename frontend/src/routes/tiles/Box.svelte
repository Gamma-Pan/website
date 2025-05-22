<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { type IntersectionEvent } from '@threlte/extras';
	import { getContext } from 'svelte';
	import { Spring } from 'svelte/motion';
	import * as THREE from 'three';

	const {
		id = Array(2),
		position = undefined,
		size = [0, 0, 0]
	}: {
		id: Array<number>;
		position: THREE.Vector3 | undefined;
		size: number[];
	} = $props();

	let heights = $state(getContext('heights') as Array<Array<number>>);

	const [idx, jdx] = id;
	let position_y = new Spring(0, { stiffness: 0.2  });

	let accum = 0;
	let flag = 1;
	const { start, stop } = useTask(
		(delta) => {
			accum += delta;
			if (accum < 0.5 + Math.random()) return;
			accum = 0;
			flag = -flag;
			position_y.set(heights[idx][jdx] + flag * Math.random() * 0.1, {
				preserveMomentum: 100
			});
		},
		{ autoStart: false }
	);

	$effect(() => {
		const height = heights[idx][jdx];
		position_y.set(height);
		if (height > size[1] / 2) {
			start();
		} else {
			stop();
		}
	});

	function handleclick(event: IntersectionEvent<PointerEvent>) {
		if (event.faceIndex != 4) return;
		if (heights[idx][jdx] == size[1]/2.1) {
			heights[idx][jdx] = 0;
		} else {
			heights[idx][jdx] = size[1]/2.1; 
		}
		heights = heights;
	}
</script>

<T.Mesh
	position.x={position?.x}
	position.y={position_y.current}
	position.z={position?.z}
	castShadow
>
	<T.BoxGeometry args={size} />
	<T.MeshStandardMaterial color="rgb(125, 80, 128 )" />
</T.Mesh>
