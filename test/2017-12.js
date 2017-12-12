import { readFile, lines } from '../lib';
import { assert } from 'chai';

describe('2017 - Day 12', function() {

  let input;
  before(() => input = readFile('./input/2017-12.txt').trim());

  const graph = (input) => {
    let g = [];

    lines(input).forEach(line => {
      let [, vertice, neighbours] = line.match(/(\d*) <-> (.*)/);

      g[vertice] = neighbours.split(', ').map(v => Number(v));
    });

    return g;
  };

  const traverse = (graph, start, visited) => {
    visited = visited || new Set();
    visited.add(start);
    graph[start].forEach(v => {
      if (!visited.has(v)) {
        traverse(graph, v, visited);
      }
    });

    return visited;
  };

  const exampleGraph =
`0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`;


  describe('Part 1', function() {

    it('Therefore, a total of 6 programs are in this group;', function() {
      let g = graph(exampleGraph);
      let visited = traverse(g, 0);

      assert.equal(visited.size, 6);
    });

    it('How many programs are in the group that contains program ID 0? --> 288', function() {
      let g = graph(input);
      let visited = traverse(g, 0);

      assert.equal(visited.size, 288);
    });
  });

  describe('Part 2', function() {

    it('How many groups are there in total? --> 211', function() {
      let g = graph(input);
      let visited = new Set();

      let groups = 0;
      g.forEach((v, idx) => {
        if (!visited.has(idx))
        {
          traverse(g, idx, visited);
          groups++;
        }
      });

      assert.equal(groups, 211);
    });
  });

});