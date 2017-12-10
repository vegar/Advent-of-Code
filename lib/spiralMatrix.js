export function indexToCoord(index) {
  const radius = Math.ceil((Math.sqrt(index) - 1) / 2);

  //t => length of segment
  let t = 2 * radius + 1;
  let m = Math.pow(t, 2);

  t -= 1;

  //spiraling right
  if (index >= m - t) {
    return [radius - (m - index), -radius];
  }

  m -= t;

  //spiraling down
  if (index >= m - t) {
    return [-radius, -radius + (m - index)];
  }

  m -= t;

  //spiraling left
  if (index >= m - t) {;
    return [-radius + (m - index), radius];
  }

  //spiraling up
  return [radius, radius - (m - index - t)];
}

export function coordToIndex({x, y}) {
  let p = 0;
  if ((y * y) >= (x * x)) {
     p = 4 * y * y - y - x;
    if (y < x)
      p = p - 2 * (y - x)
  } else {
    p = 4 * x * x - y - x;
    if (y < x)
      p = p + 2 * (y - x);
  }

  //+1 for 1 based idexes (center coord == 1)
  return p+1;
}

export function adjecent(pt) {
    let x, y;
    if (pt.constructor === Array)
      [x,y] = pt
    else
      ({x,y} = pt);

  return [
    {x: x,   y: y + 1},
    {x: x,   y: y - 1},
    {x: x-1, y: y + 1},
    {x: x-1, y: y    },
    {x: x-1, y: y - 1},
    {x: x+1, y: y + 1},
    {x: x+1, y: y    },
    {x: x+1, y: y - 1},
  ]
}

export function sumAdjecent(index, adjecentSums) {
  if (index == 1)
    return 1;

  let coord = indexToCoord(index);

  let sum = adjecent(coord)
    .map(coordToIndex)
    .reduce((acc, idx) => {
      if (idx < index) {
        return acc + adjecentSums[idx-1];
      }
      return acc;
    }, 0);

  return sum;
}
