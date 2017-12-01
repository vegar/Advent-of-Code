function captcha(input, next = (i, len) => i+1) {
	let output = 0;

	for (let i = 0;  i < input.length; i++) {
		if (input[i] == input[next(i, input.length) % input.length])
			output += parseInt(input[i], 10);
	}

	return output;
}

function distance(to, from = {x: 0, y: 0}) {
	return Math.abs(to.x - from.x) + Math.abs(to.y-from.y);
}

function navigate(input, callback = (from, to) => {}) {
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

function _intersects(a,b,c,d,p,q,r,s) {
  var det, gamma, lambda;
  det = (c - a) * (s - q) - (r - p) * (d - b);
  if (det === 0) {
    return false;
  } else {
    lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
    gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
    return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
  }
};

function range([start, stop]) {
	let result = [];
	if (start != stop) {
		let d = start > stop ? -1 : 1;

		start += d;
		while (d > 0 ? stop >= start : stop <= start) {
	        result.push(start);
	        start += d;
	    }
	}

    return result;
}

function trace(from, to) {
	let rangeSelector = (from, to) => from.y == to.y ? [from.x, to.x] : [from.y, to.y];
	let mapper = (value) => from.y == to.y ? {x: value, y: from.y} : {x: from.x, y: value};

	return range(rangeSelector(from, to))
		.map(mapper);
}


export { captcha, distance, navigate, trace }