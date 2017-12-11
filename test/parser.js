import {parser} from '../lib';

let assert = require('chai').assert;

describe('parser', function() {
  it('parses b inc 5 if a > 1', function() {
    let parsed = parser('b inc 5 if a > 1');

    assert.deepEqual(parsed, {
      addr: 'b',
      op: 'inc',
      value: 5,
      ifAddr: 'a',
      ifOp: '>',
      ifValue: 1
    });

  });

  it('parses c inc -20 if c == 10', function() {
    let parsed = parser('c inc -20 if c == 10');

    assert.deepEqual(parsed, {
      addr: 'c',
      op: 'inc',
      value: -20,
      ifAddr: 'c',
      ifOp: '==',
      ifValue: 10
    });

  });

});