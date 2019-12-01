import {readFileLines} from '../lib';
import {assert} from 'chai';
import { sum } from '../lib/array';

describe('2019 - Day 01', function(){

  const neededFuel = (mass) => Math.floor(mass / 3) - 2;

  function* recursFuelNeed(mass) {
    let rest = mass;
    while(true) {
      rest = neededFuel(rest);
      if (rest > 0)
        yield rest;
      else
        return;
    }
  }

  describe('Part 1', function(){

    it('For a mass of 12, divide by 3 and round down to get 4, then subtract 2 to get 2', function() {
      assert.equal(neededFuel(12), 2);
    });

    it('For a mass of 14, dividing by 3 and rounding down still yields 4, so the fuel required is also 2', function() {
      assert.equal(neededFuel(14), 2);
    });

    it('For a mass of 1969, the fuel required is 654', function() {
      assert.equal(neededFuel(1969), 654);
    });

    it('For a mass of 100756, the fuel required is 33583', function() {
      assert.equal(neededFuel(100756), 33583);
    });

    it('What is the sum of the fuel requirements for all of the modules on your spacecraft?', function() {
      const input = readFileLines('./input/2019-01.txt');

      const sum = input.reduce((sum, curr) => sum + neededFuel(curr), 0);

      assert.equal(sum, 3255932);
    });

  });

  describe('Part 2', () => {
    it('A module of mass 14 requires 2 fuel. This fuel requires no further fuel (2 divided by 3 and rounded down is 0, which would call for a negative fuel), so the total fuel required is still just 2.', () => {
      const r = [...recursFuelNeed(14)].reduce(sum);
      assert.equal(r, 2);
    });

    it('At first, a module of mass 1969 requires 654 fuel. Then, this fuel requires 216 more fuel (654 / 3 - 2). 216 then requires 70 more fuel, which requires 21 fuel, which requires 5 fuel, which requires no further fuel. So, the total fuel required for a module of mass 1969 is 654 + 216 + 70 + 21 + 5 = 966', () => {
      const r = [...recursFuelNeed(1969)].reduce(sum);
      assert.equal(r, 966);
    });

    it('The fuel required by a module of mass 100756 and its fuel is: 33583 + 11192 + 3728 + 1240 + 411 + 135 + 43 + 12 + 2 = 50346', () => {
      const r = [...recursFuelNeed(100756)].reduce(sum);
      assert.equal(r, 50346);
    });

    it('What is the sum of the fuel requirements for all of the modules on your spacecraft when also taking into account the mass of the added fuel?', function() {
      const input = readFileLines('./input/2019-01.txt');

      const s = input.reduce((s, curr) => {
        return s + [...recursFuelNeed(curr)].reduce(sum);
      }, 0);

      assert.equal(s, 4881041);
    });
  });
});

