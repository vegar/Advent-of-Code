import {readFileLines } from '../lib';
import {assert} from 'chai';

describe('2019 - Day 12', function(){
  const input = readFileLines('./input/2019-12.txt');

  function* pairs() {
    yield [0,1];
    yield [0,2];
    yield [0,3];
    yield [1,2];
    yield [1,3];
    yield [2,3];
  }

  const updateVelocity = (moon1, moon2, xyz) => {
    const diff = moon1.position[xyz] - moon2.position[xyz];

    if (diff > 0) {
      moon1.velocity[xyz] -= 1;
      moon2.velocity[xyz] += 1;
    } else if (diff < 0) {
      moon1.velocity[xyz] += 1;
      moon2.velocity[xyz] -= 1;
    }
  };

  const simulate = (moons) => {

    for (let pair of pairs()) {
      updateVelocity(moons[pair[0]], moons[pair[1]], 'x');
      updateVelocity(moons[pair[0]], moons[pair[1]], 'y');
      updateVelocity(moons[pair[0]], moons[pair[1]], 'z');
    }

    moons.forEach(moon => {
      moon.position.x += moon.velocity.x;
      moon.position.y += moon.velocity.y;
      moon.position.z += moon.velocity.z;

      moon.energy = {
        pot: Math.abs(moon.position.x) + Math.abs(moon.position.y) + Math.abs(moon.position.z),
        kin: Math.abs(moon.velocity.x) + Math.abs(moon.velocity.y) + Math.abs(moon.velocity.z),
        total: (Math.abs(moon.position.x) + Math.abs(moon.position.y) + Math.abs(moon.position.z))
             * (Math.abs(moon.velocity.x) + Math.abs(moon.velocity.y) + Math.abs(moon.velocity.z)),
      };
    });
  };

  describe('Part 1', () => {

    it('First example', () => {
      const moons = [
        { position: { x: -1, y: 0, z: 2 }, velocity: { x: 0, y: 0, z: 0} },
        { position: { x: 2, y: -10, z: -7 }, velocity: { x: 0, y: 0, z: 0} },
        { position: { x: 4, y: -8, z: 8 }, velocity: { x: 0, y: 0, z: 0} },
        { position: { x: 3, y: 5, z: -1 }, velocity: { x: 0, y: 0, z: 0} },
      ];

      for (let x = 0; x < 10; x++)
        simulate(moons);

      const totalEnergy = moons.reduce((prev, curr) => prev + curr.energy.total, 0);

      assert.equal(totalEnergy, 179);
    });


    it('What is the total energy in the system after simulating the moons given in your scan for 1000 steps?', () => {
      const moons = [
        { position: { x: -10, y:-10, z:-13 }, velocity: { x: 0, y: 0, z: 0} },
        { position: { x:   5, y:  5, z: -9 }, velocity: { x: 0, y: 0, z: 0} },
        { position: { x:   3, y:  8, z:-16 }, velocity: { x: 0, y: 0, z: 0} },
        { position: { x:   1, y:  3, z: -3 }, velocity: { x: 0, y: 0, z: 0} },
      ];

      for (let x = 0; x < 1000; x++)
        simulate(moons);

      const totalEnergy = moons.reduce((prev, curr) => prev + curr.energy.total, 0);

      assert.equal(totalEnergy, 6678);
    });
  });

  describe('Part 2', () => {
    const hash = (moons) => {

      return moons.reduce((h, curr) => {
        return {
          x: (h.x || '') + ',' + curr.position.x + ',' + curr.velocity.x,
          y: (h.y || '') + ',' + curr.position.y + ',' + curr.velocity.y,
          z: (h.z || '') + ',' + curr.position.z + ',' + curr.velocity.z,
        };
      }, {});
    };

    function gcd2(a, b) {
      // Greatest common divisor of 2 integers
      if(!b) return b===0 ? a : NaN;
      return gcd2(b, a%b);
    }
    function gcd(array) {
      // Greatest common divisor of a list of integers
      var n = 0;
      for(var i=0; i<array.length; ++i)
        n = gcd2(array[i], n);
      return n;
    }
    function lcm2(a, b) {
      // Least common multiple of 2 integers
      return a*b / gcd2(a, b);
    }
    function lcm(array) {
      // Least common multiple of a list of integers
      var n = 1;
      for(var i=0; i<array.length; ++i)
        n = lcm2(array[i], n);
      return n;
    }

    it('First example', () => {
      const moons = [
        { position: { x: -1, y: 0, z: 2 }, velocity: { x: 0, y: 0, z: 0} },
        { position: { x: 2, y: -10, z: -7 }, velocity: { x: 0, y: 0, z: 0} },
        { position: { x: 4, y: -8, z: 8 }, velocity: { x: 0, y: 0, z: 0} },
        { position: { x: 3, y: 5, z: -1 }, velocity: { x: 0, y: 0, z: 0} },
      ];

      const firstHash = hash(moons);
      let time = 0;
      while(true){
        simulate(moons);
        time++;
        const h = hash(moons);
        if (firstHash.x === h.x && !firstHash.xt) firstHash.xt = time;
        if (firstHash.y === h.y && !firstHash.yt) firstHash.yt = time;
        if (firstHash.z === h.z && !firstHash.zt) firstHash.zt = time;

        if (firstHash.xt && firstHash.yt && firstHash.zt) break;
      }

      let l = lcm([firstHash.xt, firstHash.yt, firstHash.zt]);

      assert.equal(l, 2772);
    });

    it('How many steps does it take to reach the first state that exactly matches a previous state?', () => {
      const moons = [
        { position: { x: -10, y:-10, z:-13 }, velocity: { x: 0, y: 0, z: 0} },
        { position: { x:   5, y:  5, z: -9 }, velocity: { x: 0, y: 0, z: 0} },
        { position: { x:   3, y:  8, z:-16 }, velocity: { x: 0, y: 0, z: 0} },
        { position: { x:   1, y:  3, z: -3 }, velocity: { x: 0, y: 0, z: 0} },
      ];

      const firstHash = hash(moons);
      let time = 0;
      while(true){
        simulate(moons);
        time++;
        const h = hash(moons);
        if (firstHash.x === h.x && !firstHash.xt) firstHash.xt = time;
        if (firstHash.y === h.y && !firstHash.yt) firstHash.yt = time;
        if (firstHash.z === h.z && !firstHash.zt) firstHash.zt = time;

        if (firstHash.xt && firstHash.yt && firstHash.zt) break;
      }

      let l = lcm([firstHash.xt, firstHash.yt, firstHash.zt]);

      assert.equal(l, 496734501382552);
    });
  });
});
