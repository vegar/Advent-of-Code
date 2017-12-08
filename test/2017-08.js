import {lines, readFileLines, parser, evaluateExp, execute} from '../lib';

let assert = require('chai').assert;

describe('2017 - Day 8', function() {

  const example =
`b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`

  describe('Part 1', function() {

    it('Because a starts at 0, it is not greater than 1, and so b is not modified.', function() {
      let op = parser(lines(example)[0]);
      let t = execute(op, { b: 0});

      assert.deepEqual(t, {b: 0});
    })


    it('a is increased by 1 (to 1) because b is less than 5 (it is 0).', function() {
      let op = parser(lines(example)[1]);
      let t = execute(op, { });

      assert.deepEqual(t, {a: 1,
        '__max': 1});
    })

    it('c is decreased by -10 (to 10) because a is now greater than or equal to 1 (it is 1).', function() {
      let op = parser(lines(example)[2]);
      let t = execute(op, {a: 1});

      assert.deepEqual(t, {a: 1, c: 10,
        '__max': 10});
    });

    it('c is increased by -20 (to -10) because c is equal to 10', function() {
      let op = parser(lines(example)[3]);
      let t = execute(op, {a: 1, c: 10});

      assert.deepEqual(t, {a: 1, c: -10,
        '__max': 0});
    });

    it('What is the largest value in any register after completing the instructions in your puzzle input? --> 5075', function() {
      let registry = readFileLines('./input/2017-08.txt')
        .map(l => parser(l))
        .reduce((registry, curr) => {
          return execute(curr, registry);
        }, {});

      delete registry['__max'];
      let max = Object.values(registry)
        .reduce((max, curr) => Math.max(max, curr));

      assert.equal(max, 5075)

    })
  });

  describe('Part 2', function() {
    it(' For example, in the above instructions, the highest value ever held was 10', function() {
      let registry = lines(example)
        .map(l => parser(l))
        .reduce((registry, curr) => {
          return execute(curr, registry);
        }, {});

      assert.equal(registry['__max'], 10);
    });

    it('needs to know the highest value held in any register during this process. --> ', function() {
      let registry = readFileLines('./input/2017-08.txt')
        .map(l => parser(l))
        .reduce((registry, curr) => {
          return execute(curr, registry);
        }, {});

      assert.equal(registry['__max'], 7310);
    });
  });

});