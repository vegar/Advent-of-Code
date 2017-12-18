import { readFile } from '../lib';
import {assert } from 'chai';

describe('2017 - Day 16', function() {

  const input = readFile('./input/2017-16.txt').split(',');

  const spin = (arr, s) => {
    let end = arr.splice(-1*s);
    return [...end, ...arr];
  };

  const swap = (arr, i, j) => {
    let a = arr[i];
    let b = arr[j];

    let r = [...arr];
    r[i] = b;
    r[j] = a;

    return r;
  };

  const partner = (arr, first, second) => {
    let i = arr.indexOf(first);
    let j = arr.indexOf(second);
    return swap(arr, i, j);
  };

  const dance = {
    x: swap,
    s: spin,
    p: partner
  };

  const danceMove = (s) => {
    let [,move,i,j] = s.match(/([xsp])(\w+)(?:\/(\w+))?/);
    return (arr) => dance[move](arr, i, j);
  };


  describe('Part 1', function() {
    it('spin', function(){
      let arr = ['a', 'b', 'c', 'd', 'e'];

      arr = spin(arr, 1);

      assert.sameOrderedMembers(arr, ['e', 'a', 'b', 'c', 'd']);
    });

    it('swap', function(){
      let arr = ['e', 'a', 'b', 'c', 'd'];

      arr = swap(arr, 3,4);

      assert.sameOrderedMembers(arr, ['e', 'a', 'b', 'd', 'c']);
    });

    it('partner', function(){
      let arr = ['e', 'a', 'b', 'd', 'c'];

      arr = partner(arr, 'e','b');

      assert.sameOrderedMembers(arr, ['b', 'a', 'e', 'd', 'c']);
    });

    it('parses spin', function() {
      let arr = ['a', 'b', 'c', 'd', 'e'];

      arr = danceMove('s1')(arr);

      assert.sameOrderedMembers(arr, ['e', 'a', 'b', 'c', 'd']);
    });

    it('parses swap', function() {
      let arr = ['e', 'a', 'b', 'c', 'd'];

      arr = danceMove('x3/4')(arr);

      assert.sameOrderedMembers(arr, ['e', 'a', 'b', 'd', 'c']);
    });

    it('partner', function(){
      let arr = ['e', 'a', 'b', 'd', 'c'];

      arr = danceMove('pe/b')(arr);

      assert.sameOrderedMembers(arr, ['b', 'a', 'e', 'd', 'c']);
    });

    it('In what order are the programs standing after their dance?', function(){
      let start = 'abcdefghijklmnop'.split('');

      let result = input.reduce((acc, curr) => danceMove(curr)(acc), start)

      assert.equal(result.join(''), 'bkgcdefiholnpmja');
    });
  });

  describe('Part 2', function() {
    it('In what order are the programs standing after their billion dances?', function() {
      this.timeout(10000);

      let start = 'abcdefghijklmnop';
      let patterns = [];
      let r = start;

      do {
        patterns.push(r);
        r = input.reduce((acc, curr) => danceMove(curr)(acc), r).join('');
      } while (r != start);

      let d = 1000000000 % patterns.length;

      assert.equal(patterns[d], 'knmdfoijcbpghlea');
    });
  });
});