<script lang="ts">
	let { w, h }: { w: number; h: number } = $props();
	let cursorAngle: number = $state(0);

	let path: SVGPathElement;

	let circ1: { x: number; y: number } = $state({ x: 75, y: 50 });
	let circ2: { x: number; y: number } = $state({ x: 75, y: 50 });
	let circ3: { x: number; y: number } = $state({ x: 75, y: 50 });

	function handleMousemove(event: MouseEvent) {
		const x = (event.offsetX / w) * 100 - 50;
		const y = (event.offsetY / h) * 100 - 50;

		const dot = x * 50; // + y*0
		const cross = y * 50; // - x*0
		cursorAngle = Math.atan2(cross, dot);

		// this probably offer no speedup over conditional
		const percent1 =
			[0, 1, 1][1 + Math.floor(Math.sign(cursorAngle + Math.PI / 2))] -
			(cursorAngle + Math.PI / 2) / (2 * Math.PI);
		const percent2 =
			[0, 1, 1][1 + Math.floor(Math.sign(cursorAngle + Math.PI))] -
			(cursorAngle + Math.PI) / (2 * Math.PI);
		const percent3 =
			[0, 1, 1][1 + Math.floor(Math.sign(cursorAngle - Math.PI / 2))] -
			(cursorAngle - Math.PI / 2) / (2 * Math.PI);

		const p_len1 = path.getTotalLength() * percent1;
		const p_len2 = path.getTotalLength() * percent2;
		const p_len3 = path.getTotalLength() * percent3;

		circ1 = path.getPointAtLength(p_len1);
		circ2 = path.getPointAtLength(p_len2);
		circ3 = path.getPointAtLength(p_len3);
	}
</script>

<div class="border" onmousemove={handleMousemove} role="math">
	<svg width="100%" height="100%" viewBox="0 0 100 100">
		<circle cx={circ1.x} cy={circ1.y} r="1" />
		<circle cx={circ2.x} cy={circ2.y} r="1" />
		<circle cx={circ3.x} cy={circ3.y} r="1" />

		{#each [0, 1, 2, 3] as begin}
			<circle r="1" fill="black" fill-opacity=".2">
				<animateMotion begin="{begin}s" dur="5s" repeatCount="indefinite">
					<mpath href="#traj" />
				</animateMotion>
			</circle>
		{/each}

		<path
			d="M {circ2.x} {circ2.y} A 25 25 0 0 0 {circ1.x} {circ1.y}"
			stroke="black"
			fill="none"
			stroke-width=".3"
			stroke-opacity="1"
		/>

		<path
			d="M {circ2.x} {circ2.y} A 25 25 0 0 1 {circ3.x} {circ3.y}"
			stroke="black"
			fill="none"
			stroke-width=".3"
			stroke-opacity="1"
		/>

		<path
			bind:this={path}
			id="traj"
			d="M 75 50 A 25 25 0 0 0 25 50 A 25 25 0 0 0 75 50"
			stroke="black"
			fill="none"
			stroke-width=".3"
			stroke-opacity=".1"
		/>
	</svg>
</div>

<style>
	.border {
		border: 2px solid #6a3434a3;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
