<script lang="ts">
	import { PUBLIC_API_IP } from '$env/static/public';

	let {
		w,
		h,
		d,
		N,
		dtheta
	}: { w: number; h: number; d: string; N: number; dtheta: number } =
		$props();

	let currentN = $state(N);

	let myPath: SVGPathElement | null = null;
	const pi: number = Math.PI;
	const center = { x: 50, y: 50 };
	// the vectors angles is what changes over time
	let theta = $state(0);

	const num_dots = 200;
	let dots = $state(Array(num_dots));

	let animationId: number | null = null;

	// Create a promise that resolves when the path is ready and data is fetched
	let dataPromise = $state<Promise<{
		magnitudes: number[];
		phases: number[];
		idxs: number[];
		samples: { x: number; y: number }[];
	}> | null>(null);

	// Update the promise when myPath becomes available
	$effect(() => {
		if (myPath || N) {
			currentN = N;
			dataPromise = initializeData();
		}
	});

	async function initializeData() {
		// Get points from the SVG path
		const [points_x, points_y, samples] = get_points(
			myPath!,
			2 * currentN + 1
		);

		// Fetch coefficients from API
		const [magnitudes, phases, idxs] = await get_coeffs(points_x, points_y);

		let theta = 0;
		let tmp = Array(num_dots);
		for (let idx = 0; idx < num_dots; idx++) {
			theta += (2 * pi) / num_dots;
			tmp[idx] = get_positions_of_circles(
				theta,
				currentN,
				magnitudes,
				phases,
				idxs
			)[2 * currentN + 1];
		}
		dots = tmp;

		//stop previous animation
		if (animationId != undefined) {
			cancelAnimationFrame(animationId);
		}

		return { magnitudes, phases, idxs, samples };
	}

	// Create positions based on current data and theta
	function get_positions_of_circles(
		theta: number,
		M: number,
		magnitudes: number[],
		phases: number[],
		idxs: number[]
	) {
		let pos = [center];

		for (let i = 0; i < 2 * M + 1; i++) {
			const index = idxs[i];
			pos.push({
				x:
					pos[i].x +
					(1 / (2 * M + 1)) *
						magnitudes[index] *
						Math.cos((index - M) * theta + phases[index]),
				y:
					pos[i].y -
					(1 / (2 * M + 1)) *
						magnitudes[index] *
						Math.sin((index - M) * theta + phases[index])
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
			const point = path
				.getPointAtLength(distance)
				.matrixTransform(t_trans);
			points_x[idx] = point.x - center.x;
			points_y[idx] = center.y - point.y;
			samples[idx] = { x: point.x, y: point.y };
		}

		return [points_x, points_y, samples];
	}

	async function get_coeffs(points_x: number[], points_y: number[]) {
		const response = await fetch(`http://${PUBLIC_API_IP}/data`, {
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
		// Set up animation once data is resolved
		dataPromise!
			.then((data) => {
				function animate() {
					// Update theta and loop between 0 and 2π
					theta = (theta + dtheta) % (2 * pi);

					// Calculate new positions
					const positions = get_positions_of_circles(
						theta,
						currentN,
						data.magnitudes,
						data.phases,
						data.idxs
					);

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
					<circle cx={x} cy={y} r="0.5" fill="red" opacity="0.3" />
				{/each}

				{#if theta !== undefined}
					{@const positions = get_positions_of_circles(
						theta,
						currentN,
						data.magnitudes,
						data.phases,
						data.idxs
					)}

					{#each positions.slice(0, -1) as { x, y }, idx}
						{#if !isNaN(x) && !isNaN(positions[idx + 1].x)}
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
								fill="none"
								stroke="black"
								stroke-width="0.1"
								opacity="0.2"
								r={Math.sqrt( (positions[idx+1].x - x)**2 + (positions[idx+1].y - y)**2)}
							/>

							{#if idx == 2 * currentN}
								<circle
									cx={positions[idx + 1].x}
									cy={positions[idx + 1].y}
									fill="red"
									r="0.4"
								/>
							{/if}
						{/if}
					{/each}

					{#each dots as dot, idx}
						{#if dots[idx + 1] != null}
							<line
								x1={dot.x}
								y1={dot.y}
								x2={dots[(idx + 1) % (num_dots - 1)].x}
								y2={dots[(idx + 1) % (num_dots - 1)].y}
								stroke="red"
								stroke-width="0.3"
								opacity="0.2"
							/>
						{/if}
					{/each}
				{/if}
			{:catch error}
				<!-- Error state -->
				<text x="10" y="50" fill="red"
					>Error loading data: {error.message}</text
				>
			{/await}
		{/if}

		<path
			style="stroke: rgb(0, 0, 0); fill: none; stroke-width: 1px;"
			opacity="0.2"
			{d}
			bind:this={myPath}
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
