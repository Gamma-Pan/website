export function draw_links(ctx, width, height, thickness) {
	ctx!.fillStyle = 'white';
	ctx!.fillRect(0, 0, width * 100, height * 100);
	ctx!.save();

	ctx!.translate(width * 55, height * 43);
	ctx!.rotate(-Math.PI / 4);

	ctx!.strokeStyle = 'red';
	ctx!.lineWidth = thickness * 100;

	ctx!.strokeRect(
		-thickness * 7 * 100,
		-thickness * 3 * 100,
		thickness * 6 * 100,
		thickness * 4 * 100
	);

	ctx!.strokeRect(
		-thickness * 4 * 100,
		-thickness * 1 * 100,
		thickness * 6 * 100,
		thickness * 4 * 100
	);
}

export function ctx2heights(ctx, N, M, box_side): Array<Array<number>> {
	const sq2 = Math.sqrt(2);

	const heights = Array.from({ length: N }, () =>
		Array.from({ length: M }, () => -box_side / 4)
	);

	for (let idx = 0; idx < N; idx++) {
		for (let jdx = 0; jdx < M; jdx++) {
			const rem = idx % 2;

			const x = ((idx - rem) / 2 + rem / 2) * box_side * sq2;
			const z = (jdx + rem / 2) * box_side * sq2;

			const img_data = ctx!.getImageData(100 * x, 100 * z, 1, 1).data;
			const [r, g, b, a] = img_data;

			if (r == 255 && g == 0) {
				heights[idx][jdx] = box_side / 4;
			}
		}
	}
	return heights;
}
