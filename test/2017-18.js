import {readFileLines} from '../lib';
import {assert} from 'chai';

describe('2017 - Day 18', function(){
  const getValue = (registry, value) => {
    return isNaN(parseInt(value, 10)) ? registry[value] : parseInt(value, 10);
  };

  describe('Part 1', function(){

    const operators = (registry) => {
      return {
        snd: (reg) => registry.lastPlayed = registry[reg],
        set: (reg, value) => registry[reg] = getValue(registry, value),
        add: (reg, value) => registry[reg] += getValue(registry, value),
        mul: (reg, value) => registry[reg] *= getValue(registry, value),
        mod: (reg, value) => registry[reg] = registry[reg] % getValue(registry, value),
        rcv: (reg) => {
          registry.recovered = registry[reg] == 0 ? null : registry.lastPlayed;
        },
        jgz: (reg, value) => registry.jump = registry[reg] == 0 ? null : getValue(registry, value)
      };
    };

    const execute = (registry) => (instruction) => {
      let ops = operators(registry);

      let [op, reg, value] = instruction.split(' ');

      ops[op](reg, value);
    };

    const run = (instructions) => {
      let currInstruction = 0;
      let reg = { recovered: null };

      while (reg.recovered == null) {
        execute(reg)(instructions[currInstruction]);
        currInstruction += (reg.jump ? reg.jump : 1);
        currInstruction = currInstruction % instructions.length;
        reg.jump = null;
      }

      return reg;
    };

    it('snd X plays a sound with a frequency equal to the value of X.', function() {
      let registry = {
        a: 10,
        lastPlayed: null
      };

      execute(registry)('snd a');

      assert.equal(registry.lastPlayed, 10);
    });

    it('set X Y sets register X to the value of Y', function() {
      let registry = {
        a: 10,
        b: 20
      };

      execute(registry)('set a 40');
      execute(registry)('set b a');

      assert.equal(registry.a, 40);
      assert.equal(registry.b, 40);
    });

    it('add X Y increases register X by the value of Y', function() {
      let registry = {
        a: 10,
        b: 20
      };

      execute(registry)('add a 40');
      execute(registry)('add b a');

      assert.equal(registry.a, 50);
      assert.equal(registry.b, 70);
    });

    it('mul X Y sets register X to the result of multiplying the value contained in register X by the value of Y.', function() {
      let registry = {
        a: 10,
        b: 20
      };

      execute(registry)('mul a 2');
      execute(registry)('mul b a');

      assert.equal(registry.a, 20);
      assert.equal(registry.b, 20*20);
    });

    it('mod X Y sets register X to the remainder of dividing the value contained in register X by the value of Y', function() {
      let registry = {
        a: 10,
        b: 20
      };

      execute(registry)('mod a 7');
      execute(registry)('mod b a');

      assert.equal(registry.a, 3);
      assert.equal(registry.b, 2);
    });

    it('rcv X recovers the frequency of the last sound played, but only when the value of X is not zero.', function(){
      let registry = {
        a: 10,
        b: 0,
        lastPlayed: 100
      };

      execute(registry)('rcv a');
      assert.equal(registry.recovered, 100);

      execute(registry)('rcv b');
      assert.equal(registry.recovered, null);
    });

    it('jgz X Y jumps with an offset of the value of Y, but only if the value of X is greater than zero. ', function() {
      let registry = {
        a: 10,
        b: 0,

        currInstruction: 0
      };

      execute(registry)('jgz a 15');
      assert.equal(registry.jump, 15);

      execute(registry)('jgz b -10');
      assert.equal(registry.jump, null);
    });

    it('At the time the recover operation is executed, the frequency of the last sound played is 4', function(){
      let instructions = [
        'set a 1',
        'add a 2',
        'mul a a',
        'mod a 5',
        'snd a',
        'set a 0',
        'rcv a',
        'jgz a -1',
        'set a 1',
        'jgz a -2'
      ];

      let reg = run(instructions);

      assert.equal(reg.recovered, 4);
    });

    it('What is the value of the recovered frequency (the value of the most recently played sound) the first time a rcv instruction is executed with a non-zero value?', function() {
      let instructions = readFileLines('./input/2017-18.txt');

      let reg = run(instructions);

      assert.equal(reg.recovered, 3423);
    });
  });

  describe('Part 2', function() {

    const operators = (registry) => {
      return {
        snd: (value) => {
          registry.sent += 1;
          registry.outBuffer.push(getValue(registry, value));
          return true;
        },
        set: (reg, value) => {
          registry[reg] = getValue(registry, value);
          return true;
        },
        add: (reg, value) => {
          registry[reg] += getValue(registry, value);
          return true;
        },
        mul: (reg, value) => {
          registry[reg] *= getValue(registry, value);
          return true;
        },
        mod: (reg, value) => {
          registry[reg] = registry[reg] % getValue(registry, value);
          return true;
        },
        rcv: (reg) => {
          if (registry.inBuffer.length < 1) return false;

          registry[reg] = registry.inBuffer.shift();
          return true;
        },
        jgz: (reg, value) => {
          registry.jump = getValue(registry, reg) <= 0 ? null : getValue(registry, value);
          return true;
        }
      };
    };

    const execute = (registry) => (instruction) => {
      let ops = operators(registry);

      let [op, reg, value] = instruction.split(' ');

      return ops[op](reg, value);
    };

    const run = (instructions, reg) => {
      let executor = execute(reg);
      reg.executed = 0;

      while (!reg.blocked) {
        let result  = executor(instructions[reg.curr]);
        if (result) {
          reg.executed += 1;
          reg.curr += (reg.jump ? reg.jump : 1);
          reg.jump = null;
        }
        else {
          reg.blocked = true;
        }
        if (reg.curr >= instructions.length) {
          reg.blocked = true;
        }
      }
    };

    const duet = (instructions) => {
      let prog0Reg = {pid: 0, p: 0, curr: 0, sent: 0, inBuffer: [], outBuffer: [], blocked: false };
      let prog1Reg = {pid: 1, p: 1, curr: 0, sent: 0, inBuffer: [], outBuffer: [], blocked: false };

      let currentProg = prog0Reg;
      while (!prog0Reg.blocked || !prog1Reg.blocked) {
        run(instructions, currentProg);

        let input = currentProg.outBuffer;
        currentProg.outBuffer =  [];

        currentProg == prog0Reg ? (currentProg = prog1Reg) : (currentProg = prog0Reg);
        currentProg.inBuffer.push(...input);

        currentProg.blocked = currentProg.blocked && currentProg.inBuffer.length < 1;
      }

      return {prog0Reg, prog1Reg};
    };

    it('Example prog will send 3 times before deadlock', function() {
      let instructions = [
        'snd 1',
        'snd 2',
        'snd p',
        'rcv a',
        'rcv b',
        'rcv c',
        'rcv d'
      ];

      let {prog0Reg, prog1Reg} = duet(instructions);

      assert.equal(prog0Reg.sent, 3);
    });


    it('Once both of your programs have terminated (regardless of what caused them to do so), how many times did program 1 send a value?', function() {
      let instructions = readFileLines('./input/2017-18.txt');


      let {prog0Reg, prog1Reg} = duet(instructions);

      assert.equal(prog1Reg.sent, 7493);
    });
  });
});

