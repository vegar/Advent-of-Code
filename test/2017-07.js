import {lines, readFileLines, buildTree, findRoot, summarizeNode, findUnbalanced} from '../lib';

let assert = require('chai').assert;

describe('2017 - Day 7', function() {

    const example =
`pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)`;


  describe('Part 1', function() {

    it('In this example, tknk is at the bottom of the tower', function() {

      let nodes = buildTree(lines(example));

      let root = findRoot(nodes);

      assert.equal('tknk', root);
    });

    it('What is the name of the bottom program --> ??', function() {
      let input = readFileLines('./input/2017-07.txt');

      let nodes = buildTree(input);

      let root = findRoot(nodes);

      assert.equal('fbgguv', root);
    });

  });

  describe('Part 2', function() {

    it('Even though the nodes above ugml are balanced, ugml itself is too heavy: it needs to be 8 units lighter for its stack to weigh 243 and keep the towers balanced. If this change were made, its weight would be 60.', function(){
      let nodes = buildTree(lines(example));
      let root = findRoot(nodes);

      summarizeNode(nodes, root);

      let unbalanced = findUnbalanced(nodes);

      assert.equal(unbalanced.sinner.app, 'ugml');
      assert.equal(unbalanced.corrected, 60);
    });

    it('Given that exactly one program is the wrong weight, what would its weight need to be to balance the entire tower? -> 1864', function(){
      let input = readFileLines('./input/2017-07.txt');
      let nodes = buildTree(input);
      let root = findRoot(nodes);

      summarizeNode(nodes, root);

      let unbalanced = findUnbalanced(nodes);

      assert.equal(unbalanced.corrected, 1864);
    });
  });
});