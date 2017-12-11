export function distance(to, from = {x: 0, y: 0}) {
  to = (to.constructor === Array)
    ? {x: to[0], y: to[1] }
    : to;

  from = (from.constructor === Array)
    ? {x: from[0], y: from[1] }
    : from;


	return Math.abs(to.x - from.x) + Math.abs(to.y-from.y);
}

export function distanceHexToOrigo([x,y]) {
  let dx = Math.abs(x);
  let dy = Math.abs(y);
  let dd = Math.abs(x - y);

  return Math.max(dx, dy, dd);
}
