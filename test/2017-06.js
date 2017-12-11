import {max, redistributeMax} from '../lib';

let assert = require('chai').assert;

describe('2017 - Day 6', function() {

  describe('Part 1', function() {


    it('The banks start with 0, 2, 7, and 0 blocks. The third bank has the most blocks, so it is chosen for redistribution.', function() {
      let idx = max([0, 2, 7, 0]);

      assert.equal(2, idx);
    });

    it('Starting with the next bank (the fourth bank) and then continuing to the first bank, the second bank, and so on, the 7 blocks are spread out over the memory banks. The fourth, first, and second banks get two blocks each, and the third bank gets one back. The final result looks like this: 2 4 1 2.', function() {
      let newBanks = redistributeMax([0, 2, 7, 0]);

      assert.sameOrderedMembers([2,4,1,2], newBanks);
    });

    it('Next, the second bank is chosen because it contains the most blocks (four). Because there are four memory banks, each gets one block. The result is: 3 1 2 3.', function() {
      let newBanks = redistributeMax([2,4,1,2]);

      assert.sameOrderedMembers([3,1,2,3], newBanks);
    });

    it('Now, there is a tie between the first and fourth memory banks, both of which have three blocks. The first bank wins the tie, and its three blocks are distributed evenly over the other three banks, leaving it with none: 0 2 3 4.', function() {
      let newBanks = redistributeMax([3,1,2,3]);

      assert.sameOrderedMembers([0,2,3,4], newBanks);
    });

    it('The fourth bank is chosen, and its four blocks are distributed such that each of the four banks receives one: 1 3 4 1.', function() {
      let newBanks = redistributeMax([0,2,3,4]);

      assert.sameOrderedMembers([1,3,4,1], newBanks);
    });

    it('The third bank is chosen, and the same thing happens: 2 4 1 2.', function() {
      let seen = [];
      let banks;
      let count = 0;
      while(true) {
        count++;
        banks = redistributeMax(banks || [0, 2, 7, 0]);
        let crc = banks.join(',');
        if (seen.includes(crc)) {
          break;
        }

        seen.push(crc);
      }


      assert.sameOrderedMembers([2,4,1,2], banks);
      assert.equal(5, count);
    });

    it('Given the initial block counts in your puzzle input, how many redistribution cycles must be completed before a configuration is produced that has been seen before? --> ??', function() {
      let seen = [];
      let banks = [4,1,15,12,0,9,9,5,5,8,7,3,14,5,12,3];
      let count = 0;

      while(true) {
        count++;
        banks = redistributeMax(banks);
        let crc = banks.join(',');
        let seenIdx = seen.indexOf(crc);
        if (seenIdx >= 0) {
          break;
        }

        seen.push(crc);
      }
      assert.equal(6681, count);
    });

  });

  describe('Part 2', function() {
    it('Given the initial block counts in your puzzle input, how many redistribution cycles must be completed before a configuration is produced that has been seen before? --> ??', function() {
      let seen = [];
      let banks = [4,1,15,12,0,9,9,5,5,8,7,3,14,5,12,3];
      let count = 0;

      let cycle;
      while(true) {
        count++;
        banks = redistributeMax(banks);
        let crc = banks.join(',');
        let seenIdx = seen.indexOf(crc);
        if (seenIdx >= 0) {
          cycle = count - seenIdx -1;
          break;
        }

        seen.push(crc);
      }
      assert.equal(2392, cycle);
    });
  });
});
