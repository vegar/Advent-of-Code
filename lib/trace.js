import { range } from './';

export function trace(from, to) {
	let rangeSelector = (from, to) => from.y == to.y ? [from.x, to.x] : [from.y, to.y];
	let mapper = (value) => from.y == to.y ? {x: value, y: from.y} : {x: from.x, y: value};

	return range(rangeSelector(from, to))
		.map(mapper);
}
