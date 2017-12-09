export function max(banks) {
  let max = banks[banks.length-1];
  let maxIdx = banks.length;

  for (var i = banks.length - 1; i >= 0; i--) {
    if (banks[i] >= max)
    {
      max = banks[i];
      maxIdx = i;
    }
  }

  return maxIdx;
}

export const sum = (acc, curr) => acc += curr;