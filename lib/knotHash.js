import { asBytes, range, reverseSegment, xor } from '.'

export const knotHash = (input) => {
  const suffix = [17, 31, 73, 47, 23];

  let lengths = asBytes(input)
  lengths.push(...suffix);

  let list = [...range([-1,255])];
  list.current = 0;
  let skip = 0;

  for (var i = 0; i < 64; i++) {
    lengths.forEach(length => {
      list = reverseSegment(list, list.current, length);
      list.current = (list.current+length+skip) % list.length;
      skip++;
    });
  }
  let dense = toDenseHash(list).map(d => Number(d).toString(16).padStart(2, '0')).join('');

  return dense;
}

export const toDenseHash = (input) => {
    let segments = input.length / 16;
    let result = [];
    for (var i = 0; i < segments; i++) {
      let s = input.slice(i*16, (i+1)*16);
      let crc = xor(s);
      result.push(crc);
    }
    return result;
  };
