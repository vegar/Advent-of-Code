import { sum, readFile, parseStream } from '../lib';
import assert from 'assert';

describe('2017 - Day 9', function() {

  let input;
  before(() => input = readFile('./input/2017-09.txt'))

  describe('Part 1', function() {

    it('{}, 1 group.', function() {
      let groups = parseStream('{}');

      assert.equal(groups.length, 1);
    });

    it('{{{}}}, 3 groups.', function() {
      let groups = parseStream('{{{}}}');

      assert.equal(groups.length, 3);

    });

    it('{{},{}}, also 3 groups.', function() {
      let groups = parseStream('{{},{}}');

      assert.equal(groups.length, 3);
    });

    it('{{{},{},{{}}}}, 6 groups.', function() {
      let groups = parseStream('{{{},{},{{}}}}');

      assert.equal(groups.length, 6);
    });

    it('{<{},{},{{}}>}, 1 group (which itself contains garbage).', function() {
      let groups = parseStream('{<{},{},{{}}>}');

      assert.equal(groups.length, 1);
    });

    it('{<a>,<a>,<a>,<a>}, 1 group.', function() {
      let groups = parseStream('{<a>,<a>,<a>,<a>}');

      assert.equal(groups.length, 1);
    });

    it('{{<a>},{<a>},{<a>},{<a>}}, 5 groups.', function() {
      let groups = parseStream('{{<a>},{<a>},{<a>},{<a>}}');

      assert.equal(groups.length, 5);
    });

    it('{{<!>},{<!>},{<!>},{<a>}}, 2 groups (since all but the last > are canceled).', function() {
      let groups = parseStream('{{<!>},{<!>},{<!>},{<a>}}');

      assert.equal(groups.length, 2);
    });

    it('{}, score of 1.', function() {
      let groups = parseStream('{}');
      let score = groups.reduce(sum);

      assert.equal(score, 1);
    });

    it('{{{}}}, score of 1 + 2 + 3 = 6.', function() {
      let groups = parseStream('{{{}}}');
      let score = groups.reduce(sum);

      assert.equal(score, 6);
    });

    it('{{},{}}, score of 1 + 2 + 2 = 5.', function() {
      let groups = parseStream('{{},{}}');
      let score = groups.reduce(sum);

      assert.equal(score, 5);
    });

    it('{{{},{},{{}}}}, score of 1 + 2 + 3 + 3 + 3 + 4 = 16.', function() {
      let groups = parseStream('{{{},{},{{}}}}');
      let score = groups.reduce(sum);

      assert.equal(score, 16);
    });

    it('{<a>,<a>,<a>,<a>}, score of 1.', function() {
      let groups = parseStream('{<a>,<a>,<a>,<a>}');
      let score = groups.reduce(sum);

      assert.equal(score, 1);
    });

    it('{{<ab>},{<ab>},{<ab>},{<ab>}}, score of 1 + 2 + 2 + 2 + 2 = 9.', function() {
      let groups = parseStream('{{<ab>},{<ab>},{<ab>},{<ab>}}');
      let score = groups.reduce(sum);

      assert.equal(score, 9);
    });

    it('{{<!!>},{<!!>},{<!!>},{<!!>}}, score of 1 + 2 + 2 + 2 + 2 = 9.', function() {
      let groups = parseStream('{{<!!>},{<!!>},{<!!>},{<!!>}}');
      let score = groups.reduce(sum);

      assert.equal(score, 9);
    });

    it('{{<a!>},{<a!>},{<a!>},{<ab>}}, score of 1 + 2 = 3.', function() {
      let groups = parseStream('{{<a!>},{<a!>},{<a!>},{<ab>}}');
      let score = groups.reduce(sum);

      assert.equal(score, 3);
    });

    it('What is the total score for all groups in your input? --> 16689', function() {
      let groups = parseStream(input);
      let score = groups.reduce(sum);

      assert.equal(score, 16689);
    });
  });

  describe('Part 2', function() {

    it('<>, 0 characters.', function() {
      let groups = parseStream('<>');

      assert.equal(groups.garbageCount, 0);
    });

    it('<random characters>, 17 characters.', function() {
      let groups = parseStream('<random characters>');

      assert.equal(groups.garbageCount, 17);
    });

    it('<<<<>, 3 characters.', function() {
      let groups = parseStream('<<<<>');

      assert.equal(groups.garbageCount, 3);
    });

    it('<{!>}>, 2 characters.', function() {
      let groups = parseStream('<{!>}>');

      assert.equal(groups.garbageCount, 2);
    });

    it('<!!>, 0 characters.', function() {
      let groups = parseStream('<!!>');

      assert.equal(groups.garbageCount, 0);
    });

    it('<!!!>>, 0 characters.', function() {
      let groups = parseStream('<!!!>>');

      assert.equal(groups.garbageCount, 0);
    });

    it('<{o"i!a,<{i<a>, 10 characters.', function() {
      let groups = parseStream('<{o"i!a,<{i<a>');

      assert.equal(groups.garbageCount, 10);
    });

    it('How many non-canceled characters are within the garbage in your puzzle input? --> 7982', function(){
      let groups = parseStream(input);

      assert.equal(groups.garbageCount, 7982);
    });
  });
});
