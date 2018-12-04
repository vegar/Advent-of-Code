import {readFileLines} from '../lib';

let assert = require('assert');

describe('2018 - Day 2', function() {

  let input;
  before(() => input = readFileLines('./input/2018-02.txt'));

  describe('Part 1', function() {

    it('What is the checksum for your list of box IDs?', function() {
      const result = { two: 0, three: 0};
      input.forEach((line) => {
        const charCount = {};
        for (let c of line) {
          charCount[c] ? charCount[c] += 1 : charCount[c] = 1;
        }

        Object.values(charCount).includes(2) && (result.two += 1);
        Object.values(charCount).includes(3) && (result.three += 1);
      });

      assert.equal(result.two * result.three, 8892);
    });
  });

  describe('Part 2', function() {

    it('What letters are common between the two correct box IDs?', function() {
      const boxes = [];

      console.log(input.length);

      for (let idx = 0; idx < input.length-1; idx++) {
        for (let inner = idx+1; inner < input.length; inner++) {
          let diff = 0;
          for (let c = 0; c < 26; c++) {
            if (input[idx].charAt(c) !== input[inner].charAt(c)) {
              diff++;
            }
            if (diff > 1) break;
          }
          if (diff == 1) {
            boxes.push(input[idx]);
            boxes.push(input[inner]);
          }
        }
      }

      const result = boxes[0]
        .split('')
        .filter((c, idx) => boxes[1].charAt(idx) === c)
        .join('');

      assert.equal(result, 'zihwtxagifpbsnwleydukjmqv');
    });
  });
});
