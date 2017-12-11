export function* range([start, stop]) {
	let d = start > stop ? -1 : 1;
  let done = d > 0
  ? () => stop < start
  : () => stop > start;

  start += d;
	while (!done()) {
    yield start;
    start += d;
  }
}
