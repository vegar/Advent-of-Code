import { readFile, distanceHexToOrigo } from '../lib';
import { assert } from 'chai';

describe('2017 - Day 11', function() {

  let path;
  before(() => path = readFile('./input/2017-11.txt').trim());


  const hexMove = {
    n:  ([x,y]) => [  x,++y,],
    ne: ([x,y]) => [++x,++y,],
    se: ([x,y]) => [++x,  y,],
    s:  ([x,y]) => [  x,--y,],
    sw: ([x,y]) => [--x,--y,],
    nw: ([x,y]) => [--x,  y,],
  };

  describe('Part 1', function() {
    const distance = (path) => {
      let start = [0,0];
      let steps = path.split(',');

      let end = steps.reduce((position, step) => {
        return hexMove[step](position);
      }, start);

      return distanceHexToOrigo(end);
    };

    it('ne,ne,ne is 3 steps away.', function() {
      let result = distance('ne,ne,ne');

      assert.equal(result, 3);
    });

    it('ne,ne,sw,sw is 0 steps away (back where you started).', function() {
      let result = distance('ne,ne,sw,sw');

      assert.equal(result, 0);
    });

    it('ne,ne,s,s is 2 steps away (se,se).', function() {
      let result = distance('ne,ne,s,s');

      assert.equal(result, 2);
    });

    it('se,sw,se,sw,sw is 3 steps away (s,s,sw).', function() {
      let result = distance('se,sw,se,sw,sw');

      assert.equal(result, 3);
    });

    it('Starting where he started, you need to determine the fewest number of steps required to reach him. --> 773', function() {
      let result = distance(path);

      assert.equal(result, 773);
    });
  });

  describe('Part 2', function() {
    const distance = (path) => {
      let start = [0,0];
      let steps = path.split(',');

      let max = 0;

      steps.reduce((position, step) => {
        let newPosition = hexMove[step](position);
        let newDistance = distanceHexToOrigo(newPosition);

        max = Math.max(newDistance, max);

        return newPosition;
      }, start);

      return max;
    };

    it('How many steps away is the furthest he ever got from his starting position?  --> 1560', function() {
      let result = distance(path);

      assert.equal(result, 1560);
    });
  });
});