export const parser = (line) => {
  let [, addr, op, value, ifAddr, ifOp, ifValue] = line.match(/(\w+) (inc|dec) ([\d-]*) if (\w+) ([=!><]*) ([\d-]*)/);

  return {
    addr, op, value: parseInt(value, 10), ifAddr, ifOp, ifValue: parseInt(ifValue, 10)
  };
};

export const evaluateExp = (left, comperator, right) =>
{ /* eslint-disable indent, */
  return comperator == '>'  ? left > right
       : comperator == '>=' ? left >= right
       : comperator == '<'  ? left < right
       : comperator == '<=' ? left <= right
       : comperator == '==' ? left == right
       : comperator == '!=' ? left != right
       : false;
  /* eslint-enable indent, */
};

export const execute = (operation, register) => {
  if (evaluateExp(register[operation.ifAddr] || 0, operation.ifOp, operation.ifValue))
  {
    let regValue = register[operation.addr] || 0;

    operation.op == 'inc'
      ? regValue += operation.value
      : regValue -= operation.value;

    let newReg =  Object.assign({}, register);

    newReg[operation.addr] = regValue;
    let max = newReg['__max'] || 0;
    newReg['__max'] = Math.max(max, regValue);

    return newReg;
  }

  return register;
};
