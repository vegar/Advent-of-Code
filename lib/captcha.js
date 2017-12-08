export function captcha(input, next) {
  return [...input]
    .map(c => Number(c))
    .reduce((acc, curr, currIdx, arr) =>
      curr == arr[next(currIdx, arr.length)]
        ? acc + curr
        : acc
      , 0);
}

export const nextIdxFunc = (i, len) => (i+1) % len;
export const halfwayAroundFunc = (i, len) => (i + (len/2)) % len;

export const nextIdxCaptcha = input => captcha(input, nextIdxFunc);
export const halfwayAroundCaptcha = input => captcha(input, halfwayAroundFunc);
