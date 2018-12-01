import {distance, indexToCoord, sumAdjecent, coordToIndex} from '../lib';

let assert = require('chai').assert;

describe('2017 - Day 3', function() {

  let input = 361527;

  describe('Part 1', function() {
    it('Data from square 1 is carried 0 steps, since it\'s at the access port.', function() {
      let coord = indexToCoord(1);

      assert.equal(0, distance(coord));
    });

    it('Data from square 12 is carried 3 steps, such as: down, left, left.', function() {
      let coord = indexToCoord(12);

      assert.equal(3, distance(coord));
    });

    it('Data from square 23 is carried only 2 steps: up twice.', function() {
      let coord = indexToCoord(23);

      assert.equal(2, distance(coord));
    });

    it('Data from square 1024 must be carried 31 steps.', function() {
      let coord = indexToCoord(1024);

      let distance = Math.abs(coord[0]) + Math.abs(coord[1]);

      assert.equal(31, distance);
    });

    it('How many steps are required to carry the data from the square identified in your puzzle input all the way to the access port? --> 326', function(){
      let coord = indexToCoord(input);

      assert.equal(326, distance(coord));
    });

    it('geocache', function() {
      let idx = coordToIndex({y: 416, x: 614});

      console.log(idx);

      console.log('32:', indexToCoord(32));
      console.log('20:', indexToCoord(20));

    })
  });

  describe('Part 2', function() {

    it('Square 1 starts with the value 1.', function() {
      assert.equal(1, sumAdjecent(1, []));
    });

    it('Square 2 has only one adjacent filled square (with value 1), so it also stores 1.', function() {
      assert.equal(1, sumAdjecent(2, [1]));
    });

    it('Square 3 has both of the above squares as neighbors and stores the sum of their values, 2.', function() {
      assert.equal(2, sumAdjecent(3, [1, 1]));
    });

    it('Square 4 has all three of the aforementioned squares as neighbors and stores the sum of their values, 4.', function() {
      assert.equal(4, sumAdjecent(4, [1, 1, 2]));
    });

    it('Square 5 only has the first and fourth squares as neighbors, so it gets the value 5.', function() {
      assert.equal(5, sumAdjecent(5, [1, 1, 2, 4]));
    });

    it('What is the first value written that is larger than your puzzle input? --> 363010 ', function() {
      let sums = [];
      let idx = 1;
      let sum;
      while(true) {
        sum = sumAdjecent(idx, sums);
        sums.push(sum);
        idx++;

        if (sum > input)
          break;
      }

      assert.equal(363010, sum);
    });
  });
});
