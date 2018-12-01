import {readFileLines} from '../lib';
import {assert} from 'chai';

describe('2017 - Day 20', function() {

  let input;
  before(() => input = readFileLines('./input/2017-20.txt'));

  const vectorRegEx = /(\w)=<\s*(-?\d+),\s*(-?\d+),\s*(-?\d+)>/;
  const parseVector = (vector) => {
    let [,name, x, y, z] = vector.match(vectorRegEx);

    let result = {};
    result[name] = [parseInt(x, 10), parseInt(y, 10), parseInt(z)];

    return result;
  };

  const parse = (input) =>
    input
      .map(line => line
        .split(', ')
        .map(parseVector)
        .reduce((acc, curr) => Object.assign({}, acc, curr))
      );

  const example = [
    'p=< 3,0,0>, v=< 2,0,0>, a=<-1,0,0>',
    'p=< 4,0,0>, v=< 0,0,0>, a=<-2,0,0>'
  ];

  const example2 = [
    'p=<-6,0,0>, v=< 3,0,0>, a=< 0,0,0>',
    'p=<-4,0,0>, v=< 2,0,0>, a=< 0,0,0>',
    'p=<-2,0,0>, v=< 1,0,0>, a=< 0,0,0>',
    'p=< 3,0,0>, v=<-1,0,0>, a=< 0,0,0>',
  ];

  const particleFactor = (particle) => [
    particle.v[0]*particle.a[0],
    particle.v[1]*particle.a[1],
    particle.v[2]*particle.a[2],
  ];

  const magnitude = (vector) => Math.abs(vector[0]) + Math.abs(vector[1]) + Math.abs(vector[2]);

  const distance = (particle) => magnitude(particle.p);

  const move = (particle) => {
    let velUpdated = Object.assign(particle, {
      v: [
        particle.v[0] + particle.a[0],
        particle.v[1] + particle.a[1],
        particle.v[2] + particle.a[2],
      ]
    });

    return Object.assign(velUpdated, {
      p: [
        particle.p[0] + velUpdated.v[0],
        particle.p[1] + velUpdated.v[1],
        particle.p[2] + velUpdated.v[2],
      ]
    });
  };

  const prepare = (particle, idx) =>
    Object.assign(particle,
      {
        factor: particleFactor(particle),
        accMagnitude: magnitude(particle.a),
        velMagnitude: magnitude(particle.v),
        distance: distance(particle),
        away: distance(particle) < distance(move(particle)),
        id: idx
      }
    );

  const magnitudeThenDistance = (particle1, particle2) => particle1.accMagnitude - particle2.accMagnitude || distance(particle1) - distance(particle2);

  const magnitudeThenVelocityThenDistance = (particle1, particle2) => {
    let dAcc = particle1.accMagnitude - particle2.accMagnitude;
    let dVel = particle1.velMagnitude - particle2.velMagnitude;
    let dPos = particle1.distance - particle2.distance;

    let order = dAcc == 0
      ? (dVel == 0
        ? dPos
        : dVel)
      : dAcc;

    return order;
  };

  describe('Part 1', function() {

    it('parses input', function() {
      let r = parse(example);

      assert.deepEqual(r[0], {
        p: [3,0,0],
        v: [2,0,0],
        a: [-1,0,0]
      });
    });

    it('assignes acc*vel flag', function() {
      let r = parse(example);

      let particles = r.map(prepare);

      assert.sameOrderedMembers(particles[0].factor, [-2, 0, 0]);
    });

    it('assigns away/toward flag', function() {
      let r = parse(example);

      let particles = r.map(prepare);

      assert.sameOrderedMembers(particles[0].factor, [-2, 0, 0]);
    });

    it('sorts by slowest movement toward', function() {
      let r = parse(example)
        .map(prepare)
        .sort(magnitudeThenVelocityThenDistance);

      assert.equal(r[0].id, 0);
      assert.equal(r[1].id, 1);
    });

    it('Which particle will stay closest to position <0,0,0> in the long term? => 344', function(){
      let r = parse(input)
        .map(prepare)
        .sort(magnitudeThenVelocityThenDistance);

      assert.equal(r[0].id, 344);
    });
  });

  describe('Part 2', function() {
    it('How many particles are left after all collisions are resolved?', function() {
      let r = parse(input);

      for (var i = 0; i < 1000; i++) {
        let groups = r
          .map(move)
          .reduce((acc, curr) => {
            let pos = `(${curr.p[0]}:${curr.p[1]}:${curr.p[2]})`;
            acc[pos] = [...(acc[pos]||[]), curr];
            return acc;
          }, {});

        r = [];

        for (let pos in groups) {
          if (groups[pos].length == 1) {
            //console.log(`keeping particle at ${pos}`);
            r.push(groups[pos][0]);
          }
        }
      }

      assert.equal(r.length, 404);
    });
  });
});
