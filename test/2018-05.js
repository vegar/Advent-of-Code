import {readFile} from '../lib';

let assert = require('assert');

describe('2018 - Day 5', function() {

  let input;
  beforeEach(() => input = readFile('./input/2018-05.txt'));

  const reduce = (input) => {
    const check = (idx, input) => (Math.abs(input.charCodeAt(idx) - input.charCodeAt(idx-1)) == 32);

    let idx = 1;
    while (idx < input.length) {
      if (check(idx, input)) {
        input = input.substring(0,idx-1) + input.substring(idx+1);
        idx = Math.max(--idx, 1);
      } else {
        idx++;
      }
    }
    return input;
  }

  describe('Part 1', function() {
    it('How many units remain after fully reacting the polymer you scanned?', () => {

      input = reduce(input);

      assert.equal(input.length, 10708);

    });
  });

  describe('Part 2', function() {
    it('What is the length of the shortest polymer you can produce by removing all units of exactly one type and fully reacting the result?', () => {
      const lengths = [];

      for(let a = 'a'.charCodeAt(0); a < 'z'.charCodeAt(0); a++) {
        let input1 = input;
        let idx = 1;
        while (idx < input1.length) {
          let searchFor = undefined;
          if (input1.charCodeAt(idx) == a)
            searchFor = input1[idx].toUpperCase();
          else if (input1[idx].toLowerCase().charCodeAt(0) == a)
            searchFor = input1[idx].toLowerCase();

          if (searchFor) {
            let foundAt = undefined;
            for (let x = idx+1; x < input1.length; x++)
            {
              if (input1[x] == searchFor) {
                foundAt = x;
                break;
              }
            }
            if (foundAt) {
              input1 = input1.substring(0,idx) + input1.substring(idx+1, foundAt) + input1.substring(foundAt+1);
            }
            else {
              idx++;
            }
          }
          else {
            idx++;
          }
        }

        input1 = reduce(input1);
        lengths.push(input1.length);
      }

      assert.equal(lengths.sort((a,b) => a-b)[0], 5330);
    });
  });
});
