import {coordToIndex, adjecent} from '../lib';

let assert = require('chai').assert;

describe('adjecent', function() {
  it('adjecent returns all adjecent coords', function(){
    let adj = adjecent({ x:0, y:0});

    assert.sameDeepMembers(
      [
        {x: -1, y:  1}, {x: 0, y:  1}, {x: 1, y:  1},
        {x: -1, y:  0},                {x: 1, y:  0},
        {x: -1, y: -1}, {x: 0, y: -1}, {x: 1, y: -1},
      ],
      adj);
  });

});

describe('coordToIndex', function() {
  let testCases = [
    {expected: 1, coord: {x: 0, y: 0}},
    {expected: 2, coord: {x: 1, y: 0}},
    {expected: 3, coord: {x: 1, y: 1}},
    {expected: 4, coord: {x: 0, y: 1}},
  ];

  testCases.forEach(function(testCase) {
    it(`index for ${testCase.coord.x}:${testCase.coord.y} should be ${testCase.expected}`, function(){
      assert.equal(testCase.expected, coordToIndex(testCase.coord));
    });
  });

});
