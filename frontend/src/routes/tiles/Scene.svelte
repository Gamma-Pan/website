<script lang="ts">
	import { T } from '@threlte/core';
	import { Gizmo, interactivity, OrbitControls } from '@threlte/extras';
	import * as three from 'three';
	const pi = Math.PI;
	import Box from './Box.svelte';
	import { Tween } from 'svelte/motion';

	interactivity({
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		filter: (hits, state) => {
			return hits.slice(0, 1);
		}
	});

	const num_boxes = 15;
	let active : [number, number] = $state([num_boxes, num_boxes])

	let plight_position : [number, Tween<number>, number]= $state( [0,new Tween(0),0] )
	let plight_intensity = $state(new Tween(0))

</script>

<T.OrthographicCamera
	makeDefault
	position={[5, 5, 1]}
	zoom={150}
	oncreate={(ref) => {
		ref.lookAt(0, 0, 0);
	}}
>
	<!-- <OrbitControls> -->
	<!-- 	<Gizmo /> -->
	<!-- </OrbitControls> -->
</T.OrthographicCamera>

<T.DirectionalLight position={[-10, 20, 0]} intensity={0.1} />

<T.PointLight position={[plight_position[0], plight_position[1].current, plight_position[2]] as [x:number, y:number, z:number]} intensity={plight_intensity.current} color='hotpink'/>

{#each Array.from({ length: num_boxes }, (_, i) => i - Math.floor(num_boxes / 2)) as idx}
	{#each Array.from({ length: num_boxes }, (_, j) => j - Math.floor(num_boxes / 2)) as jdx}
		{@const position = [
			...new three.Vector3(0.5 + idx, 0.5, 0.5 + jdx).applyQuaternion(
				new three.Quaternion().setFromAxisAngle(
					new three.Vector3(0, 1, 0),
					pi / 4
				)
			)
		] as [x: number, y: number, z: number]}
		<Box bind:active={active}  {position} index={[idx,jdx]}/>
	{/each}
{/each}

<T.GridHelper args={[100, 100, 100]} />
