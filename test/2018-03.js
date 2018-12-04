import {readFileLines} from '../lib';

let assert = require('assert');

describe('2018 - Day 3', function() {

  let input;
  before(() => input = readFileLines('./input/2018-03.txt'));
  const parser = /#(\d*) @ (\d*),(\d*): (\d*)x(\d*)/;

  describe('Part 1', function() {


    it('How many square inches of fabric are within two or more claims?', function() {
      let fabric = {};

      input.forEach(l => {
        let id, x, y, w, h;
        [, id,x,y,w,h] = l.match(parser).map(x => Number(x));

        for (let i = x; i < x+w; i++)
          for (let j = y; j < y+h; j++)
          {
            var curr = fabric[`${i}*${j}`] || 0;
            fabric[`${i}*${j}`] = curr + 1;
          }
      });

      let count = Object.values(fabric).filter(v => v > 1).length;

      assert.equal(count, 103482);
    });
  });

  describe('Part 2', function() {
    it('What is the ID of the only claim that doesn\'t overlap?', function() {
      let fabric = {};
      let claims = {};

      input.forEach(l => {
        let id, x, y, w, h;
        [, id,x,y,w,h] = l.match(parser).map(x => Number(x));

        claims[id] = true;
        for (let i = x; i < x+w; i++)
          for (let j = y; j < y+h; j++)
          {
            if ( fabric[`${i}*${j}`]) {
              claims[fabric[`${i}*${j}`]] = false;
              claims[id] = false;
            }
            fabric[`${i}*${j}`] = id;
          }
      });

      let single = Object.entries(claims).find(v => v[1] == true);

      assert.equal(single[0], 0);
    });
  });
});
