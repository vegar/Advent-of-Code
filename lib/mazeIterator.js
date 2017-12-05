export function mazeIterator(maze, instructionModifier) {
      let nextIdx = 0;
      let instructions = [...maze];

      return {
        next: function() {

          if (nextIdx < instructions.length && nextIdx >= 0) {
            let r = { done: false, value: nextIdx, jump: instructions[nextIdx] };

            let jump = instructions[nextIdx];
            instructions[nextIdx] = instructionModifier(instructions[nextIdx]);
            nextIdx += jump;

            return r;
          }

          return { done: true };
        }
      }
    }

export const incFunc = i => i + 1;
export const makeIncOrDecFunc = ({treshhold}) => i => i >= treshhold ? i - 1 : i + 1;
