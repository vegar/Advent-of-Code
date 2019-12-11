import {readFile, lines, distance} from '../lib';
import {assert} from 'chai';

describe('2019 - Day 10', function(){
  const input = readFile('./input/2019-10.txt');

  const toMap = (buffer) => lines(buffer).map(l => l.split(''));

  function gcd(x, y) {
    if ((typeof x !== 'number') || (typeof y !== 'number'))
      return false;
    x = Math.abs(x);
    y = Math.abs(y);
    while(y) {
      var t = y;
      y = x % y;
      x = t;
    }
    return x;
  }

  const getSlop = (x1, y1, x2, y2) => {
    let x = x2-x1;
    let y = y2-y1;

    let g = gcd(x, y);

    return {x: x / g, y: y / g};
  };

  const astroidesInSight= (map, x, y) => {
    const checked = new Map();
    for (var yy = 0; yy < map.length; yy++) {
      for (var xx = 0; xx < map[0].length; xx++) {
        if (yy == y && xx == x) continue;
        if (map[yy][xx] != '.')
        {
          const slope = getSlop(xx, yy, x, y);
          checked.set(JSON.stringify(slope), true);
        }
      }
    }

    return checked.size;
  };

  const findBest = (map) => {
    let best = 0;
    let bestx = 0;
    let besty = 0;

    map.forEach((row, y) => {
      row.forEach((a, x) => {
        if (a == '#') {
          let count = astroidesInSight(map, x, y);

          if (count > best) {
            best = count;
            bestx = x;
            besty = y;
          }
        }
      });
    });

    return {x: bestx, y: besty, count: best};
  };


  describe('Part 1', () => {
    const example1 = `.#..#
.....
#####
....#
...##`;

    it('split input into 2d array', () => {
      const map = toMap(example1);

      assert.equal(map.length, 5);
      map.forEach(r => assert.equal(r.length, 5));

      assert.equal(map[0][1], '#');
      assert.equal(map[0][4], '#');
    });

    it('The best location for a new monitoring station on this map is the highlighted asteroid at 3,4 because it can detect 8 asteroids', () => {
      const map = toMap(example1);

      const r = findBest(map);

      assert.equal(r.count, 8);
      assert.equal(r.x, 3);
      assert.equal(r.y, 4);
    });

    it('Best is 5,8 with 33 other asteroids detected:', () => {
      const map = toMap(`......#.#.
#..#.#....
..#######.
.#.#.###..
.#..#.....
..#....#.#
#..#....#.
.##.#..###
##...#..#.
.#....####`);

      const r = findBest(map);

      assert.equal(r.count, 33);
      assert.equal(r.x, 5);
      assert.equal(r.y, 8);
    });

    it('Best is 11,13 with 210 other asteroids detected:', () => {
      const map = toMap(`.#..##.###...#######
##.############..##.
.#.######.########.#
.###.#######.####.#.
#####.##.#.##.###.##
..#####..#.#########
####################
#.####....###.#.#.##
##.#################
#####.##.###..####..
..######..##.#######
####.##.####...##..#
.#####..#.######.###
##...#.##########...
#.##########.#######
.####.#.###.###.#.##
....##.##.###..#####
.#.#.###########.###
#.#.#.#####.####.###
###.##.####.##.#..##`);

      const r = findBest(map);

      assert.equal(r.count, 210);
      assert.equal(r.x, 11);
      assert.equal(r.y, 13);
    });

    it('Find the best location for a new monitoring station. How many other asteroids can be detected from that location?', () => {
      const map = toMap(input);


      const r = findBest(map);

      assert.equal(r.count, 299);
      assert.equal(r.x, 26);
      assert.equal(r.y, 29);
    });
  });

  const mapSlopeAndDistance = (map, x, y) => {
    const result = [];
    for (var yy = 0; yy < map.length; yy++) {
      for (var xx = 0; xx < map[0].length; xx++) {
        if (yy == y && xx == x) continue;
        if (map[yy][xx] != '.')
        {
          const slope = getSlop(x, y, xx, yy);

          let deg = (Math.atan2(-1*(yy-y),xx-x) * 180 / Math.PI);
          deg = deg < 0 ? deg*-1 + 180 : 180 - deg;
          if (deg < 90) deg += 360;
          deg -= 90;
          result.push({
            x: xx,
            y: yy,
            slope: slope,
            distance: distance([xx, yy], {x, y}),
            deg: deg
          });
        }
      }
    }

    return result;
  };

  function* traverse() {
    let deg = 90;
    const toRad = (deg) => deg * Math. PI/180;
    let prevX = undefined;
    let prevY = undefined;
    let x = undefined;
    let y = undefined;
    let prevSlop = {x: undefined, y: undefined};
    let slop = {x: undefined, y: undefined};

    while(true) {
      while (prevSlop.x == slop.x && prevSlop.y == slop.y){

        while(prevX == x && prevY == y) {
          x = Math.floor(100*Math.cos(toRad(deg)));
          y = Math.floor(100*Math.sin(toRad(deg)));
          deg += 1;
        }

        slop = getSlop(0, 0, x, y);
        //console.log(`x: ${x}, y: ${y} -> slope: ${JSON.stringify(slop)}`);
      }

      yield(slop);

      prevX = x;
      prevY = y;
      prevSlop = {x: slop.x, y: slop.y};
    }
  }

  function* traverseOuter(map, x, y) {
    let currX = x-1;

    while(true) {
      let currY = 0;
      currX += 1;
      while (currX < map[0].length) {
        yield {x: currX, y: currY};
        currX++;
      }

      currX = map[0].length - 1;
      currY = 1;
      while (currY < map.length) {
        yield {x: currX, y: currY};
        currY++;
      }

      currY = map.length - 1;
      currX = map[currY].length -2;
      while (currX >= 0 ) {
        yield {x: currX, y: currY};
        currX--;
      }

      currX = 0;
      currY -= 1;
      while (currY >= 0) {
        yield {x: currX, y: currY};
        currY--;
      }
    }
  }

  describe('Part 2', () => {
    const largeExampleMap = toMap(`.#..##.###...#######
##.############..##.
.#.######.########.#
.###.#######.####.#.
#####.##.#.##.###.##
..#####..#.#########
####################
#.####....###.#.#.##
##.#################
#####.##.###..####..
..######..##.#######
####.##.####...##..#
.#####..#.######.###
##...#.##########...
#.##########.#######
.####.#.###.###.#.##
....##.##.###..#####
.#.#.###########.###
#.#.#.#####.####.###
###.##.####.##.#..##`);

    const smallExampleMap = toMap(`.#....#####...#..
##...##.#####..##
##...#...#.#####.
..#.....X...###..
..#.#.....#....##`);

    it('big example', () => {
      const slopeAndDist = mapSlopeAndDistance(largeExampleMap, 11, 13)
        .sort((a,b) => a.distance - b.distance)
        .reduce((acc, curr) => {
          let list = acc[curr.deg] || [];
          acc[curr.deg] = list;
          list.push(curr);

          curr.deg = curr.deg + (360*list.length);

          return acc;
        }, {})
        ;

      //console.log(JSON.stringify(slopeAndDist, null, 2));

      const r = Object
        .getOwnPropertyNames(slopeAndDist)
        .reduce((acc, curr) => {
          //console.log(slopeAndDist[curr]);

          acc.push(...slopeAndDist[curr]);
          return acc;
        }, [])
        .sort((a,b) => a.deg - b.deg);

        assert.include(r[1-1], {x: 11, y: 12});
        assert.include(r[2-1], {x: 12, y: 1});
        assert.include(r[3-1], {x: 12, y: 2});
        assert.include(r[10-1], {x: 12, y: 8});
        assert.include(r[20-1], {x: 16, y: 0});
        assert.include(r[50-1], {x: 16, y: 9});
        assert.include(r[100-1], {x: 10, y: 16});
        assert.include(r[199-1], {x: 9, y: 6});
        assert.include(r[200-1], {x: 8, y: 2});
        assert.include(r[201-1], {x: 10, y: 9});
        assert.include(r[299-1], {x: 11, y: 1});
    });

    it('what do you get if you multiply its X coordinate by 100 and then add its Y coordinate? (For example, 8,2 becomes 802.)', () => {
      const slopeAndDist = mapSlopeAndDistance(toMap(input), 26, 29)
        .sort((a,b) => a.distance - b.distance)
        .reduce((acc, curr) => {
          let list = acc[curr.deg] || [];
          acc[curr.deg] = list;
          list.push(curr);

          curr.deg = curr.deg + (360*list.length);

          return acc;
        }, {})
        ;


      const r = Object
        .getOwnPropertyNames(slopeAndDist)
        .reduce((acc, curr) => {
          //console.log(slopeAndDist[curr]);

          acc.push(...slopeAndDist[curr]);
          return acc;
        }, [])
        .sort((a,b) => a.deg - b.deg);

        console.log(JSON.stringify(r[199]));

        let x = r[199].x;
        let y = r[199].y;
        assert.equal(x, 14);
        assert.equal(y, 19);

        assert.equal(x * 100 + y, 1419);
    });
  });


});
