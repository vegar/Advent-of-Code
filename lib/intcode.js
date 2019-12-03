export const executeIntCode = (program) => {
  let p = [...program];
  let position = 0;

  const instructions = {
    add: () =>  p[p[position+3]] = p[p[position+1]] + p[p[position+2]],
    multiply: () => p[p[position+3]] = p[p[position+1]] * p[p[position+2]],
  };

  while (p[position] !== 99) {
    if (p[position] === 1) {
      instructions.add();
      position += 4;
    }
    if (p[position] === 2) {
      instructions.multiply();
      position += 4;
    }
  }
  return p;
};
