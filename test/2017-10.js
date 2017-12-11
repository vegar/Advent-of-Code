import { readFile, range, knotHash, asBytes, toDenseHash, reverseSegment } from '../lib';
import { assert } from 'chai';

describe('2017 - Day 10', function() {

  let lengths;
  before(() => lengths = readFile('./input/2017-10.txt').trim());

  describe('Part 1', function() {
    // it('The list begins as [0] 1 2 3 4 (where square brackets indicate the current position).', function(){

    // });

    describe('First length, 3', function(){
      // it('The first length, 3, selects ([0] 1 2) 3 4 (where parentheses indicate the sublist to be reversed).', function(){

      // });

      it('After reversing that section (0 1 2 into 2 1 0), we get ([2] 1 0) 3 4.', function(){
        let result = reverseSegment([0, 1, 2, 3, 4], 0, 3);

        assert.sameOrderedMembers(result, [2,1,0,3,4]);
      });
    });

    describe('Second length, 4', function(){
      it('The sublist 3 4 2 1 is reversed to form 1 2 4 3: 4 3) 0 ([1] 2.', function(){
        let result = reverseSegment([2,1,0,3,4], 3, 4);

        assert.sameOrderedMembers(result, [4,3,0,1,2]);
      });
    });

    describe('Third length, 1', function() {
      it('The third length, 1, selects a sublist of a single element, and so reversing it has no effect.', function(){
        let result = reverseSegment([4,3,0,1,2], 3, 1);

        assert.sameOrderedMembers(result, [4,3,0,1,2]);
      });
    });

    describe('Fourth length, 5', function() {
      it('The fourth length, 5, selects every element starting with the second: 4) ([3] 0 1 2. Reversing this sublist (3 0 1 2 4 into 4 2 1 0 3) produces: 3) ([4] 2 1 0.', function(){
        let result = reverseSegment([4,3,0,1,2], 1, 5);

        assert.sameOrderedMembers(result, [3,4,2,1,0]);
      });
    });

    it('Once this process is complete, what is the result of multiplying the first two numbers in the list? --> 1980', function() {
      let list = [...range([-1,255])];
      list.current = 0;
      let skip = 0;
      lengths
        .split(',')
        .map(i => Number(i))
        .forEach(length => {
          list = reverseSegment(list, list.current, length);
          list.current = (list.current + length + skip) % list.length;
          skip++;
        });

      assert.equal(list[0]*list[1], 1980);
    });
  });

  describe('Part 2', function() {

    describe('input as bytes', function(){
      it('given 1,2,3, you should convert it to the ASCII codes for each character: 49,44,50,44,51', function(){
        let bytes = asBytes('1,2,3');

        assert.sameOrderedMembers(bytes, [49,44,50,44,51]);
      });
    });

    describe('sparse hash to dense hash', function() {
      it('handles 16 bytes', function(){
        let sparseHash = [65,27,9,1,4,3,40,50,91,7,6,0,2,5,68,22];

        let denseHash = toDenseHash(sparseHash);

        assert.sameOrderedMembers(denseHash, [64]);
      });

      it('handles multiples of 16 bytes', function(){
        let sparseHash = [65,27,9,1,4,3,40,50,91,7,6,0,2,5,68,22,65,27,9,1,4,3,40,50,91,7,6,0,2,5,68,22];

        let denseHash = toDenseHash(sparseHash);

        assert.sameOrderedMembers(denseHash, [64, 64]);
      });
    });

    describe('knot hash', function() {
      it('The empty string becomes a2582a3a0e66e6e86e3812dcb672a272.', function(){
        let result = knotHash('');

        assert.equal(result, 'a2582a3a0e66e6e86e3812dcb672a272');
      });

      it('AoC 2017 becomes 33efeb34ea91902bb2f59c9920caa6cd.', function(){
        let result = knotHash('AoC 2017');

        assert.equal(result, '33efeb34ea91902bb2f59c9920caa6cd');
      });

      it('1,2,3 becomes 3efbe78a8d82f29979031a4aa0b16a9d.', function(){
        let result = knotHash('1,2,3');

        assert.equal(result, '3efbe78a8d82f29979031a4aa0b16a9d');
      });

      it('1,2,4 becomes 63960835bcdc130f0b66d7ff4f6a5a8e.', function(){
        let result = knotHash('1,2,4');

        assert.equal(result, '63960835bcdc130f0b66d7ff4f6a5a8e');
      });
    });

    it('Treating your puzzle input as a string of ASCII characters, what is the Knot Hash of your puzzle input? -->', function(){
      let result = knotHash(lengths);

      assert.equal(result, '899124dac21012ebc32e2f4d11eaec55');
    });
  });
});
