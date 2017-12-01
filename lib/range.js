export function range([start, stop]) {
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
