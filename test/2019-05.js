import { assert } from 'chai';
import {readFileAsNumbers, executeIntCode} from '../lib';

describe('2019 - Day 05', function() {
  let program = readFileAsNumbers('./input/2019-05.txt');


  describe('Part 1', () => {
    it('consider the program 1002,4,3,4,33.', () => {
      const p = executeIntCode([1002,4,3,4,33]);

      assert.sameOrderedMembers(p, [1002,4,3,4,99]);
    });

    it('Integers can be negative: 1101,100,-1,4,0 is a valid program', () => {
      const p = executeIntCode([1101,100,-1,4,0]);

      assert.sameOrderedMembers(p, [1101,100,-1,4,99]);
    });

    it('After providing 1 to the only input instruction and passing all the tests, what diagnostic code does the program produce?', () => {
      const output = [];

      executeIntCode(program, 1, (v) => output.push(v));

      assert.equal(output.pop(), 6761139);
    });
  });



  describe('Part 2', () => {
    it('3,9,8,9,10,9,4,9,99,-1,8 - Using position mode, consider whether the input is equal to 8; output 0 (if it is not).', () => {
      let output = null;

      executeIntCode([3,9,8,9,10,9,4,9,99,-1,8], 14, (v) => output = v);

      assert.equal(output, 0);
    });

    it('3,9,8,9,10,9,4,9,99,-1,8 - Using position mode, consider whether the input is equal to 8; output 1 (if it is)', () => {
      let output = null;

      executeIntCode([3,9,8,9,10,9,4,9,99,-1,8], 8, (v) => output = v);
      assert.equal(output, 1);
    });

    it('3,9,7,9,10,9,4,9,99,-1,8 - Using position mode, consider whether the input is less than 8; output 1 (if it is) or 0 (if it is not).', () => {
      let output = null;

      executeIntCode([3,9,7,9,10,9,4,9,99,-1,8], 7, (v) => output = v);
      assert.equal(output, 1);

      executeIntCode([3,9,7,9,10,9,4,9,99,-1,8], 8, (v) => output = v);
      assert.equal(output, 0);

      executeIntCode([3,9,7,9,10,9,4,9,99,-1,8], 9, (v) => output = v);
      assert.equal(output, 0);
    });

    it('3,3,1108,-1,8,3,4,3,99 - Using immediate mode, consider whether the input is equal to 8; output 1 (if it is) or 0 (if it is not)', () => {
      let output = null;

      executeIntCode([3,3,1108,-1,8,3,4,3,99], 7, (v) => output = v);
      assert.equal(output, 0);

      executeIntCode([3,3,1108,-1,8,3,4,3,99], 8, (v) => output = v);
      assert.equal(output, 1);

      executeIntCode([3,3,1108,-1,8,3,4,3,99], 9, (v) => output = v);
      assert.equal(output, 0);
    });

    it('3,3,1107,-1,8,3,4,3,99 - Using immediate mode, consider whether the input is less than 8; output 1 (if it is) or 0 (if it is not).', () => {
      let output = null;

      executeIntCode([3,3,1107,-1,8,3,4,3,99], 7, (v) => output = v);
      assert.equal(output, 1);

      executeIntCode([3,3,1107,-1,8,3,4,3,99], 8, (v) => output = v);
      assert.equal(output, 0);

      executeIntCode([3,3,1107,-1,8,3,4,3,99], 9, (v) => output = v);
      assert.equal(output, 0);
    });

    it(`Here are some jump tests that take an input, then output 0 if the input was zero or 1 if the input was non-zero:
        3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9 (using position mode)`, () => {
      let output = null;

      executeIntCode([3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9], 7, (v) => output = v);
      assert.equal(output, 1);

      executeIntCode([3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9], 8, (v) => output = v);
      assert.equal(output, 1);

      executeIntCode([3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9], 0, (v) => output = v);
      assert.equal(output, 0);
    });

    it(`Here are some jump tests that take an input, then output 0 if the input was zero or 1 if the input was non-zero:
        3,3,1105,-1,9,1101,0,0,12,4,12,99,1 (using immediate mode)`, () => {
      let output = null;

      executeIntCode([3,3,1105,-1,9,1101,0,0,12,4,12,99,1], 7, (v) => output = v);
      assert.equal(output, 1);

      executeIntCode([3,3,1105,-1,9,1101,0,0,12,4,12,99,1], 8, (v) => output = v);
      assert.equal(output, 1);

      executeIntCode([3,3,1105,-1,9,1101,0,0,12,4,12,99,1], 0, (v) => output = v);
      assert.equal(output, 0);
    });

    it('The above example program uses an input instruction to ask for a single number. The program will then output 999 if the input value is below 8, output 1000 if the input value is equal to 8, or output 1001 if the input value is greater than 8.', () => {

      let output = null;

      const program = [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
        1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
        999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99];

      executeIntCode(program, 7, (v) => output = v);
      assert.equal(output, 999);

      executeIntCode(program, 8, (v) => output = v);
      assert.equal(output, 1000);

      executeIntCode(program, 14, (v) => output = v);
      assert.equal(output, 1001);
    });

    it('What is the diagnostic code for system ID 5?', () => {
      const output = [];

      executeIntCode(program, 5, (v) => output.push(v));

      assert.equal(output.pop(), 9217546);
    });
  });
});
