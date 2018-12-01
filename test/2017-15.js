//Generator A starts with 277
//Generator B starts with 349

import {  } from '../lib';
import { assert } from 'chai';

describe('2017 - Day 15', function() {

  function* generator(seed, factor, rejectValue = () => false) {
    let previous = seed;
    while(true) {
      do {
        previous = (previous * factor) % 2147483647;
      }
      while (rejectValue(previous));

      yield previous;
    }
  }

  const first16bits = (number) => {
    return (number & 0b1111111111111111);
  };

  const generatorA = (seed, rejectValue) => generator(seed, 16807, rejectValue);
  const generatorB = (seed, rejectValue) => generator(seed, 48271, rejectValue);

  const comparePair = (genA, genB) => {
    let a = genA.next().value;
    let b = genB.next().value;
    return first16bits(a) == first16bits(b);
  };


  describe('Part 1', function() {

    const exampleGenA = () => generatorA(65);
    const exampleGenB = () => generatorB(8921);
    const inputGenA = () => generatorA(277);
    const inputGenB = () => generatorB(349);

    it('Example gen. A', function() {
      let genA = exampleGenA();

      assert.equal(genA.next().value, 1092455);
      assert.equal(genA.next().value, 1181022009);
      assert.equal(genA.next().value, 245556042);
      assert.equal(genA.next().value, 1744312007);
      assert.equal(genA.next().value, 1352636452);
    });

    it('Example gen. B', function() {
      let genB = exampleGenB();

      assert.equal(genB.next().value, 430625591);
      assert.equal(genB.next().value, 1233683848);
      assert.equal(genB.next().value, 1431495498);
      assert.equal(genB.next().value, 137874439);
      assert.equal(genB.next().value, 285222916);
    });

    it('takes first 16 bits', function() {
      assert.equal(first16bits(1092455), 0b1010101101100111);
      assert.equal(first16bits(430625591), 0b1101001100110111);
      assert.equal(first16bits(1181022009), 0b1111011100111001);
      assert.equal(first16bits(1233683848), 0b1000010110001000);
      assert.equal(first16bits(245556042), 0b1110001101001010);
      assert.equal(first16bits(1431495498), 0b1110001101001010);
      assert.equal(first16bits(1744312007), 0b0001011011000111);
      assert.equal(first16bits(137874439), 0b1100110000000111);
      assert.equal(first16bits(1352636452), 0b1001100000100100);
      assert.equal(first16bits(285222916), 0b0010100000000100);
    });

    it('compares pairs', function() {
      let genA = exampleGenA();
      let genB = exampleGenB();

      genA.next();
      genA.next();
      genB.next();
      genB.next();

      let equal = comparePair(genA, genB);


      assert.equal(equal, true);
    });

    it('In the example above, the judge would eventually find a total of 588 pairs that match in their lowest 16 bits.', function(){
      this.timeout(100000);
      let genA = exampleGenA();
      let genB = exampleGenB();

      let count = 0;
      for (var i = 0; i < 40000000; i++) {
        comparePair(genA, genB) ? count++ : count;
      }

      assert.equal(count, 588);
    });

    it('After 40 million pairs, what is the judge\'s final count?', function(){
      this.timeout(100000);
      let genA = inputGenA();
      let genB = inputGenB();

      let count = 0;
      for (var i = 0; i < 40000000; i++) {
        comparePair(genA, genB) ? count++ : count;
      }

      assert.equal(count, 592);
    });
  });

  describe('Part 2', function() {
    const dividableBy = (value, divisor) => value % divisor == 0;
    const notDividableBy = (value, divisor) => !dividableBy(value, divisor);
    const notDividableBy4 = value => notDividableBy(value, 4);
    const notDividableBy8 = value => notDividableBy(value, 8);


    const exampleGenA = () => generatorA(65, notDividableBy4);
    const exampleGenB = () => generatorB(8921, notDividableBy8);
    const inputGenA = () => generatorA(277, notDividableBy4);
    const inputGenB = () => generatorB(349, notDividableBy8);

    it('generates with mod', function() {
      this.timeout(100000);
      let genA = exampleGenA();
      let genB = exampleGenB();

      let count = 0;
      for (var i = 0; i < 1056; i++) {
        comparePair(genA, genB) ? count++ : count;
      }

      assert.equal(count, 1);
    });

    it('Using the values from the example above, after five million pairs, the judge would eventually find a total of 309 pairs that match in their lowest 16 bits.', function() {
      this.timeout(100000);
      let genA = exampleGenA();
      let genB = exampleGenB();

      let count = 0;
      for (var i = 0; i < 5000000; i++) {
        comparePair(genA, genB) ? count++ : count;
      }

      assert.equal(count, 309);
    });

    it('After 5 million pairs, but using this new generator logic, what is the judge\'s final count?', function() {
      this.timeout(100000);
      let genA = inputGenA();
      let genB = inputGenB();

      let count = 0;
      for (var i = 0; i < 5000000; i++) {
        comparePair(genA, genB) ? count++ : count;
      }

      assert.equal(count, 320);
    });
  });
});