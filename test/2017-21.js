import {assert} from 'chai';

import {readFileLines} from '../lib';

describe('2017 - Day 21', function() {

  let inputRules;
  before(() => inputRules = readFileLines('./input/2017-21.txt'));

  let exampleInput = [
    '../.# => ##./#../...',
    '.#./..#/### => #..#/..../..../#..#',
  ];

  function* permute2(parts) {
    // '01'  rotasjoner   => '2031', '3210', '1302'
    // '23'  flips        => '1032', '2301'


    //rotations
    yield parts[2] + parts[0] + parts[3] + parts[1];
    yield parts[3] + parts[2] + parts[1] + parts[0];
    yield parts[1] + parts[3] + parts[0] + parts[2];

    //flip
    yield parts[1] + parts[0] + parts[3] + parts[2];

    yield parts[2] + parts[3] + parts[0] + parts[1];
    yield parts[3] + parts[1] + parts[2] + parts[0];
    yield parts[0] + parts[2] + parts[1] + parts[3];
  }

  function* permute3(parts) {
    // '012'    rotasjoner => 630741852, 876543210, 125048367,
    // '345'    flips      => 210543876, 678345210
    // '678'    r-flip     => 852741630, 036147258


    //  630  876  258
    //  741  543  147
    //  852  210  036

    //rotations
    yield parts[6] + parts[3] + parts[0] + parts[7] + parts[4] + parts[1] + parts[8] + parts[5] + parts[2];
    yield parts[8] + parts[7] + parts[6] + parts[5] + parts[4] + parts[3] + parts[2] + parts[1] + parts[0];
    yield parts[2] + parts[5] + parts[8] + parts[1] + parts[4] + parts[7] + parts[0] + parts[3] + parts[6];

    //flip
    yield parts[2] + parts[1] + parts[0] + parts[5] + parts[4] + parts[3] + parts[8] + parts[7] + parts[6];

    yield parts[6] + parts[7] + parts[8] + parts[3] + parts[4] + parts[5] + parts[2] + parts[1] + parts[0];
    yield parts[8] + parts[5] + parts[2] + parts[7] + parts[4] + parts[1] + parts[6] + parts[3] + parts[0];
    yield parts[0] + parts[3] + parts[6] + parts[1] + parts[4] + parts[7] + parts[2] + parts[5] + parts[8];

  }

  function* permute(rule) {
    let parts = rule.split('/').join('');

    //initial
    yield parts;

    parts.length == 4
      ? yield* permute2(parts)
      : yield* permute3(parts);
  }

  const parse = (input) => input.reduce((acc, curr) => {
    let [,rule, newPattern] = curr.match(/([./#]+)\s=>\s([./#]*)/);
    newPattern = newPattern.split('/').join('');
    let permutations = [...permute(rule)];
    permutations.forEach(perm => acc[perm] = newPattern);
    return acc;
  }, {});


  const deconstruct = (input) => {
    let length = Math.sqrt(input.length);
    let groupSize = length % 2 == 0 ? 2 : 3;

    let output = [];
    for (var i = 0; i < length; i+=groupSize) {
      for (var j = 0; j < length; j+=groupSize) {
        let group = '';
        for (var x = 0; x < groupSize; x++) {
          let offset = j + (length*(i+x));
          let seg = input.substr(offset, groupSize);
          group += seg;
        }
        output.push(group);
      }
    }

    return output;
  };

  const construct = (input) => {
    let groupSize = Math.sqrt(input[0].length);
    let groupsPrRow = Math.sqrt(input.length);

    let output = [];
    for (var row = 0; row < groupsPrRow; row++) {
      for (var groupLine = 0; groupLine < groupSize; groupLine++) {
        for (var col = 0; col < groupsPrRow; col++) {
          let group = col + groupsPrRow*row;
          let offset = groupLine*groupSize;
          let seg = input[group].substr(offset, groupSize);

          output.push(seg);
        }
      }
    }

    return output.join('');
  };

  const enhance = (input, rules) => {
    let groups = deconstruct(input);

    let enhanced = groups.map(group => rules[group] || (console.log(`no rule for ${group}`)));

    return construct(enhanced);;
  };

  describe('Part 1', function() {
    it('parses rules', function() {
      let rules = parse(exampleInput);


      assert.equal(Object.keys(rules).length, 12);
    });

    it('deconstruct 2x2', function() {
      let input = '#..#'
                + '....'
                + '....'
                + '#..#'
                ;

      let output = deconstruct(input);

      assert.sameOrderedMembers(output, ['#...','.#..','..#.','...#']);
    });

    it('deconstruct 3x3', function() {
      let input = '##.##.##.'
                + '#..#..#..'
                + '.........'
                + '##.##.##.'
                + '#..#..#..'
                + '.........'
                + '##.##.##.'
                + '#..#..#..'
                + '.........'
                ;

      let output = deconstruct(input);

      assert.sameOrderedMembers(output, ['##.#.....','##.#.....','##.#.....','##.#.....','##.#.....','##.#.....','##.#.....','##.#.....','##.#.....']);
    });

    it('construct 2x2', function() {
      let input = ['#...','.#..','..#.','...#'];

      let output = construct(input);

      assert.equal(output, '#..#'
                         + '....'
                         + '....'
                         + '#..#');
    });

    it('construct 3x3', function() {
      let input = ['##.#.....','##.#.....','##.#.....','##.#.....','##.#.....','##.#.....','##.#.....','##.#.....','##.#.....'];

      let output = construct(input);

      assert.equal(output, '##.##.##.'
                         + '#..#..#..'
                         + '.........'
                         + '##.##.##.'
                         + '#..#..#..'
                         + '.........'
                         + '##.##.##.'
                         + '#..#..#..'
                         + '.........');
    });

    it('enhances', function() {
      let rules = parse(exampleInput);
      let input = '.#...####';

      let output = enhance(input, rules);

      assert.equal(output, '#..#........#..#');
    });

    it('How many pixels stay on after 5 iterations?', function() {
      let rules = parse(inputRules);

      let start = '.#...####';

      for (var i = 0; i<5; i++) {
        start = enhance(start, rules);
      }

      let bits = start.split('').reduce((acc, curr) => {
        return curr === '#' ? ++acc : acc;
      }, 0);


      assert.equal(bits, 136);

    });
  });

  describe('Part 2', function() {
    it('How many pixels stay on after 18 iterations?', function() {
      let rules = parse(inputRules);

      let start = '.#...####';

      for (var i = 0; i<18; i++) {
        start = enhance(start, rules);
      }

      let bits = start.split('').reduce((acc, curr) => {
        return curr === '#' ? ++acc : acc;
      }, 0);


      assert.equal(bits, 1911767);
    });
  });
});
