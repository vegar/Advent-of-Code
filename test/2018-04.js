import {readFileLines, lines} from '../lib';

let assert = require('assert');

describe('2018 - Day 4', function() {

  let input;
  before(() => input = readFileLines('./input/2018-04.txt'));

  describe('Part 1', function() {

    it('Find the guard that has the most minutes asleep. What minute does that guard spend asleep the most?', function() {
      const regGuard = /:(\d\d).*(#(\d+)|falls|wakes)/;
      let currentGuard = undefined;
      let result = {};
      input
        .sort()
        .forEach(line => {
          const match = line.match(regGuard);
          if (match[2] === 'falls') {
            result[currentGuard].startSleep = match[1];
          }
          else if (match[2] === 'wakes') {
            let awakes = match[1];
            for (let i = result[currentGuard].startSleep; i < awakes; i++)
              result[currentGuard].minutes[i] = (result[currentGuard].minutes[i] || 0) + 1;

            result[currentGuard].startSleep = undefined;

            result[currentGuard].sum = result[currentGuard].minutes.reduce((acc, curr) => (acc+curr));
          }
          else {
            currentGuard = match[3];

            if (!result[currentGuard]) {
              result[currentGuard] = {
                minutes: new Array(60),
                sum: 0
              };
            }
          }
        });


      let r = Object.entries(result).reduce((acc, curr) => curr[1].sum > acc[1].sum ? curr : acc);

      let minute = r[1].minutes.reduce((acc, curr, idx) => (curr > acc.max ? { max: curr, idx} : acc),  {max: -1, idx: -1});

      assert.equal(r[0]*minute.idx, 84834);
    });
  });

  describe('Part 2', function() {

    it('Of all guards, which guard is most frequently asleep on the same minute?', function() {
      const regGuard = /:(\d\d).*(#(\d+)|falls|wakes)/;
      let currentGuard = undefined;
      let result = {};
      input
        .sort()
        .forEach(line => {
          const match = line.match(regGuard);
          if (match[2] === 'falls') {
            result[currentGuard].startSleep = match[1];
          }
          else if (match[2] === 'wakes') {
            let awakes = match[1];
            for (let i = result[currentGuard].startSleep; i < awakes; i++)
              result[currentGuard].minutes[i] = (result[currentGuard].minutes[i] || 0) + 1;

            result[currentGuard].startSleep = undefined;

            result[currentGuard].max = result[currentGuard].minutes.reduce((acc, curr, idx, minutes) => (curr > (minutes[acc] || -1) ? idx : acc), -1);
          }
          else {
            currentGuard = match[3];

            if (!result[currentGuard]) {
              result[currentGuard] = {
                minutes: new Array(60),
                max: 0
              };
            }
          }
        });

      var guard = Object.entries(result).reduce((acc, curr) => {
        if (!acc[1].max) return curr;

        return curr[1].minutes[curr[1].max] > acc[1].minutes[acc[1].max] ? curr : acc;
      });

      //console.log(JSON.stringify(guard));
      assert.equal(guard[0] * guard[1].max, 53427);
    });
  });
});
