export const executeIntCode = (program, input, output, doLog = false) => {
  if (!Array.isArray(input)) input = [input];

  let exe = intCodeExecutor(program, () => input.shift(), output, doLog);

  let current = exe.next();
  let p = null;
  while(!current.done) {
    p = current.value.program;
    current = exe.next();
  }
  return p;
};


export function* intCodeExecutor(program, inputFunc, outputFunc, doLog) {
  let p = [...program];
  let position = 0;
  let relOffset = 0;
  let done = false;

  const log = (txt) => doLog && console.log(txt);

  const deReference = (addr, mode) => {

    if (mode == 1) {
      // immediate mode
      return addr;
    }
    else if (mode == 2)
    // relative mode
    {
      log(`getting parameter @ ${addr} with relOffset of ${relOffset} = ${p[addr] + relOffset}`);
      return p[addr] + relOffset;
    }
    else {
      // position mode
      return p[addr];
    }
  };


  const getMode = (param) => {
    log(`getMode for param ${param}: ${p[position]} ==> ${Math.floor(p[position] / 100).toString(10).split('').reverse()[param]}`);
    return Math.floor(p[position] / 100).toString(10).split('').reverse()[param];
  };

  const getParam = (param) => {
    const addr = deReference(position + 1 + param, getMode(param));
    log(`getParam(${param}) at addr ${addr}`);

    if (addr >= p.length) {
      log(`trying to fetch value from p[${addr}] witch is out of range. Using default value 0`);
      p[addr] = 0;
    }

    return p[addr];
  };

  const setParam = (param, val) => p[deReference(position + 1 + param, getMode(param))] = val;

  const instructions = {
    // add
    1: () =>  {
      setParam(2, getParam(0) + getParam(1));
      position += 4;
    },
    // multiply
    2: () =>
    {
      setParam(2, getParam(0) * getParam(1));
      position += 4;
    },
    // input
    3: () => {
      const i = inputFunc();
      setParam(0, i);
      position += 2;
    },
    // output
    4: () => {
      const o = getParam(0);
      outputFunc(o);
      position += 2;
    },
    // jumpIfTrue
    5: () => {
      position = getParam(0) !== 0 ? getParam(1) : position + 3;
    },
    // jumpIfFalse
    6: () => {
      position = getParam(0) === 0 ? getParam(1) : position + 3;
    },
    // lessThan
    7: () => {
      setParam(2, getParam(0) < getParam(1) ? 1 : 0);
      position += 4;
    },
    // equals
    8: () => {
      setParam(2, getParam(0) === getParam(1) ? 1 : 0);
      position += 4;
    },
    // adjust relOffset
    9: () => {
      log(`adjusting rel.pos from ${relOffset} to ${relOffset + getParam(0)}`);
      relOffset += Number.parseInt(getParam(0), 10);
      position += 2;
    },
    99: () => {
      done = true;
    }
  };

  while (!done) {

    const instruction = p[position] % 100;

    yield {
      position: position,
      instruction: instruction,
      program: p
    };

    instructions[instruction] && instructions[instruction]();
  }
}
