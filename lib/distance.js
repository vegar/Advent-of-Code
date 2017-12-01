export function distance(to, from = {x: 0, y: 0}) {
	return Math.abs(to.x - from.x) + Math.abs(to.y-from.y);
}
