<script lang="ts">
	import { T, useThrelte } from '@threlte/core';
	import {
		Gizmo,
		interactivity,
		OrbitControls,
		type IntersectionEvent
	} from '@threlte/extras';
	import Box from './Box.svelte';
	import { setContext } from 'svelte';
	import * as THREE from 'three';

	const { scene } = useThrelte();
	scene.background = new THREE.Color('lime');

	interactivity();

	let width = window.innerWidth;
	let height = window.innerHeight;

	const ratio = width / height;

	const sq2 = Math.sqrt(2);

	const num_boxes = 30;
	const surface_width: number = 25;
	const surface_height: number = surface_width / ratio;

	const box_side =
		ratio > 1
			? surface_width / (num_boxes / sq2)
			: surface_height / (num_boxes / (sq2 * 2));

	const [N, M] =
		ratio > 1
			? [num_boxes + 1, Math.ceil(surface_height / (sq2 * box_side))+1]
			: [
					Math.ceil((2 * surface_width) / (sq2 * box_side)) + 1,
					Math.ceil(num_boxes / 4) + 1
				];

	let heights: Array<Array<number>> = $state(
		Array.from({ length: N }, (el, idx) =>
			Array.from({ length: M }, (el, jdx) => -box_side / 4)
		)
	);

	setContext('heights', heights);

	const min_time_delta = 20;
	let last_move = new Date().getTime();

	let surface: THREE.Mesh = $state(new THREE.Mesh());
	// svelte-ignore non_reactive_update
	let camera: THREE.OrthographicCamera;

	const link_canvas = document.createElement('canvas');
	link_canvas.width = surface_width * 100;
	link_canvas.height = surface_height * 100;
	const ctx = link_canvas.getContext('2d', {willReadFrequently:true});
	ctx!.fillStyle = 'white';
	ctx!.fillRect(0, 0, surface_width * 100, surface_height * 100);
	ctx!.save();
	ctx!.translate(surface_width * 55, surface_height * 43);
	ctx!.rotate(-Math.PI / 4);

	ctx!.strokeStyle = 'red';
	ctx!.lineWidth = box_side * 100;
	ctx!.strokeRect(
		-box_side * 7 * 100,
		-box_side * 3 * 100,
		box_side * 6 * 100,
		box_side * 4 * 100
	);

	ctx!.translate(box_side * 3 * 100, box_side * 2 * 100);
	ctx!.strokeRect(
		-box_side * 7 * 100,
		-box_side * 3 * 100,
		box_side * 6 * 100,
		box_side * 4 * 100
	);

	ctx!.restore();

	const texture = new THREE.CanvasTexture(link_canvas);

	function link_image() {
		for (let idx = 0; idx < N; idx++) {
			for (let jdx = 0; jdx < M; jdx++) {
				const rem = idx % 2;

				const x = ( ((idx-rem)/2)+rem/2)* box_side*sq2 
				const z = (jdx+rem/2)* box_side*sq2
				
				const img_data = ctx!.getImageData(100 * x, 100 * z, 1, 1).data;
				const [r, g, b, a] = img_data;
				console.log(x,z, r,g,b)

				if (r == 255 && g == 0) {
					heights[idx][jdx] = box_side / 4;
				}
			}
		}
		heights = heights;
	}
	link_image()

	function pointer2heights(pointer_pos: THREE.Vector3) {
		for (let idx = 0; idx < N; idx++) {
			for (let jdx = 0; jdx < M; jdx++) {
				// could use an array and only calculate this once, but it's not too heavy calculations, will come back
				const box_pos = calculateBoxPosition(idx, jdx);
				const distance = box_pos.distanceTo(pointer_pos);
				let height;
				if (distance > box_side * 2) height = -box_side / 4;
				else
					height =
						box_side * Math.exp(-0.5 * distance ** 2) -
						box_side / 4;
				heights[idx][jdx] = height;
			}
		}
		heights = [...heights];
	}

	function handleSurfaceMove(event: IntersectionEvent<PointerEvent>) {
		const curr_time = new Date().getTime();
		if (curr_time - last_move < min_time_delta) return;
		limelight.x = event.point.x;
		limelight.z = event.point.z;

		limelight.intensity = 10;
		pointer2heights(event.point);
		last_move = curr_time;
	}

	const localTopLeft = new THREE.Vector3(
		-surface_width / 2,
		surface_height / 2,
		0
	);
	const localTopRight = new THREE.Vector3(
		surface_width / 2,
		surface_height / 2,
		0
	);
	const localBottomLeft = new THREE.Vector3(
		-surface_width / 2,
		-surface_height / 2,
		0
	);
	const localBottomRight = new THREE.Vector3(
		surface_width / 2,
		-surface_height / 2,
		0
	);

	let worldTopLeft = new THREE.Vector3();
	let worldTopRight = new THREE.Vector3();
	let worldBottomLeft = new THREE.Vector3();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	let worldBottomRight = new THREE.Vector3();

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	let flag = $state(false);

	// on startup
	$effect(() => {
		camera.lookAt(surface.position);
		camera.left = -surface_width / 2;
		camera.right = surface_width / 2;

		const theta = camera.position.angleTo(
			new THREE.Vector3(camera.position.x, 0, camera.position.z)
		);

		camera.top = (surface_height / 2) * Math.sin(theta);
		camera.bottom = -(surface_height / 2) * Math.sin(theta);

		camera.zoom = 1.05// - 0.1;
		camera.updateProjectionMatrix();

		surface.updateMatrixWorld(true);
		worldBottomRight = localBottomRight
			.clone()
			.applyMatrix4(surface.matrixWorld);
		worldBottomLeft = localBottomLeft
			.clone()
			.applyMatrix4(surface.matrixWorld);
		worldTopRight = localTopRight.clone().applyMatrix4(surface.matrixWorld);
		worldTopLeft = localTopLeft.clone().applyMatrix4(surface.matrixWorld);
		flag = true;
	});

	function calculateBoxPosition(idx: number, jdx: number) {
		const rem = idx % 2;
		idx = (idx - rem) / 2;

		const base_hor = worldTopRight.clone().sub(worldTopLeft).normalize();

		const base_ver = worldBottomLeft.clone().sub(worldTopLeft).normalize();

		return worldTopLeft
			.clone()
			.add(base_hor.clone().multiplyScalar((idx+rem/2) * box_side *sq2))
			.add(base_ver.clone().multiplyScalar((jdx+rem/2 )* box_side * sq2))
	}

	let limelight = $state({ x: 0, z: 0, intensity: 0 });
