import { assert } from 'chai';
import { readFileAsNumbers, executeIntCode, intCodeExecutor } from '../lib';

describe('2019 - Day 07', function() {
  let program = readFileAsNumbers('./input/2019-07.txt');

  const runSequence = (p, seq) => {
    let output = 0;
    seq.forEach((v) => {
      executeIntCode(p, [v, output], (o) => {
        output = o;
      });
    });
    return output;
  };

  const permute = (xs) => {
    let ret = [];

    for (let i = 0; i < xs.length; i = i + 1) {
      let rest = permute(xs.slice(0, i).concat(xs.slice(i + 1)));

      if(!rest.length) {
        ret.push([xs[i]]);
      } else {
        for(let j = 0; j < rest.length; j = j + 1) {
          ret.push([xs[i]].concat(rest[j]));
        }
      }
    }
    return ret;
  };


  describe('Part 1', () => {
    it(`Max thruster signal 43210 (from phase setting sequence 4,3,2,1,0):
        3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0`, () => {

      const p = [3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0];
      const seq = [4,3,2,1,0];

      let output = runSequence(p, seq);

      assert.equal(output, 43210);
    });

    it(`Max thruster signal 54321 (from phase setting sequence 0,1,2,3,4):
        3,23,3,24,1002,24,10,24,1002,23,-1,23,
        101,5,23,23,1,24,23,23,4,23,99,0,0`, () => {

      const p = [3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0];
      const seq = [0,1,2,3,4];

      let output = runSequence(p, seq);

      assert.equal(output, 54321);
    });

    it(`Max thruster signal 65210 (from phase setting sequence 1,0,4,3,2):
        3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,
        1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0`, () => {

      const p = [3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0];
      const seq = [1,0,4,3,2];

      let output = runSequence(p, seq);

      assert.equal(output, 65210);
    });

    it('Try every combination of phase settings on the amplifiers. What is the highest signal that can be sent to the thrusters?', () => {

      const max = permute([0,1,2,3,4])
        .reduce((max, currPermute) => {
          const o = runSequence(program, currPermute);
          return o > max ? o : max;
        }, 0);

      assert.equal(max, 17440);
    });
  });

  describe('Day 2', () => {

    const runSequence2 = (p, seq) => {
      let output = 0;

      const inputs = [
        [seq[0], 0],
        [seq[1]],
        [seq[2]],
        [seq[3]],
        [seq[4]],
      ];

      const programs = [
        intCodeExecutor(p, () => inputs[0].shift(), (o) => { inputs[1].push(o); output = o; }),
        intCodeExecutor(p, () => inputs[1].shift(), (o) => { inputs[2].push(o); output = o; }),
        intCodeExecutor(p, () => inputs[2].shift(), (o) => { inputs[3].push(o); output = o; }),
        intCodeExecutor(p, () => inputs[3].shift(), (o) => { inputs[4].push(o); output = o; }),
        intCodeExecutor(p, () => inputs[4].shift(), (o) => { inputs[0].push(o); output = o; }),
      ];

      const done = [
        false,
        false,
        false,
        false,
        false
      ];

      const allDone = () => done[0] && done[1] && done[2] && done[3] && done[4];

      let currProgram = 0;
      let i = programs[currProgram].next();
      while (!(allDone())) {

        // waiting for input?
        if (i.value.instruction == 3 && inputs[currProgram].length == 0) {
          currProgram = (currProgram + 1) % programs.length;
        }

        i = programs[currProgram].next();
        while(i.done && !allDone()){
          done[currProgram] = true;
          currProgram = (currProgram + 1) % programs.length;
          i = programs[currProgram].next();
        }
      }

      return output;
    };

    it(`Max thruster signal 139629729 (from phase setting sequence 9,8,7,6,5):
        3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,
        27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5`, () => {

      const output = runSequence2([3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,
        27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5], [9,8,7,6,5]);

      assert.equal(output, 139629729);

    });

    it(`Max thruster signal 18216 (from phase setting sequence 9,7,8,5,6):
        3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,
        -5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,
        53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10`, () => {

      const output = runSequence2([3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,
        -5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,
        53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10], [9,7,8,5,6]);

      assert.equal(output, 18216);
    });

    it('Try every combination of the new phase settings on the amplifier feedback loop. What is the highest signal that can be sent to the thrusters?', () => {
      const max = permute([5,6,7,8,9])
        .reduce((max, currPermute) => {
          const o = runSequence2(program, currPermute);
          return o > max ? o : max;
        }, 0);

      assert.equal(max, 27561242);

    });
  });
});
