import {readFileAsNumbers} from '../lib';
import {assert} from 'chai';

describe('2019 - Day 01', function() {

  const execute = (program) => {
    let p = [...program];
    let position = 0;
    while (p[position] !== 99) {
      if (p[position] === 1) {
        const a = p[p[position+1]];
        const b = p[p[position+2]];
        p[p[position+3]] = a + b;
        position += 4;
      }
      if (p[position] === 2) {
        const a = p[p[position+1]];
        const b = p[p[position+2]];
        p[p[position+3]] = a * b;
        position += 4;
      }
    }
    return p;
  }

  describe('Part 1', function() {
    it('1,0,0,0,99 becomes 2,0,0,0,99 (1 + 1 = 2).', () => {
      const newProgram = execute([1,0,0,0,99]);
      console.log(newProgram);
      assert.sameOrderedMembers(newProgram, [2,0,0,0,99]);
    });

    it('2,3,0,3,99 becomes 2,3,0,6,99 (3 * 2 = 6).', () => {
      const newProgram = execute([2,3,0,3,99]);
      console.log(newProgram);
      assert.sameOrderedMembers(newProgram, [2,3,0,6,99]);
    });

    it('2,4,4,5,99,0 becomes 2,4,4,5,99,9801 (99 * 99 = 9801).', () => {
      const newProgram = execute([2,4,4,5,99,0]);
      console.log(newProgram);
      assert.sameOrderedMembers(newProgram, [2,4,4,5,99,9801]);
    });

    it('1,1,1,4,99,5,6,0,99 becomes 30,1,1,4,2,5,6,0,99.', () => {
      const newProgram = execute([1,1,1,4,99,5,6,0,99]);
      console.log(newProgram);
      assert.sameOrderedMembers(newProgram, [30,1,1,4,2,5,6,0,99]);
    });

    it('What value is left at position 0 after the program halts?', () => {
      let program = readFileAsNumbers('./input/2019-02.txt');
      program[1] = 12;
      program[2] = 2;

      let newProgram = execute(program);
      assert.equal(newProgram[0], 3306701);
    });
  });

  describe('Part 2', function() {
    it('determine what pair of inputs produces the output 19690720. What is 100 * noun + verb?', () => {
      let result = 0;
      let noun = 0;
      let verb = 0;
      let program = readFileAsNumbers('./input/2019-02.txt');
      while (result != 19690720) {
        program[1] = noun;
        program[2] = verb;

        const newProgram = execute(program);
        result = newProgram[0];
        if (result !== 19690720)  {
          noun += 1;
          if (noun == 100) {
            verb += 1;
            noun = 0;
          }
        }
      }

      assert.equal(noun,76);
      assert.equal(verb, 21);
      assert.equal(100 * noun + verb, 7621);

    });
  });
});
