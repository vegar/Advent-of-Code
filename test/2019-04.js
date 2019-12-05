import { assert } from 'chai';

describe('2019 - Day 04', function() {
  const inputMin = 109165;
  const inputMax = 576723;

  const checkIncreasing = (password) => {
    let result = true;
    [...password.toString()].reduce((prev, curr) => {
      if (curr <  prev) result = false;
      return curr;
    });
    return result;
  };

  const checkStrictDouble = (password) => {
    let result = false;
    let i = 1;
    [...password.toString()].reduce((prev, curr) => {
      if (curr ===  prev) i++;
      if (curr !== prev) {
        if (i === 2) result = true;
        i = 1;
      }
      return curr;
    });
    return result || i === 2;
  };

  const checkDouble = (password) => {
    let result = false;
    [...password.toString()].reduce((prev, curr) => {
      if (curr === prev) result = true;
      return curr;
    });
    return result;
  };

  const check = (password) => {
    return checkIncreasing(password) && checkDouble(password);
  };

  const check2 = (password) => {
    return checkIncreasing(password) && checkStrictDouble(password);
  };

  describe('Part 1', () => {
    it('111111 meets these criteria (double 11, never decreases).', () => {
      assert.isTrue(check(111111));
    });

    it('223450 does not meet these criteria (decreasing pair of digits 50).', () => {
      assert.isFalse(check(223450));
    });

    it('123789 does not meet these criteria (no double).', () => {
      assert.isFalse(check(123789));
    });

    it('How many different passwords within the range given in your puzzle input meet these criteria?', () => {
      let result = 0;
      for(let p = inputMin; p <= inputMax; p++){
        if (check(p)) ++result;
      }
      assert.equal(result, 2814);
    });
  });

  describe('Part 2', () => {
    it('112233 meets these criteria because the digits never decrease and all repeated digits are exactly two digits long.', () => {
      assert.isTrue(check2(112233));
    });

    it('123444 no longer meets the criteria (the repeated 44 is part of a larger group of 444).', () => {
      assert.isFalse(check2(123444));
    });

    it('111122 meets the criteria (even though 1 is repeated more than twice, it still contains a double 22).', () => {
      assert.isTrue(check2(111122));
    });

    it('How many different passwords within the range given in your puzzle input meet all of the criteria?', () => {
      let result = [];
      for(let p = inputMin; p <= inputMax; p++){
        if (check2(p)) result.push(p);
      }

      assert.equal(result.length, 1991);
    });
  });
});
