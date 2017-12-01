export function navigate(input, callback = (from, to) => {}) {
	const north = (pos, steps) => { return { x: pos.x, y: pos.y + steps } };
	const south = (pos, steps) => { return { x: pos.x, y: pos.y - steps } };
	const east = (pos, steps) => { return { x: pos.x + steps, y: pos.y } };
	const west = (pos, steps) => { return { x: pos.x - steps, y: pos.y } };
	const allDirections = [north, east, south, west];

	let turn = (from, dir) => {
		let f = {
			R: (r) => (r+1) % 4,
			L: (r) => (4+r-1) % 4
		};

		let result = f[dir](allDirections.indexOf(from));
		return allDirections[result];
	}

	return input.split(', ').reduce(function(acc, curr) {
		let move = turn(acc.dir, curr[0]);
		let steps = parseInt(curr.slice(1), 10);
		let newPos = move(acc, steps);
		callback(acc, newPos);

	  	return Object.assign({ dir: move }, newPos);
	}, {x: 0, y: 0, dir: north});
}