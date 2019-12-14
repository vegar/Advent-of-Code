import {intCodeExecutor, readFileAsNumbers } from '../lib';
import {assert} from 'chai';

import { terminal, ScreenBuffer } from 'terminal-kit';

describe('2019 - Day 13', function(){
  const input = readFileAsNumbers('./input/2019-13.txt');

  describe('Part 1', () => {

    it('Start the game. How many block tiles are on the screen when the game exits?', () => {


      let output = [];
      let blocks = 0;

      let program = intCodeExecutor(input, () => {}, (o) => { output.push(o); });
      let i = program.next();
      while (!i.done) {
        if (output.length == 3) {
          let [x, y, t] = output;
          output = [];
          if (t == 2) blocks++;
        }
        i = program.next();
      }

      assert.equal(blocks, 420);
    });
  });

  describe('Part 2', () => {


    it('Beat the game by breaking all the blocks. What is your score after the last block is broken?', () => {

      let output = [];
      let blocks = 0;

      let ballX = 0;
      let paddleX = 0;
      const joystick = () => {
        if (ballX == paddleX) return 0;
        return ballX < paddleX ? -1 : +1;
      };

      const screen = new Array(24);
      for (let y = 0; y < screen.length; y++) screen[y] = new Array(41);

      const screenBuffer = new ScreenBuffer({
        dest: terminal,
        width: 41,
        height: 24,
      });

      screenBuffer.clear();
      screenBuffer.draw();

      terminal.clear();
      terminal.hideCursor();

      const drawScreen = (x,y,t) => {
        switch (t) {
        case 0: terminal.moveTo(x+1, y+1, ' '); break;
        case 1:
          if (x == 0 && y == 0)
            terminal.moveTo.green(x+1, y+1, '▛');
          else if (x == 40 && y == 0)
            terminal.moveTo.green(x+1, y+1, '▜');
          else if (y == 0)
            terminal.moveTo.green(x+1, y+1, '▀');
          else if (x == 40)
            terminal.moveTo.green(x+1, y+1, '▐');
          else if (x == 0)
            terminal.moveTo.green(x+1, y+1, '▌');
          break;
        case 2:
          terminal.moveTo.blue(x+1, y+1, '▀');
          break;
        case 3:
          terminal.moveTo.yellow(x+1, y+1, '▂');
          break;
        case 4:
          terminal.moveTo.yellow(x+1, y+1, 'o');
          break;
        default: terminal.moveTo(x+1, y+1, t.toString(10));
        }

        screenBuffer.draw();
      };

      let score = 0;

      input[0] = 2;

      let program = intCodeExecutor(input, joystick, (o) => { output.push(o); });
      let i = program.next();
      while (!i.done) {
        if (output.length == 3) {
          let [x, y, t] = output;

          //console.log(`(${x},${y}) ==> ${t}`);
          output = [];

          if (x == -1 && y == 0) {
            score = t;

            drawScreen(50, 1, t);
          } else {
            screen[y][x]  = t;

            drawScreen(x, y, t);

            if (t == 4) ballX = x;
            if (t == 3) paddleX = x;
          }

        }
        i = program.next();
      }

      terminal.moveTo(1,50);
      assert.equal(score, 21651);
    });


  });
});
