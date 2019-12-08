import { assert } from 'chai';
import { readFileLines } from '../lib';

describe('2019 - Day 06', function() {

  const input = readFileLines('./input/2019-06.txt');

  const makeMap = (input) => {
    const m = {};

    input.forEach(line => {
      let [inCenter, inOrbit] = line.split(')');
      m[inOrbit] = inCenter;
    });

    return m;
  };

  const countStepsToCOM = (map, start) => {
    let count = 0;
    let planet = start;

    while (planet !== 'COM') {
      count++;
      planet = map[planet];
    }

    return count;
  };

  describe('Part 1', () => {

    it('D directly orbits C and indirectly orbits B and COM, a total of 3 orbits.', () => {
      const m = makeMap('COM)B,B)C,C)D,D)E,E)F,B)G,G)H,D)I,E)J,J)K,K)L'.split(','));

      const orbits = countStepsToCOM(m, 'D');

      assert.equal(orbits, 3);
    });

    it('L directly orbits K and indirectly orbits J, E, D, C, B, and COM, a total of 7 orbits.', () => {
      const m = makeMap('COM)B,B)C,C)D,D)E,E)F,B)G,G)H,D)I,E)J,J)K,K)L'.split(','));

      const orbits = countStepsToCOM(m, 'L');

      assert.equal(orbits, 7);
    });

    it('COM orbits nothing', () => {
      const m = makeMap('COM)B,B)C,C)D,D)E,E)F,B)G,G)H,D)I,E)J,J)K,K)L'.split(','));

      const orbits = countStepsToCOM(m, 'COM');

      assert.equal(orbits, 0);
    });

    it('The total number of direct and indirect orbits in this example is 42.', () => {
      const m = makeMap('COM)B,B)C,C)D,D)E,E)F,B)G,G)H,D)I,E)J,J)K,K)L'.split(','));

      const orbits = Object.getOwnPropertyNames(m).reduce((acc, curr) => acc + countStepsToCOM(m, curr), 0);

      assert.equal(orbits, 42);
    });

    it('What is the total number of direct and indirect orbits in your map data?', () => {
      const m = makeMap(input);

      const orbits = Object.getOwnPropertyNames(m).reduce((acc, curr) => acc + countStepsToCOM(m, curr), 0);

      assert.equal(orbits, 194721);
    });
  });

  const pathToCOM = (map, start) => {
    let path = [];
    let planet = start;

    while (planet !== 'COM') {
      path.push(map[planet]);
      planet = map[planet];
    }

    return path;
  };

  const transferLength = (path1, path2) => {
    let commonCount = 0;

    while (path1[path1.length-1 - commonCount] == path2[path2.length-1 - commonCount]) {
      commonCount++;
    }
    return path1.length - commonCount + path2.length - commonCount;
  };

  describe('Part 2', () => {
    it('In this example, YOU are in orbit around K, and SAN is in orbit around I. To move from K to I, a minimum of 4 orbital transfers are required', () => {
      const m = makeMap('COM)B,B)C,C)D,D)E,E)F,B)G,G)H,D)I,E)J,J)K,K)L,K)YOU,I)SAN'.split(','));

      const you = pathToCOM(m, 'YOU');
      const san = pathToCOM(m, 'SAN');

      assert.sameOrderedMembers(you, ['K', 'J', 'E', 'D', 'C', 'B', 'COM']);
      assert.sameOrderedMembers(san, ['I', 'D', 'C', 'B', 'COM']);

      assert.equal(transferLength(you, san), 4);
    });

    it('What is the minimum number of orbital transfers required to move from the object YOU are orbiting to the object SAN is orbiting? (Between the objects they are orbiting - not between YOU and SAN.)', () => {
      const m = makeMap(input);

      const you = pathToCOM(m, 'YOU');
      const san = pathToCOM(m, 'SAN');

      assert.equal(transferLength(you, san), 316);

    });
  });
});
