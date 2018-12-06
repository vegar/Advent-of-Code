import {readFileLines} from '../lib';

let assert = require('assert');

describe('2018 - Day 6', function() {

  let input;
  const area = [];

  beforeEach(() => {
    input = readFileLines('./input/2018-06.txt').map(line => line.split(', ').map(n => parseInt(n,10)));

    // input = [
    //   [1, 1],
    //   [1, 6],
    //   [8, 3],
    //   [3, 4],
    //   [5, 5],
    //   [8, 9],
    // ];

    const max = input.reduce((acc, curr) => ({
      x: curr[0] > acc.x ? curr[0] : acc.x,
      y: curr[1] > acc.y ? curr[1] : acc.y
    }), {x: 0, y: 0});


    for(let y = 0; y < max.y+1; y++) {
      area.push(new Array(max.x+1));
    }
  });

  describe('Part 1', function() {
    it('What is the size of the largest area that isn\'t infinite?', () => {
      const edges = new Set();
      const areaSizes = new Map();
      // map areas
      for(let y = 0; y < area.length; y++) {
        for(let x = 0; x < area[y].length; x++) {
          const closest = input.reduce((acc, curr, idx) => {
            let d = Math.abs(curr[0] - x) + Math.abs(curr[1] - y);

            if (d == acc.dist)
              return { dist: d, idx: -1};
            if (d < acc.dist)
              return { dist: d, idx };
            return acc;
          }, { idx: -1, dist: 100000});

          area[y][x] = closest.idx;
          areaSizes.set(closest.idx, (areaSizes.get(closest.idx) | 0) + 1);
          if (x == 0 || x == area[y].length-1 || y == 0 || y == area.length-1)
            edges.add(closest.idx);
        }
      }

      // remove edges
      for (let edge of edges) areaSizes.delete(edge);

      const largest = [...areaSizes.entries()]
        .reduce((acc, curr) =>
          curr[1] > acc[1] ? curr : acc
        );

      assert.equal(largest[1], 3358);

    });
  });

  describe('Part 2', function() {
    it('What is the size of the region containing all locations which have a total distance to all given coordinates of less than 10000?', () => {

      let size = 0;
      // map areas
      for(let y = 0; y < area.length; y++) {
        for(let x = 0; x < area[y].length; x++) {
          const sumDistance = input.reduce((acc, curr) => {
            let d = Math.abs(curr[0] - x) + Math.abs(curr[1] - y);

            return acc += d;
          }, 0);

          if (sumDistance < 10000) size++;
        }
      }

      assert.equal(size, 45909);
    });
  });
});
