import {readFileLines, readFileLinesAsNumbers} from '../lib'

let assert = require('chai').assert;

describe('fileInput', function() {

  describe('readFileLines', function() {
    it('should not add empty line at end', function() {
      let input = readFileLines('input/fileReadTest.txt');

      assert.equal(input.length, 4);
    });
  });

  describe('readFileLinesAsNumbers', function() {
    it('should return array of integers', function() {
      let input = readFileLinesAsNumbers('input/fileReadTest.txt');

      input.forEach(i => assert.typeOf(i, 'Number'));
    });
  });

});
