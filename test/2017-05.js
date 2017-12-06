import { mazeIterator, makeIncOrDecFunc, incFunc, readFileLinesAsNumbers } from '../lib';
import fs from 'fs';

let assert = require('chai').assert;

describe('2017 - Day 5', function() {

  let example = [0, 3, 0, 1, -3];
  let input;

  before('load input', function() {
    input = readFileLinesAsNumbers('./input/2017-05.txt')
  });

  describe('Part 1', function() {

    it('(0) 3  0  1  -3  - before we have taken any steps.', function() {
      let itr = mazeIterator(example, incFunc);
      let current = itr.next();

      assert.equal(0, current.value);
      assert.equal(0, current.jump);
      assert.isNotOk(current.done);
    });

    it('(1) 3  0  1  -3  - jump with offset 0 (that is, dont jump at all). Fortunately, the instruction is then incremented to 1.', function() {
      let itr = mazeIterator(example, incFunc);
      itr.next();
      let current = itr.next();

      assert.equal(0, current.value);
      assert.equal(1, current.jump);
      assert.isNotOk(current.done);
    });

    it('2 (3) 0  1  -3  - step forward because of the instruction we just modified. The first instruction is incremented again, now to 2.', function() {
      let itr = mazeIterator(example, incFunc);
      itr.next(); itr.next();
      let current = itr.next();

      assert.equal(1, current.value);
      assert.equal(3, current.jump);
      assert.isNotOk(current.done);
    });

    it('2  4  0  1 (-3) - jump all the way to the end; leave a 4 behind.', function() {
      let itr = mazeIterator(example, incFunc);
      itr.next(); itr.next(); itr.next();
      let current = itr.next();

      assert.equal(4, current.value);
      assert.equal(-3, current.jump);
      assert.isNotOk(current.done);
    });

    it('2 (4) 0  1  -2  - go back to where we just were; increment -3 to -2.', function() {
      let itr = mazeIterator(example, incFunc);
      itr.next(); itr.next(); itr.next(); itr.next();
      let current = itr.next();

      assert.equal(1, current.value);
      assert.equal(4, current.jump);
      assert.isNotOk(current.done);
    });

    it('2  5  0  1  -2  - jump 4 steps forward, escaping the maze.', function() {
      let itr = mazeIterator(example, incFunc);
      itr.next(); itr.next(); itr.next(); itr.next(); itr.next();
      let current = itr.next();

      assert.isOk(current.done);
    });

    it('In this example, the exit is reached in 5 steps.', function() {
      let itr = mazeIterator(example, incFunc);
      let count = 0;
      while(!itr.next().done) count++;

      assert.equal(5, count);
    });

    it('How many steps does it take to reach the exit?  -> 354121', function() {
      let itr = mazeIterator(input, incFunc);

      let count = 0;
      while(!itr.next().done) count++;

      assert.equal(354121, count);
    });

  });

  describe('Part 2', function(){
    it('In this example, the exit is reached in 10 steps.', function() {
      let itr = mazeIterator(example, makeIncOrDecFunc({treshhold: 3}));
      let count = 0;
      while(!itr.next().done) count++;

      assert.equal(10, count);
    });

    it('How many steps does it take to reach the exit?  -> 27283023', function() {
      this.timeout(60000);

      let itr = mazeIterator(input, makeIncOrDecFunc({treshhold: 3}));

      let count = 0;
      while(!itr.next().done) count++;

      assert.equal(27283023, count);
    });
  });
});
