import {readFile, nextIdxCaptcha, halfwayAroundCaptcha} from '../lib';

let assert = require('assert');

describe('2017 - Day 1', function() {

  let input;
  before(() => input = readFile('./input/2017-01.txt'));

  describe('Part 1 - captcha n+1', function() {

    it('should return 0 for empty string', function() {
      assert.equal(nextIdxCaptcha(''), 0);
    });

    it('1122 produces a sum of 3 (1 + 2) because the first digit (1) matches the second digit and the third digit (2) matches the fourth digit.', function() {
      assert.equal(nextIdxCaptcha('1122'), 3);
    });

    it('1111 produces 4 because each digit (all 1) matches the next.', function() {
      assert.equal(nextIdxCaptcha('1111'), 4);
    });

    it('1234 produces 0 because no digit matches the next.', function() {
      assert.equal(nextIdxCaptcha('1234'), 0);
    });

    it('91212129 produces 9 because the only digit that matches the next one is the last digit, 9.', function() {
      assert.equal(nextIdxCaptcha('91212129'), 9);
    });

    it('What is the solution to your captcha? --> 1029', function() {
      assert.equal(nextIdxCaptcha(input), 1029);
    });
  });

  describe('Part 2 - captcha n+(len/2)', function() {

    it('1212 produces 6: the list contains 4 items, and all four digits match the digit 2 items ahead.', function() {
      assert.equal(halfwayAroundCaptcha('1212'), 6);
    });

    it('1221 produces 0, because every comparison is between a 1 and a 2.', function() {
      assert.equal(halfwayAroundCaptcha('1221'), 0);
    });

    it('123425 produces 4, because both 2s match each other, but no other digit has a match.', function() {
      assert.equal(halfwayAroundCaptcha('123425'), 4);
    });

    it('123123 produces 12.', function() {
      assert.equal(halfwayAroundCaptcha('123123'), 12);
    });

    it('12131415 produces 4.', function() {
      assert.equal(halfwayAroundCaptcha('12131415'), 4);
    });

    it('What is the solution to your new captcha?  --> 1220', function() {
      assert.equal(halfwayAroundCaptcha(input), 1220);
    });
  });

});