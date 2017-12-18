import { knotHash, range, sum } from '../lib';
import { assert } from 'chai';

describe('2017 - Day 14', function() {

  const ctob = (c) => parseInt(c, 16).toString(2).padStart(4, '0');
  const stob = (s) => s.split('').map(ctob).join('');
  const countUsed = (s) => s.reduce((acc, c) => c == '1' ? ++acc : acc, 0);

  const makeMatrix = (key) => [...range([-1, 127])]
    .map(i => stob(knotHash(`${key}-${i}`)).split(''));


  describe('Part 1', function(){

    it('hashes', function() {
      let hash = knotHash('flqrgnkx-0');

      assert.equal(hash, 'd4f76bdcbf838f8416ccfa8bc6d1f9e6');
    });

    it('converts to bin', function() {
      let b = stob('a0c2017');

      assert.equal(b, '1010000011000010000000010111');
    });

    it('first row', function() {
      let hash = knotHash('flqrgnkx-0');
      let b = ctob(hash);

      assert.equal(b.substring(0,8), '11010100');
    });

    it('count used spaces', function() {
      let used = countUsed('11010100'.split(''));

      assert.equal(used, 4);
    });

    it('Given your actual key string, how many squares are usedoundnydw?', function() {
      this.timeout(10000);
      let used = makeMatrix('oundnydw')
        .map(countUsed)
        .reduce(sum);

      assert.equal(used, 8106);
    });
  });

  describe('Part 2', function() {

    const flood = (matrix, ridx, cidx, value) => {
      if (ridx < 0 || cidx < 0 || ridx > 127 || cidx > 127) {
        return;
      }
      if (matrix[ridx][cidx] == 0) return;
      if (matrix[ridx][cidx] == value) return;

      matrix[ridx][cidx] = value;
      flood(matrix, ridx-1, cidx, value);
      flood(matrix, ridx+1, cidx, value);
      flood(matrix, ridx, cidx-1, value);
      flood(matrix, ridx, cidx+1, value);
    };


    it('count groups', function() {
      this.timeout(10000);
      let matrix = makeMatrix('flqrgnkx');

      let group = 0;
      matrix.forEach((row, ridx) => row.forEach((region, cidx) => {
        if (region == 1) {
          group++;
          flood(matrix, ridx, cidx, group+1);
        }
      }));

      assert.equal(group, 1242);
    });


    it('cHow many regions are present given your key string?', function() {
      this.timeout(10000);
      let matrix = makeMatrix('oundnydw');

      let group = 0;
      matrix.forEach((row, ridx) => row.forEach((region, cidx) => {
        if (region == 1) {
          group++;
          flood(matrix, ridx, cidx, group+1);
        }
      }));

      assert.equal(group, 1164);
    });

  });

});