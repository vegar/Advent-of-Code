import { readFileLines } from '../lib';
import { assert } from 'chai';

describe('2017 - Day 13', function() {

  const position = ({range}, picoSec) => {
    let tournaround = range * 2 - 2;
    let position = picoSec % tournaround;

    if (position >= range)
    {
      position = range - (position - range+1) -1;
    }

    return position;
  };

  const caughtAt = (layers, delay) => {
    return layers
      .reduce((acc, curr) => {
        let p = position(curr, curr.layer + delay);
        if (p == 0) {
          acc.push(curr);
        }
        return acc;
      }, []);
  };

  const isCaught = (layers, delay) => {
    return !layers
      .every(scanner => position(scanner, scanner.layer + delay) > 0);
  };

  const severity = (layers, delay) => {
    return caughtAt(layers, delay)
      .reduce((acc, curr) => acc += (curr.layer*curr.range), 0);
  };

  const parseScanner = scanner =>  {
    let [layer, range] = scanner.split(': ');
    return { layer: Number(layer), range: Number(range) };
  };

  describe('Part 1', function() {

    let scannerPositions = [0, 1, 2, 1, 0, 1, 2, 1, 0, 1, 2, 1];
    scannerPositions.forEach((pos, idx) => {
      it(`Expect scanner [0:3] at pico sec ${idx} to be ${pos}`, function(){
        let p = position({layer: 0, range: 3}, idx);

        assert.equal(p, pos);
      });
    });

    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1].forEach((pos, idx) => {
      it(`Expect scanner [1:2] at pico sec ${idx} to be ${pos}`, function(){
        let p = position({layer: 1, range: 2}, idx);

        assert.equal(p, pos);
      });
    });

    [0, 1, 2, 3, 2, 1, 0, 1, 2, 3, 2, 1, 0].forEach((pos, idx) => {
      it(`Expect scanner [4:4] at pico sec ${idx} to be ${pos}`, function(){
        let p = position({layer: 4, range: 4}, idx);

        assert.equal(p, pos);
      });
    });

    it('In the example above, the trip severity is 0*3 + 6*4 = 24.', function(){
      let layers = ['0: 3', '1: 2', '4: 4', '6: 4']
        .map(parseScanner);

      let s = severity(layers, 0);

      assert.equal(s, 24);
    });

    it('Given the details of the firewall you\'ve recorded, if you leave immediately, what is the severity of your whole trip? --> 1624', function() {
      let layers = readFileLines('./input/2017-13.txt')
        .map(parseScanner);

      let s = severity(layers, 0);

      assert.equal(s, 1624);
    });
  });

  describe('Part 2', function() {
    it('should delay 10 picosec to avoid getting caught', function() {
      let layers = ['0: 3', '1: 2', '4: 4', '6: 4']
        .map(parseScanner);

    let delay = 0;
      while (isCaught(layers, delay) == true) {
        delay++;
      }      assert.equal(delay, 10);
    });

    it('What is the fewest number of picoseconds that you need to delay the packet to pass through the firewall without being caught? --> 3923436', function() {
      this.timeout(1000000);

      let layers = readFileLines('./input/2017-13.txt')
        .map(parseScanner);

      let delay = 0;
      while (isCaught(layers, delay) == true) {
        delay++;
      }

      assert.equal(delay, 3923436);
    });
  });
});