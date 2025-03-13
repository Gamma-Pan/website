<script lang="ts">
	import {PUBLIC_API_IP} from '$env/static/public'

	let { w, h }: { w: number; h: number } = $props();
	// these could be props or pass from an api
	const pi: number = Math.PI;
	const N: number = 30;
	const dots_len = 300;
	const dtheta = 0.01;
	const center = { x: 50, y: 50 };
	let myPath: SVGPathElement;

	// the vectors angles is what changes over time
	let theta = $state(0);
	let dots = $state(Array(dots_len));

	// Create a promise that resolves when the path is ready and data is fetched
	let dataPromise = $state<Promise<{
		magnitudes: number[];
		phases: number[];
		freqs: number[];
		samples: { x: number; y: number }[];
	}> | null>(null);

	// Update the promise when myPath becomes available
	$effect(() => {
		if (myPath) {
			dataPromise = initializeData();
		}
	});

	async function initializeData() {
		// Get points from the SVG path
		const [points_x, points_y, samples] = get_points(myPath, 2 * N + 1);

		// Fetch coefficients from API
		const [magnitudes, phases, freqs] = await get_coeffs(points_x, points_y);
		console.log(freqs);
		return { magnitudes, phases, freqs, samples };
	}

	// Create positions based on current data and theta
	function get_positions_of_circles(
		theta: number,
		M: number,
		magnitudes: number[],
		phases: number[],
		freqs: number[]
	) {
		let pos = [center];

		for (let i = 0; i < 2 * M + 1; i++) {
			pos.push({
				x:
					pos[i].x +
					(1 / (2 * M + 1)) *
						magnitudes[i] *
						Math.cos(freqs[i] * theta + phases[i]),
				y:
					pos[i].y -
					(1 / (2 * M + 1)) *
						magnitudes[i] *
						Math.sin(freqs[i] * theta + phases[i])
			});
		}
		return pos;
	}

	function get_points(
		path: SVGPathElement,
		num_points: number
	): [number[], number[], { x: number; y: number }[]] {
		const total_length = path.getTotalLength();
		let points_x = Array(num_points);
		let points_y = Array(num_points);
		let samples = Array(num_points);

		const t_trans_node = path.getCTM();
		const t_trans_parent = (path.parentNode as SVGPathElement).getCTM();
		const t_trans = t_trans_parent!.inverse().multiply(t_trans_node!);

		for (let idx = 0; idx < num_points; idx++) {
			const distance = (1 - idx / num_points) * total_length;
			const point = path.getPointAtLength(distance).matrixTransform(t_trans);
			points_x[idx] = point.x - center.x;
			points_y[idx] = center.y - point.y;
			samples[idx] = { x: point.x, y: point.y };
		}

		return [points_x, points_y, samples];
	}

	async function get_coeffs(points_x: number[], points_y: number[]) {
		const response = await fetch(`http://${PUBLIC_API_IP}:8080/data`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ x: points_x, y: points_y })
		});
		const jres = await response.json();
		return [jres.magn, jres.angles, jres.freqs];
	}

	// Start animation only when data is ready
	$effect(() => {
		let animationId: number | null = null;

		// Set up animation once data is resolved
		dataPromise!
			.then((data) => {
				function animate() {
					// Update theta and loop between 0 and 2π
					theta = (theta + dtheta) % (2 * pi);

					// Calculate new positions
					const positions = get_positions_of_circles(
						theta,
						N,
						data.magnitudes,
						data.phases,
						data.freqs
					);

					// Update dots with the latest position
					const newDot = positions[positions.length - 1];
					dots = [...dots.slice(1), newDot];

					animationId = requestAnimationFrame(animate);
				}

				animationId = requestAnimationFrame(animate);
			})
			.catch((err) => {
				console.error("Animation couldn't start:", err);
			});

		// Cleanup function
		return () => {
			if (animationId !== null) {
				cancelAnimationFrame(animationId);
			}
		};
	});
</script>

