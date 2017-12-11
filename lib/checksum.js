import {lines, sum} from '.';

export function checksum(spreadsheet, accumulator) {
  return lines(spreadsheet)
    .map(line => lineChecksum(line, accumulator))
    .reduce(sum);
}

export function hiLowAccumulator(hiLow, value) {
  hiLow = hiLow || (hiLow = { high: value, low: value } );

  let result = {
    high: value > hiLow.high ? value : hiLow.high,
    low: value < hiLow.low ? value : hiLow.low
  };

  result.result = result.high - result.low;

  return result;
}

export function lineChecksum(line, accumulator) {
  let acc = line
    .split(/\s+/)
    .map(v => Number(v))
    .reduce(accumulator, null);

  return acc.result;
}


export function evenlyDivAccumulator(acc, value) {
  acc = acc || (acc = { history: [] } );

  if (acc.result)
    return acc;

  let divisor = acc.history.find(v => {
    let numerator = Math.max(v, value);
    let denominator = Math.min(v, value);

    return (numerator % denominator) == 0;
  });

  if (divisor) {
    return {
      history: [...acc.history],
      result: divisor < value
        ? value / divisor
        : divisor / value
    };
  }

  let result = {
    history: [...acc.history, value],
    result: undefined
  };

  return result;
}
