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
export const xor = input => input.reduce((acc, curr) => acc^curr);

export const asBytes = (input) => input.split('').map(c => c.charCodeAt(0)) || [];


export const reverseSegment = (list, idx, length) => {
  if (length > 1) {
    let sub = list.slice(idx, idx + length);
    if (sub.length < length) {
      sub.push(...list.slice(0, length-sub.length));
    }
    sub.reverse();

    //first part
    let first = sub.slice(0, list.length - idx);
    list.splice(idx, first.length, ...first);

    //second part
    let second = sub.slice(first.length);
    list.splice(0, second.length, ...second);
  }

  return list;
}