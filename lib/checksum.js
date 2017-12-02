export function checksum(spreadsheet) {
  return spreadsheet.match(/[^\r\n]+/g)
    .map(line => lineDiff(line))
    .reduce((sum, diff) => {
      return sum += diff
    }, 0);
};

export function hiLowAccumulator(hiLow, value) {
  hiLow = hiLow || (hiLow = { high: value, low: value } );

  return {
    high: value > hiLow.high ? value : hiLow.high,
    low: value < hiLow.low ? value : hiLow.low
  }
}

export function lineDiff(line) {

  let trimmedLine = line.trim();

  if (trimmedLine == '') return 0;

  let hiLow = trimmedLine
    .split(/\s+/)
    .map(v => 1*v)
    .reduce(hiLowAccumulator, null);

  return hiLow.high - hiLow.low;
}
