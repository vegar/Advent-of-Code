import { assert } from 'chai';
import { readFile } from '../lib';

describe.only('2019 - Day 08', function() {
  const input = readFile('./input/2019-08.txt')


  describe('Part 1', () => {

    const splitInLayers = (input, width, height) => {

      return input.split('').reduce((acc, curr, idx) => {
        const currLayerIdx = Math.floor(idx / (width*height));
        if (currLayerIdx >= acc.length) acc.push({});
        const currentLayer = acc[currLayerIdx];

        currentLayer[curr] = (currentLayer[curr] || 0) + 1;

        return acc;
      }, []);

    };


    it(`For example, given an image 3 pixels wide and 2 pixels tall, the image data 123456789012 corresponds to the following image layers:
        Layer 1: 123
                 456
        Layer 2: 789
                 012`, () => {
      const layers = splitInLayers("123456789012", 3, 2);

      assert.equal(layers.length, 2);

      assert.deepEqual(layers[0], {'1': 1, '2': 1, '3': 1, '4': 1, '5': 1, '6': 1});


      const layerWithMost0 = layers.reduce((prev, curr) => {
        return prev['0'] > curr['0'] ? prev : curr;
      });

      assert.deepEqual(layerWithMost0, {'7': 1, '8': 1, '9': 1, '0': 1, '1': 1, '2': 1});
    });


    it('To make sure the image wasn\'t corrupted during transmission, the Elves would like you to find the layer that contains the fewest 0 digits. On that layer, what is the number of 1 digits multiplied by the number of 2 digits?', () => {

      const layers = splitInLayers(input, 25, 6);

      const wantedLayer = layers.reduce((prev, curr) => {
        return prev['0'] < curr['0'] ? prev : curr;
      });

      const result = wantedLayer['1'] * wantedLayer['2'];

      assert.equal(result, 1320);
    });
  });

  describe('Part 2', () => {
    const splitInLayers2 = (input, width, height) => {

      return input.split('').reduce((acc, curr, idx) => {
        const currLayerIdx = Math.floor(idx / (width*height));
        if (currLayerIdx == acc.length) acc.push([]);

        acc[currLayerIdx].push(1*curr);

        return acc;
      }, []);

    };

    it(`For example, given an image 2 pixels wide and 2 pixels tall, the image data 0222112222120000 corresponds to the following image layers:
        Layer 1: 02
                22
        Layer 2: 11
                22
        Layer 3: 22
                12
        Layer 4: 00
                00`, () => {
      const layers = splitInLayers2('0222112222120000', 2, 2);

      const image = [];
      image.length = 4;
      image.fill(2);

      layers.reduce((img, currLayer) => {
        currLayer.forEach((p, idx) => {
          if (img[idx] == 2) img[idx] = p;
        });
        return img;
      }, image);

      assert.sameOrderedMembers(image, [0,1,1,0]);
    });

    it('What message is produced after decoding your image?', () => {
      const layers = splitInLayers2(input, 25, 6);

      const image = [];
      image.length = 25*6;
      image.fill(2);

      const msg = layers.reduce((img, currLayer) => {
        currLayer.forEach((p, idx) => {
          if (img[idx] == 2) img[idx] = p;
        });
        return img;
      }, image);

      let message = '';
      while(msg.length > 0) {
        message = message + '\n' + msg.splice(0, 25).map(p => p == 0 ? ' ' : '█').join('').trim();
      }
      assert.equal(message, `
███   ██  █   ██  █ ███
█  █ █  █ █   ██ █  █  █
█  █ █     █ █ ██   █  █
███  █      █  █ █  ███
█ █  █  █   █  █ █  █ █
█  █  ██    █  █  █ █  █`);
    });
  });
});
