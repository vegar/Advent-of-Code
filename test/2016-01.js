import {distance, navigate, trace} from '../lib';

let assert = require('assert');

describe('2016 - Day 1', function() {

  let input = 'L1, R3, R1, L5, L2, L5, R4, L2, R2, R2, L2, R1, L5, R3, L4, L1, L2, R3, R5, L2, R5, L1, R2, L5, R4, R2, R2, L1, L1, R1, L3, L1, R1, L3, R5, R3, R3, L4, R4, L2, L4, R1, R1, L193, R2, L1, R54, R1, L1, R71, L4, R3, R191, R3, R2, L4, R3, R2, L2, L4, L5, R4, R1, L2, L2, L3, L2, L1, R4, R1, R5, R3, L5, R3, R4, L2, R3, L1, L3, L3, L5, L1, L3, L3, L1, R3, L3, L2, R1, L3, L1, R5, R4, R3, R2, R3, L1, L2, R4, L3, R1, L1, L1, R5, R2, R4, R5, L1, L1, R1, L2, L4, R3, L1, L3, R5, R4, R3, R3, L2, R2, L1, R4, R2, L3, L4, L2, R2, R2, L4, R3, R5, L2, R2, R4, R5, L2, L3, L2, R5, L4, L2, R3, L5, R2, L1, R1, R3, R3, L5, L2, L2, R5';

  describe('Part 1 - distance', function() {

    it('Following R2, L3 leaves you 2 blocks East and 3 blocks North, or 5 blocks away.', function() {
      let pos = navigate('R2, L3');
      assert.equal(5, distance(pos));
    });

    it('R2, R2, R2 leaves you 2 blocks due South of your starting position, which is 2 blocks away.', function() {
      let pos = navigate('R2, R2, R2');
      assert.equal(2, distance(pos));
    });

    it('R5, L5, R5, R3 leaves you 12 blocks away.', function() {
      let pos = navigate('R5, L5, R5, R3');
      assert.equal(12, distance(pos));
    });

    it('How many blocks away is Easter Bunny HQ? -> 278', function() {
      let pos = navigate(input);
      assert.equal(278, distance(pos));
    });

  });

  describe('Part 2 - revisit', function() {
    it('if your instructions are R8, R4, R4, R8, the first location you visit twice is 4 blocks away, due East', function(){

      let path = [ {x: 0, y: 0} ];
      let intersection = null;

      let pos = navigate('R8, R4, R4, R8', (from, to) => {
        var tracks = [...trace(from, to)];

        tracks.forEach(pos => {
          if (path.find((oldPos) => pos.x == oldPos.x && pos.y == oldPos.y)) {
            intersection = intersection || pos;
          }
        });
        path.push(...tracks);
      });

      assert.equal(4, distance(intersection || pos));
    });

    it('How many blocks away is the first location you visit twice? -> 161', function(){

      let path = [ {x: 0, y: 0} ];
      let intersection = null;

      let pos = navigate(input, (from, to) => {
        var tracks = [...trace(from, to)];

        tracks.forEach(pos => {
          if (path.find((oldPos) => pos.x == oldPos.x && pos.y == oldPos.y)) {
            intersection = intersection || pos;
          }
        });
        path.push(...tracks);
      });

      assert.equal(161, distance(intersection || pos));
    });
  });

});