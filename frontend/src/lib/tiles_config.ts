export const num_boxes = 30;
export const surface_width = 25;

export function get_tiles_info(ratio: number): [number, number, number] {
	const surface_height: number = surface_width / ratio;

	const sq2 = Math.sqrt(2);
	const box_side =
		ratio > 1
			? surface_width / (num_boxes / sq2)
			: surface_height / (num_boxes / (sq2 * 2));

	const [N, M] =
		ratio > 1
			? [num_boxes + 1, Math.ceil(surface_height / (sq2 * box_side)) + 1]
			: [
					Math.ceil((2 * surface_width) / (sq2 * box_side)) + 1,
					Math.ceil(num_boxes / 4) + 1
				];

	return [box_side, N, M];
}


