import {readFileLinesAsNumbers} from '../lib';

let assert = require('assert');

describe('2018 - Day 1', function() {

  let input;
  before(() => input = readFileLinesAsNumbers('./input/2018-01.txt'));

  describe('Part 1', function() {

    it('Starting with a frequency of zero, what is the resulting frequency after all of the changes in frequency have been applied?', function() {
      const sum = input.reduce((acc, value) => acc + value);
      assert.equal(sum, 493);
    });
  });

  describe('Part 2', function() {

    it('What is the first frequency your device reaches twice?', function() {
      let runningSum = 0;
      let frequencies = new Set([0]);
      let found = false;
      let i = 0;
      while(!found) {
        const element = input[i];
        runningSum += element;
        if (frequencies.has(runningSum)) break;
        frequencies.add(runningSum);
        i++;
        i = i % input.length;
      }

      assert.equal(runningSum, 413);
    });
  });
});
