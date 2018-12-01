import {lines} from '../lib';
import fs from 'fs';
import {assert} from 'chai';

describe('2017 - Day 19', function() {

  const exampleInput = [
    '     |          ',
    '     |  +--+    ',
    '     A  |  C    ',
    ' F---|----E|--+ ',
    '     |  |  |  D ',
    '     +B-+  +--+ '
  ].join('\n');

  const parse = (input) => lines(input).map(l => l.split(''));

  const findStart = (maze) => {
    return { x: maze[0].indexOf('|'), y: 0, dir: 'down' };
  };

  const exampleMaze = parse(exampleInput);

  const directions = {
    down: ({x, y}) => { return {x, y: y+1}; },
    up: ({x, y}) => { return {x, y: y-1}; },
    right: ({x, y}) => { return {x: x+1, y}; },
    left: ({x, y}) => { return {x: x-1, y}; },
  };

  const otherDirections = {
    down: ['right', 'left'],
    up: ['right', 'left'],
    right: ['up', 'down'],
    left: ['up', 'down']
  };

  const outOfBoundsMaze = (maze) => ({x,y}) => y < 0 || y >= maze.length || x < 0 || x > maze[y].length;

  const nextDirectionMaze = (maze) => ({x, y}, currentDirection) => {
    if (maze[y][x] != '+') {
      if (outOfBoundsMaze(maze)(directions[currentDirection]({x, y})) || maze[y][x] == ' ')
        return 'stop';
      return currentDirection;
    }

    let first = otherDirections[currentDirection][0];
    let second = otherDirections[currentDirection][1];

    let f = directions[first]({x, y});
    //let s = directions[second]({x, y});

    //console.log(`  possible next: ${first} =>  ${f.x}:${f.y} => ${maze[f.y][f.x]}`);
    //console.log(`  possible next: ${second} =>  ${s.x}:${s.y} => ${maze[s.y][s.x]}`);

    //console.log(`${++turns}  finding next direction from ${x}:${y}=${maze[y][x]}`);

    return (outOfBoundsMaze(maze)(f) || maze[f.y][f.x] == ' ') ? second : first;
  };

  const getLetter = (char) => /[A-Z]/.test(char) ? [char] : [];

  const walkMaze = (maze) => (pos) => {
//      console.log(`walking ${pos.dir} from ${pos.x}:${pos.y}`);
    let newPos = directions[pos.dir](pos);
    let newDirection = nextDirectionMaze(maze)(newPos, pos.dir);
//      console.log(`  new position = ${newPos.x}:${newPos.y}, next round will be ${newDirection}`);
    let letter = getLetter(maze[newPos.y][newPos.x]);
    return Object.assign({}, newPos, {dir: newDirection, letters: [...pos.letters || [], ...letter]});
  };

  describe('Part 1', function(){

    it('finds start point', function() {
      let {x, y} = findStart(exampleMaze);

      assert.equal(x, 5);
      assert.equal(y, 0);
    });

    it('finds its way down', function() {
      let start = {x: 10, y: 1, dir: 'right'};

      let walk = walkMaze(exampleMaze);
      let next = walk(start);

      assert.equal(next.x, 11);
      assert.equal(next.y, 1);
      assert.equal(next.dir, 'down');
    });

    it('follows line to end', function() {
      let walk = walkMaze(exampleMaze);
      let start = {x: 5, y: 0, dir: 'down'};

      while (start.dir != 'stop') {
        start = walk(start);
      }

      assert.equal(start.x, 0);
      assert.equal(start.y, 3);
      assert.equal(start.dir, 'stop');
    });

    it('Following the path to the end, the letters it sees on its path are ABCDEF.', function() {
      let walk = walkMaze(exampleMaze);
      let start = {x: 5, y: 0, dir: 'down'};

      while (start.dir != 'stop') {
        start = walk(start);
      }

      assert.equal(start.x, 0);
      assert.equal(start.y, 3);
      assert.equal(start.letters.join(''), 'ABCDEF');
    });

    it('What letters will it see (in the order it would see them) if it follows the path? --> GINOWKYXH', function() {
      let input = parse(fs.readFileSync('./input/2017-19.txt').toString());
      let walk = walkMaze(input);
      let start = findStart(input);

      while (start.dir != 'stop') {
        start = walk(start);
      }

      assert.equal(start.letters.join(''), 'GINOWKYXH');
    });

  });

  describe('Part 2', function() {
    it('This would result in a total of 38 steps.', function() {
      let walk = walkMaze(exampleMaze);
      let start = {x: 5, y: 0, dir: 'down'};

      let steps = 0;
      while (start.dir != 'stop') {
        start = walk(start);
        steps++;
      }

      assert.equal(steps, 38);
    });

    it('How many steps does the packet need to go? --> 16636', function() {
      let input = parse(fs.readFileSync('./input/2017-19.txt').toString());
      let walk = walkMaze(input);
      let start = findStart(input);

      let steps = 0;
      while (start.dir != 'stop') {
        start = walk(start);
        steps++;
      }

      assert.equal(steps, 16636);
    });

  });
});