<div class="container" style="height:{h}px;width:{w}px">
	<svg viewBox="0 0 100 100">
		{#if dataPromise}
			{#await dataPromise}
				<!-- Loading state - could add a loading indicator here -->
			{:then data}
				<!-- Data is loaded, render the visualization -->
				{#each data.samples as { x, y }}
					<circle cx={x} cy={y} r="0.5" fill="pink" opacity="0.5" />
				{/each}

				{#if theta !== undefined}
					{@const positions = get_positions_of_circles(
						theta,
						N,
						data.magnitudes,
						data.phases,
						data.freqs
					)}

					{#each positions.slice(0, -1) as { x, y }, idx}
						<line
							x1={x}
							y1={y}
							x2={positions[idx + 1].x}
							y2={positions[idx + 1].y}
							stroke="black"
							opacity="0.5"
							stroke-width="0.2"
						/>
						<circle
							cx={x}
							cy={y}
							r={(1 / (2 * N + 1)) * data.magnitudes[idx]}
							stroke="black"
							fill="none"
							stroke-width="0.1"
							opacity="0.1"
						/>
					{/each}

					{#each dots.slice(0, -1) as dot, idx}
						{#if dots[idx + 1] !== undefined && dots[idx] !== undefined}
							<line
								x1={dot.x}
								y1={dot.y}
								x2={dots[idx + 1].x}
								y2={dots[idx + 1].y}
								stroke="red"
								stroke-width={idx / dots_len}
							/>
						{/if}
					{/each}
				{/if}
			{:catch error}
				<!-- Error state -->
				<text x="10" y="50" fill="red">Error loading data: {error.message}</text
				>
			{/await}
		{/if}

		<path
			style="stroke: rgb(0, 0, 0); fill: none; stroke-width: 1px;"
			opacity="0.1"
			d="M504.302,195.59c-10.618-6.362-29.71-43.514-33.959-47.755c-4.249-4.256-28.662-13.81-28.662-13.81
		l-13.795-43.514c-26.542,3.185-42.449,45.634-43.513,48.819c0,0-2.661,73.764-120.47,45.11
		c-84.437-20.54-135.22-40.407-177.872-0.36c-2.668-4.578-4.491-9.234-5.822-14.257c-2.378-9.062-2.918-19.46-2.91-31.308
		c0-5.806,0.109-11.924,0.117-18.34c-0.008-13.436-0.493-28.248-4.046-44.015C69.85,60.386,63.136,43.743,51.344,27.162
		c-5.086-7.168-15.024-8.858-22.199-3.764c-7.167,5.094-8.858,15.031-3.764,22.199c9.304,13.145,14.162,25.368,16.932,37.551
		c2.739,12.167,3.271,24.397,3.264,37.027c0,6.024-0.118,12.136-0.118,18.34c0.016,12.646,0.438,25.799,3.928,39.32
		c2.746,10.735,7.722,21.58,15.508,31.706C31.93,261.458,50.037,316.584,50.037,316.584l-34.093,54.241
		c-0.618,0.978-1.033,2.066-1.244,3.192L0.146,454.073c-0.641,3.521,0.862,7.08,3.819,9.084l40.979,27.763
		c0.876,0.602,1.964,0.775,2.981,0.493c1.026-0.274,1.863-0.994,2.308-1.949l8.326-17.825c0.618-1.338,0.368-2.918-0.634-3.998
		l-10.728-11.448c-2.182-2.324-2.973-5.634-2.081-8.701l17.84-61.033c0.579-1.948,1.784-3.646,3.435-4.82l23.983-17.058
		c3.255-2.332,7.66-2.222,10.806,0.251c3.146,2.472,4.288,6.721,2.809,10.438L93.41,401.858c-1.22,3.051-0.681,6.525,1.401,9.06
		l60.298,73.365h45.218c1.996,0,3.616-1.62,3.616-3.607v-22.504c0-1.996-1.62-3.615-3.616-3.615h-14.303
		c-3.342,0-6.409-1.854-7.982-4.804l-24.484-41.049c-1.643-3.106-1.33-6.87,0.783-9.663l21.948-28.999
		c1.706-2.245,4.367-3.575,7.192-3.575h61.197c2.872,0,5.579,1.376,7.277,3.701c1.698,2.324,2.191,5.313,1.33,8.059l-19.726,62.16
		c-0.626,1.957-0.564,4.077,0.18,5.994l12.653,32.598h39.272v-8.49l-6.494-20.415c-0.61-1.909-0.563-3.967,0.133-5.852
		l26.471-71.847c1.315-3.553,4.694-5.908,8.474-5.908h27.011c2.449,0,4.796,1.002,6.502,2.777l74.813,103.365c0,0,38.208,0,50.947,0
		c12.738,0,7.809-25.414-4.241-26.542c-22.826-2.12-52.004-65.798-64.742-88.09c-12.739-22.285,24.664-91.299,53.067-94.453
		c28.654-3.185,43.514-14.867,47.763-30.79C513.856,223.187,514.92,201.959,504.302,195.59z"
			bind:this={myPath}
			transform="scale(0.15) translate(70 70)"
		/>
	</svg>
</div>

<style>
	.container {
		border: 1px solid black;
	}
	svg {
		height: 100%;
		width: 100%;
	}
</style>
