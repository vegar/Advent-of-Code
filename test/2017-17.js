import {range} from '../lib';
import {assert} from 'chai';

describe('2017 - Day 17', function(){

  const spin = (buffer, current, velocity) => {
    return (current + velocity) % buffer.length;
  };

  const insert = (buffer, current, item) => {
    buffer.splice(current+1, 0, item);
    return current += 1;
  };

  const spinlock = (velocity, cycles) => {
    return [...range([0, cycles])]
      .reduce((acc, curr) => {
        acc.current = spin(acc.buffer, acc.current, velocity);
        acc.current = insert(acc.buffer, acc.current, curr);
        return acc;
      }, {
        buffer: [0],
        current: 0
      });
  };

  describe('Part 1', function() {

    it('the spinlock steps forward three times (0, 0, 0), and then inserts the first value, 1, after it. 1 becomes the current position', function(){
      let buffer = [0];
      let current = 0;

      current = spin(buffer, current, 3);
      current = insert(buffer, current, 1);

      assert.equal(current, 1);
      assert.sameOrderedMembers(buffer, [0,1]);
    });

    it('the spinlock steps forward three times (0, 1, 0), and then inserts the second value, 2, after it. 2 becomes the current position', function(){
      let buffer = [0, 1];
      let current = 1;

      current = spin(buffer, current, 3);
      current = insert(buffer, current, 2);

      assert.equal(current, 1);
      assert.sameOrderedMembers(buffer, [0,2,1]);
    });

    it('the spinlock steps forward three times (1, 0, 2), and then inserts the third value, 3, after it. 3 becomes the current position', function(){
      let buffer = [0, 2, 1];
      let current = 1;

      current = spin(buffer, current, 3);
      current = insert(buffer, current, 3);

      assert.equal(current, 2);
      assert.sameOrderedMembers(buffer, [0,2,3,1]);
    });

    it('cycles', function(){

      let {buffer, current} = spinlock(3, 2017);

      assert.sameOrderedMembers(buffer.slice(current-3, current+4), [1512,1134,151,2017,638,1513,851]);
      assert.equal(buffer[current+1], 638);
    });

    it('What is the value after 2017 in your completed circular buffer?', function(){
      let {buffer, current} = spinlock(328, 2017);

      assert.equal(buffer[current+1], 1670);
    });
  });

  describe('Part 2', function() {
    it('keeps track of 0', function() {
      this.timeout(100000);

      let z = 0, neighbor = 0, pos = 0, step = 328

      for (let i = 1; i < 50000000; i++, pos++) {
        pos = (pos + step) % i // increased by 1 at end of loop
        if (pos == z)
          neighbor = i
        if (pos < z)
          z++
      }
      assert.equal(neighbor, 2316253);
    });
  });
});