import { assert } from 'chai';
import { readFileAsNumbers, executeIntCode,  } from '../lib';

describe('2019 - Day 09', function() {
  const input = readFileAsNumbers('./input/2019-09.txt')


  describe('Part 1', () => {
    it('109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99 takes no input and produces a copy of itself as output.', () => {
      let output = [];
      const program = [
        109,1,
        204,-1,
        1001,100,1,100,
        1008,100,16,101,
        1006,101,0,
        99
      ];
      executeIntCode(program, [], (o) => {
        output.push(o);
      });

      assert.sameOrderedMembers(output, program);

    });

    it('1102,34915192,34915192,7,4,7,99,0 should output a 16-digit number.', () => {
      let output = null;
      executeIntCode([1102,34915192,34915192,7,4,7,99,0], [], (o) => output = o);

      assert.equal(output, 1219070632396864);
    });

    it('104,1125899906842624,99 should output the large number in the middle.', () => {
      let output = null;
      executeIntCode([104,1125899906842624,99], [], (o) => output = o);

      assert.equal(output, 1125899906842624);
    });

    it('What BOOST keycode does it produce?', () => {
      let output = null;
      executeIntCode(input, [1], (o) => output = o);

      assert.equal(output, 2465411646);
    });
  });

  describe('Part 2', () => {
    it('What are the coordinates of the distress signal?', () => {
      let output = null;
      executeIntCode(input, [2], (o) => output = o);

      assert.equal(output, 69781);
    });
  });
});
