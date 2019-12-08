export const executeIntCode = (program, input, output) => {
  let p = [...program];
  let position = 0;
  if (!Array.isArray(input)) input = [input];

  const deReference = (addr, mode) => mode === '1' ? addr : p[addr];
  const getMode = (param) => Math.floor(p[position] / 100).toString(10).split('').reverse()[param];
  const getParam = (param) => p[deReference(position + 1 + param, getMode(param))];
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
      const i = input.shift();
      setParam(0, i);
      position += 2;
    },
    // output
    4: () => {
      output(getParam(0));
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
  };

  while (p[position] !== 99) {
    const instruction = p[position] % 100;

    instructions[instruction] && instructions[instruction]();
  }
  return p;
};


export function* intCodeExecutor(program, inputFunc, outputFunc) {
  let p = [...program];
  let position = 0;

  const deReference = (addr, mode) => mode === '1' ? addr : p[addr];
  const getMode = (param) => Math.floor(p[position] / 100).toString(10).split('').reverse()[param];
  const getParam = (param) => p[deReference(position + 1 + param, getMode(param))];
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
  };

  while (p[position] !== 99) {

    const instruction = p[position] % 100;

    yield {
      position: position,
      instruction: instruction,
      program: p
    };

    instructions[instruction] && instructions[instruction]();
  }
}
