import {readFileLines} from '../lib';

let assert = require('assert');

describe.only('2018 - Day 7', function() {

  let input;
  beforeEach(() => input = readFileLines('./input/2018-07.txt'));

  describe('Part 1', function() {
    it('In what order should the steps in your instructions be completed?', () => {
      // input = `Step C must be finished before step A can begin.\n
      //         Step C must be finished before step F can begin.\n
      //         Step A must be finished before step B can begin.\n
      //         Step A must be finished before step D can begin.\n
      //         Step B must be finished before step E can begin.\n
      //         Step D must be finished before step E can begin.\n
      //         Step F must be finished before step E can begin.`.split('\n');

      const graph = {};

      const rx = /\b([A-Z])\b.*\b([A-Z])\b/;
      input.forEach(l => {
        const match = l.match(rx);
        if (match) {
          graph[match[2]] = graph[match[2]] || [];
          graph[match[1]] = graph[match[1]] || [];

          graph[match[2]].push(match[1]);
        }
      });

      let order = '';
      while(Object.keys(graph).length > 0) {
        const [next] = Object.keys(graph).filter(k => graph[k].length == 0).sort();
        order = order + next;
        delete graph[next];

        Object.keys(graph).forEach(k => graph[k] = graph[k].filter(v => v !== next));
      }

      assert.equal(order, 'CFGHAEMNBPRDISVWQUZJYTKLOX');
    });
  });

  const buildGraph = (input) => {
    let graph = {};
    const rx = /\b([A-Z])\b.*\b([A-Z])\b/;
    input.forEach(l => {
      const match = l.match(rx);
      if (match) {
        graph[match[2]] = graph[match[2]] || [];
        graph[match[1]] = graph[match[1]] || [];

        graph[match[2]].push(match[1]);
      }
    });
    return graph;
  };

  const taskCost = (task) => task.charCodeAt(0) - 'A'.charCodeAt(0) + 61;
  const assignTaskToWorker = (w, graph) => {
    let [nextTask,] = Object.keys(graph).filter(k => graph[k].length == 0).sort();
    if (nextTask) {
      w.task = nextTask;
      w.timeLeft = taskCost(nextTask);
      delete graph[nextTask];
    }
  };
  const finishTask = (w, graph) => {
    Object.keys(graph).forEach(k => graph[k] = graph[k].filter(v => v !== w.task));
    w.task = undefined;
  };

  const moreTodo = (workers, graph) => {
    return (Object.keys(graph).length > 0)
      || (workers.filter(w => w.task != undefined).length > 0);
  };

  const outputTime = (time, workers, order) => {
    const timeStr = ('' + time).padStart(3, ' ');
    const workerStr = workers.map(w => `  ${w.task || '.'}  `).join('');
    console.log(`${timeStr}    ${ workerStr }     ${order}`);

  };

  describe('Part 2', function() {
    it('With 5 workers and the 60+ second step durations described above, how long will it take to complete all of the steps', () => {

      const graph = buildGraph(input);

      const workers = [
        { name: '1', task: undefined, timeLeft: 0 },
        { name: '2', task: undefined, timeLeft: 0 },
        { name: '3', task: undefined, timeLeft: 0 },
        { name: '4', task: undefined, timeLeft: 0 },
        { name: '5', task: undefined, timeLeft: 0 },
      ];

      let order = '';
      let time = 0;
      while(moreTodo(workers, graph)) {

        workers.forEach(w => {
          w.timeLeft -= 1;
          if (w.timeLeft == 0 && w.task){
            order += w.task;
            finishTask(w, graph);
          }
          if (!w.task) {
            assignTaskToWorker(w, graph);
          }
        });

        outputTime(time, workers, order);

        time++;
      }

      assert.equal(order, 'CFGHAEMNBPRDISVWQUZJYTKLOX');
      assert.equal(time, 828);
    });
  });
});
