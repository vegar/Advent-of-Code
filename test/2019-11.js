import {readFileAsNumbers, intCodeExecutor } from '../lib';
import {assert} from 'chai';

describe('2019 - Day 11', function(){
  const input = readFileAsNumbers('./input/2019-11.txt');

  describe('Part 1', () => {
    it('Build a new emergency hull painting robot and run the Intcode program on it. How many panels does it paint at least once?', () => {
      let direction = '0';
      let counter = 0;
      let position = [0,0];
      const panels = {};
      const handleOutput = (o) => {

        if (counter % 2 == 0) {
          //paint
          panels[`${position[0]},${position[1]}`] = o;
        } else {
          //direction
          direction = o == 0 ? direction-1 : direction+1;
          if (direction < 0) direction += 4;
          if (direction > 3) direction -= 4;

          switch (direction) {
          case 0:
            position = [position[0], position[1]+1];
            break;
          case 1:
            position = [position[0]+1, position[1]];
            break;
          case 2:
            position = [position[0], position[1]-1];
            break;
          case 3:
            position = [position[0]-1, position[1]];
            break;
          }
        }
        counter++;
      };

      const handleInput = () => panels[`${position[0]},${position[1]}`] || 0;


      const program = intCodeExecutor(input, handleInput, handleOutput);

      let i = program.next();
      while (!i.done) {
        //console.log(i.value);
        i = program.next();
      }

      const result = Object.getOwnPropertyNames(panels).length;
      assert.equal(result, 2021);
    });
  });

  describe("Part 2", () => {
    it('After starting the robot on a single white panel instead, what registration identifier does it paint on your hull?', () => {
      let direction = '0';
      let counter = 0;
      let position = [2,1];
      const panels = {
        [`${position[0]},${position[1]}`]: 1
      };
      const handleOutput = (o) => {

        if (counter % 2 == 0) {
          //paint
          panels[`${position[0]},${position[1]}`] = o;
        } else {
          //direction
          direction = o == 0 ? direction-1 : direction+1;
          if (direction < 0) direction += 4;
          if (direction > 3) direction -= 4;

          switch (direction) {
          case 0:
            position = [position[0], position[1]-1];
            break;
          case 1:
            position = [position[0]-1, position[1]];
            break;
          case 2:
            position = [position[0], position[1]+1];
            break;
          case 3:
            position = [position[0]+1, position[1]];
            break;
          }
        }
        counter++;
      };

      const handleInput = () => panels[`${position[0]},${position[1]}`] || 0;


      const program = intCodeExecutor(input, handleInput, handleOutput);

      let i = program.next();
      while (!i.done) {
        //console.log(i.value);
        i = program.next();
      }

      const picture = [];
      picture.length = 7;
      for (let i = 0; i < 7; i++){
        picture[i] = new Array(50);
        picture[i].fill(0);
      }

      Object.getOwnPropertyNames(panels).forEach(v => {
        const cord = v.split(',');
        picture[cord[0]][cord[1]] = panels[v] == 0;
      });

      const result = picture.reduce((str, row) => str = str + row.map(v => v ? '█' : ' ').join('').trimRight() + '\n', '');

      assert.equal(`
  ████   ████  █ ██ █    █ ██ █ ████ ██ ██
  ████ ██ ████ █ ██ █ ████ █ ██ ████ ██ ███
  ████   █████ █    █   ██  ███ ████    ███
█ ████ ██ ████ █ ██ █ ████ █ ██ ████ ██ ██
█ ████ ██ █ ██ █ ██ █ ████ █ ██ ████ ██ █
     █   ███  ██ ██ █    █ ██ █    █ ██ █
`, result);
    });
  })
});
