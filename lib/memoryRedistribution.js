import {max} from '.';

export function redistribute(banks, idx) {
    let blocks = banks[idx];
    banks[idx] = 0;
    let nextIdx = (idx+1) % banks.length;
    while (blocks > 0) {
      banks[nextIdx] = (banks[nextIdx] || 0) + 1;
      nextIdx = (nextIdx+1) % banks.length;
      blocks--;
    }

    return banks;
  }

export const redistributeMax = banks => redistribute(banks, max(banks));
