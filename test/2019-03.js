import { readFileLines } from '../lib';
import { assert } from 'chai';

describe('2019 - Day 03', function() {

  const input = readFileLines('./input/2019-03.txt');

  const manhattanDistance = (point) =>  Math.abs(point.x) + Math.abs(point.y);

  const stepCalc = (intersection) => {
    const wire1steps = intersection.line1.horizontal ? intersection.line1.steps - Math.abs(intersection.line1.x2 - intersection.x) : intersection.line1.steps - Math.abs(intersection.line1.y2 - intersection.y);
    const wire2steps = intersection.line2.horizontal ? intersection.line2.steps - Math.abs(intersection.line2.x2 - intersection.x) : intersection.line2.steps - Math.abs(intersection.line2.y2 - intersection.y);
    return wire1steps + wire2steps;
  };

  const lineSegments = (path) => {
    let pos = {
      x: 0,
      y: 0,
      steps: 0
    };

    const segments = [];
    path.split(',').map(p => {
      const line = {
        x1: pos.x,
        y1: pos.y,
        x2: pos.x,
        y2: pos.y,
        steps: pos.steps + Math.abs(1*p.slice(1))
      };

      switch (p.charAt(0)) {
        case 'R': line.x2 += (1*p.slice(1)); break;
        case 'L': line.x2 -= (1*p.slice(1)); break;
        case 'U': line.y2 += (1*p.slice(1)); break;
        case 'D': line.y2 -= (1*p.slice(1)); break;
      }

      line.vertical = line.x1 == line.x2;
      line.horizontal = line.y1 == line.y2;

      pos.x = line.x2;
      pos.y = line.y2;
      pos.steps = line.steps;

      segments.push(line);
    });

    return segments;
  };

  const intersects = (line1, line2) => {
    if (line1.horizontal == line2.horizontal) return;

    if (line1.vertical) {
      const y1 = Math.min(line1.y1, line1.y2);
      const y2 = Math.max(line1.y1, line1.y2);

      const x1 = Math.min(line2.x1, line2.x2);
      const x2 = Math.max(line2.x1, line2.x2);

      if (y1 < line2.y1 && y2 > line2.y1 && x1 < line1.x1 && x2 > line1.x1) {
        // console.log(`compare y${y1} < y${line2.y1} < y${y2} && x${x1} < x${line1.x1} < x${x2}`);
        // console.log(`match!  line1: ${JSON.stringify(line1)} intersects with line2:${JSON.stringify(line2)} at ${line1.x1}:${line2.y1}`);
        return {line1: line1, line2: line2, x: line1.x1, y: line2.y1};
      }
    }

    if (line1.horizontal) {
      const x1 = Math.min(line1.x1, line1.x2);
      const x2 = Math.max(line1.x1, line1.x2);

      const y1 = Math.min(line2.y1, line2.y2);
      const y2 = Math.max(line2.y1, line2.y2);


      if (x1 < line2.x1 && x2 > line2.x1 && y1 < line2.y1 && y2 > line2.y1) {
        // console.log(`compare x${x1} < x${line2.x1} < x${x2} && y${y1} < y${line2.y1} < y${y2}`);
        // console.log(`match!  line1: ${JSON.stringify(line1)} intersects with line2:${JSON.stringify(line2)} at ${line1.y1}:${line2.x1}`);
        return {line1: line1, line2: line2, x: line1.y1, y: line2.x1 };
      }
    }
  };

  const intersections = (wire1, wire2) => {
    const t = [];
    wire1.forEach(wire1line => {
      wire2.forEach(wire2line => {
        const intersection = intersects(wire1line, wire2line);
        if (intersection) t.push(intersection);
      });
    });
    return t;
  };

  describe('Part 1', function() {

    it (`R8,U5,L5,D3
         U7,R6,D4,L4 => distance 6`, () => {

      const wire1 = lineSegments('R8,U5,L5,D3');
      const wire2 = lineSegments('U7,R6,D4,L4');

      const result = intersections(wire1, wire2)
        .map(manhattanDistance)
        .reduce((min, curr) => min > curr ? curr : min);

      assert.equal(result, 6);
    });

    it(`R75,D30,R83,U83,L12,D49,R71,U7,L72
        U62,R66,U55,R34,D71,R55,D58,R83 = distance 159`, () => {

      const wire1 = lineSegments('R75,D30,R83,U83,L12,D49,R71,U7,L72');
      const wire2 = lineSegments('U62,R66,U55,R34,D71,R55,D58,R83');

      const r = intersections(wire1, wire2);

      const result = r
        .map(manhattanDistance)
        .reduce((min, curr) => min > curr ? curr : min);

      assert.equal(result, 159);

    });

    it(`R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
        U98,R91,D20,R16,D67,R40,U7,R15,U6,R7 = distance 135`, () => {

      const wire1 = lineSegments('R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51');
      const wire2 = lineSegments('U98,R91,D20,R16,D67,R40,U7,R15,U6,R7');


      const r = intersections(wire1, wire2);

      const result = r
        .map(manhattanDistance)
        .reduce((min, curr) => min > curr ? curr : min);

      assert.equal(result, 135);
    });

    it('What is the Manhattan distance from the central port to the closest intersection?', () => {
      const wire1 = lineSegments(input[0]);
      const wire2 = lineSegments(input[1]);

      const r = intersections(wire1, wire2);

      const result = r
        .map(manhattanDistance)
        .reduce((min, curr) => min > curr ? curr : min);

      assert.equal(result, 2129);
    });
  });

  describe('Part 2', function() {
    it (`R8,U5,L5,D3
         U7,R6,D4,L4 => steps 40`, () => {

      const wire1 = lineSegments('R8,U5,L5,D3');
      const wire2 = lineSegments('U7,R6,D4,L4');

      const result = intersections(wire1, wire2)
        .map(stepCalc)
        .reduce((min, curr) => min > curr ? curr : min);

      assert.equal(result, 40);
    });

    it(`R75,D30,R83,U83,L12,D49,R71,U7,L72
        U62,R66,U55,R34,D71,R55,D58,R83 = steps 610`, () => {

      const wire1 = lineSegments('R75,D30,R83,U83,L12,D49,R71,U7,L72');
      const wire2 = lineSegments('U62,R66,U55,R34,D71,R55,D58,R83');

      const r = intersections(wire1, wire2);

      const result = r
        .map(stepCalc)
        .reduce((min, curr) => min > curr ? curr : min);

      assert.equal(result, 610);

    });

    it(`R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
        U98,R91,D20,R16,D67,R40,U7,R15,U6,R7 = steps 410`, () => {

      const wire1 = lineSegments('R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51');
      const wire2 = lineSegments('U98,R91,D20,R16,D67,R40,U7,R15,U6,R7');


      const r = intersections(wire1, wire2);

      const result = r
        .map(stepCalc)
        .reduce((min, curr) => min > curr ? curr : min);

      assert.equal(result, 410);
    });


    it('What is the fewest combined steps the wires must take to reach an intersection?', () => {
      const wire1 = lineSegments(input[0]);
      const wire2 = lineSegments(input[1]);

      const r = intersections(wire1, wire2);

      const result = r
        .map(stepCalc)
        .reduce((min, curr) => min > curr ? curr : min);

      assert.equal(result, 134662);
    });
  });
});