</script>

<T.OrthographicCamera makeDefault position={[20, 20, 20]} bind:ref={camera}>
	<OrbitControls>
		<Gizmo />
	</OrbitControls>
</T.OrthographicCamera>

<!-- <T.PerspectiveCamera makeDefault position={[20, 20, 20]} bind:ref={camera}> -->
<!-- 	<OrbitControls> -->
<!-- 		<Gizmo /> -->
<!-- 	</OrbitControls> -->
<!-- </T.PerspectiveCamera> -->

<!-- <T.DirectionalLight position={[10, 1, 10]}/> -->

<T.PointLight
	position={[0, 15, surface_height / 2]}
	castShadow
	intensity={300}
/>
<T.PointLight
	position={[
		limelight.x + box_side * 1.2,
		-box_side,
		limelight.z + box_side * 1.2
	]}
	castShadow
	color={'lime'}
	intensity={limelight.intensity}
/>

{#if flag}
	{#each { length: N }, idx}
		{#each { length: M }, jdx}
			<Box
				id={[idx, jdx]}
				position={calculateBoxPosition(idx, jdx)}
				size={[box_side, box_side / 2, box_side]}
			/>
		{/each}
	{/each}
{/if}

<T.Mesh
	bind:ref={surface}
	rotation={[-Math.PI / 2, 0, Math.PI / 4]}
	onpointermove={handleSurfaceMove}
	position.y="0.01"
>
	<T.PlaneGeometry args={[surface_width, surface_height]} />
	<T.MeshBasicMaterial visible={false} map={texture} />
</T.Mesh>

