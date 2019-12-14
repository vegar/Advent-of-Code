import {assert} from 'chai';
import { lines, readFile } from '../lib/fileInput';

describe('2019 - Day 14', function(){
  const input = readFile('./input/2019-14.txt');

  const toNameQuantityPair = (str) => {
    let [q, n] = str.trim().split(' ');
    return {
      quantity: q,
      name: n
    };
  };

  const toNameQuantityPairs = (str) => str.trim().split(',').map(toNameQuantityPair);

  const lineToReaction = (line) => {
    let [input, output] = line.split('=>');
    const result = toNameQuantityPair(output);
    result.inputs = toNameQuantityPairs(input);

    return result;
  };

  const toReactionChain = (input) =>
    lines(input).map(lineToReaction).reduce((chain, curr) => {
      chain[curr.name] = curr;
      return chain;
    }, {});


  const fromStock = (stock, name, wantedQuantity) => {
    const available = Math.min(wantedQuantity, stock[name] || 0);
    stock[name] = (stock[name] || 0) - available;
    return available;
  };

  //const log = (txt, indent) => console.log(`${''.padStart(indent*4, ' ')}${txt}`);
  const log = () => {};

  let indend = 0;

  const produce = (chain, name, wantedQuantity, leftOvers = {}, usage = {}) => {
    const wantedResource = chain[name];
    const multiplier = Math.ceil(wantedQuantity / wantedResource.quantity);
    const actualQuantity = wantedResource.quantity * multiplier;

    log(`\nStaring production of ${wantedQuantity} => ${multiplier} batches of ${wantedResource.quantity} = ${actualQuantity} ${name}`, indend);
    indend++;

    chain[name].inputs.forEach(curr => {
      if (curr.name === 'ORE'){
        usage['ORE'] = (usage['ORE'] || 0) + curr.quantity * multiplier;
      } else {
        const gotFromStock = fromStock(leftOvers, curr.name, curr.quantity * multiplier);
        let whatINeed = (curr.quantity * multiplier) - gotFromStock;

        log(`We'll need ${curr.quantity} * ${multiplier} - ${gotFromStock} (from stock) = ${whatINeed} of ${curr.name}. Let's produce...`, indend);

        const production = produce(chain, curr.name, whatINeed, leftOvers, usage);

        log(`We got ${production.quantity} of ${curr.name}.`, indend);
        leftOvers[curr.name] = (leftOvers[curr.name] || 0) + (production.quantity - whatINeed);

        log(`Putting ${production.quantity - whatINeed} back into stock which now holds ${leftOvers[curr.name] || 0}.`, indend);

        usage[curr.name] = (usage[curr.name] || 0) + production.quantity;
      }
    });

    indend--;
    log(`Done producing ${wantedQuantity} of ${name}. That cost us ${JSON.stringify(usage, null, 2)}`, indend);

    return {
      quantity: wantedResource.quantity * multiplier,
      leftOvers,
      usage
    };
  };

  describe('Part 1', () => {
    it('Example 1', () => {
      const input = `10 ORE => 10 A
      1 ORE => 1 B
      7 A, 1 B => 1 C
      7 A, 1 C => 1 D
      7 A, 1 D => 1 E
      7 A, 1 E => 1 FUEL`;

      const chain = toReactionChain(input);

      const FUEL1 = produce(chain, 'FUEL', 1);
      assert.equal(FUEL1.quantity, 1);
      assert.equal(FUEL1.leftOvers.A, 2 );
      assert.equal(FUEL1.usage.A, 30);
      assert.equal(FUEL1.usage.B, 1);
      assert.equal(FUEL1.usage.ORE, 31);
    });

    it('Example 2', () => {
      const input = `9 ORE => 2 A
      8 ORE => 3 B
      7 ORE => 5 C
      3 A, 4 B => 1 AB
      5 B, 7 C => 1 BC
      4 C, 1 A => 1 CA
      2 AB, 3 BC, 4 CA => 1 FUEL`;

      const chain = toReactionChain(input);

      const FUEL1 = produce(chain, 'FUEL', 1);
      assert.equal(FUEL1.usage.ORE, 165);
    });

    const oreToFuel = (input) => {
      const chain = toReactionChain(input);

      const FUEL1 = produce(chain, 'FUEL', 1);

      return FUEL1.usage.ORE;
    }

    it('Example 3', () => {
      const ore = oreToFuel(`157 ORE => 5 NZVS
      165 ORE => 6 DCFZ
      44 XJWVT, 5 KHKGT, 1 QDVJ, 29 NZVS, 9 GPVTF, 48 HKGWZ => 1 FUEL
      12 HKGWZ, 1 GPVTF, 8 PSHF => 9 QDVJ
      179 ORE => 7 PSHF
      177 ORE => 5 HKGWZ
      7 DCFZ, 7 PSHF => 2 XJWVT
      165 ORE => 2 GPVTF
      3 DCFZ, 7 NZVS, 5 HKGWZ, 10 PSHF => 8 KHKGT`);

      assert.equal(ore, 13312);
    });

    it('Example 4', () => {
      const ore = oreToFuel(`2 VPVL, 7 FWMGM, 2 CXFTF, 11 MNCFX => 1 STKFG
      17 NVRVD, 3 JNWZP => 8 VPVL
      53 STKFG, 6 MNCFX, 46 VJHF, 81 HVMC, 68 CXFTF, 25 GNMV => 1 FUEL
      22 VJHF, 37 MNCFX => 5 FWMGM
      139 ORE => 4 NVRVD
      144 ORE => 7 JNWZP
      5 MNCFX, 7 RFSQX, 2 FWMGM, 2 VPVL, 19 CXFTF => 3 HVMC
      5 VJHF, 7 MNCFX, 9 VPVL, 37 CXFTF => 6 GNMV
      145 ORE => 6 MNCFX
      1 NVRVD => 8 CXFTF
      1 VJHF, 6 MNCFX => 4 RFSQX
      176 ORE => 6 VJHF`);

      assert.equal(ore, 180697);
    });

    it('Example 5', () => {
      const ore = oreToFuel(`171 ORE => 8 CNZTR
      7 ZLQW, 3 BMBT, 9 XCVML, 26 XMNCP, 1 WPTQ, 2 MZWV, 1 RJRHP => 4 PLWSL
      114 ORE => 4 BHXH
      14 VRPVC => 6 BMBT
      6 BHXH, 18 KTJDG, 12 WPTQ, 7 PLWSL, 31 FHTLT, 37 ZDVW => 1 FUEL
      6 WPTQ, 2 BMBT, 8 ZLQW, 18 KTJDG, 1 XMNCP, 6 MZWV, 1 RJRHP => 6 FHTLT
      15 XDBXC, 2 LTCX, 1 VRPVC => 6 ZLQW
      13 WPTQ, 10 LTCX, 3 RJRHP, 14 XMNCP, 2 MZWV, 1 ZLQW => 1 ZDVW
      5 BMBT => 4 WPTQ
      189 ORE => 9 KTJDG
      1 MZWV, 17 XDBXC, 3 XCVML => 2 XMNCP
      12 VRPVC, 27 CNZTR => 2 XDBXC
      15 KTJDG, 12 BHXH => 5 XCVML
      3 BHXH, 2 VRPVC => 7 MZWV
      121 ORE => 7 VRPVC
      7 XCVML => 6 RJRHP
      5 BHXH, 4 VRPVC => 5 LTCX`);

      assert.equal(ore, 2210736);
    });

    it('Given the list of reactions in your puzzle input, what is the minimum amount of ORE required to produce exactly 1 FUEL?', () => {
      const ore = oreToFuel(input);
      assert.equal(ore, 485720);
    });
  });

  const totalFuelBinary = (chain, totalOre, min = 1, max = totalOre) => {
    const count = min + Math.floor((max - min) / 2);

    //console.log(`Checking between ${min} and ${max} => ${count}`);
    if (count == min) return min;

    let result = produce(chain, 'FUEL', count);
    //console.log(`Produced ${count} fuel using ${result.usage.ORE} ore`);

    if (result.usage.ORE > totalOre)  {
      return totalFuelBinary(chain, totalOre, min, count);

    } else if (result.usage.ORE < totalOre) {
      return totalFuelBinary(chain, totalOre,  count, max);
    }
  };


  const totalFuel = (input, totalOre) => {
    const chain = toReactionChain(input);

    const rounds = [];

    const leftOvers = {};
    let fuel = 0;
    while (true) {
      const result = produce(chain, 'FUEL', 1, leftOvers);

      const stockCount = Object.getOwnPropertyNames(leftOvers).reduce((count, curr) => count + leftOvers[curr], 0);

      rounds.push({
        stockCount: stockCount,
        usedOre: result.usage.ORE,
        usedOreTotal: (rounds.length > 0 ? rounds[rounds.length-1].usedOreTotal : 0) + result.usage.ORE
      });

      if (stockCount == 0){
        break;
      }

      if ((fuel % 1000) == 0) {
      }
      if (rounds[rounds.length-1].usedOreTotal > totalOre) break;

      fuel++;
    }

    const fullCycles = Math.floor(totalOre / rounds[rounds.length-1].usedOreTotal);
    if (fullCycles > 0)
    {
      fuel = fullCycles * rounds.length;
      let ores = totalOre - (rounds[rounds.length-1].usedOreTotal * fullCycles);

      //console.log(`${fullCycles} full cycles gives ${fuel} units of fuel at the cost of ${totalOre - ores} ores. ${ores} left`);

      while (ores > 0)
      {
        let nextRound = rounds[(fuel+1) % rounds.length];

        //console.log(`producing 1 more unit of fuel costs ${nextRound.usedOre}, so let's ${nextRound.usedOre < ores ? 'DO IT!' : 'not...'}`);
        if (nextRound.usedOre > ores)
        {
          break;
        }

        ores -= nextRound.usedOre;
        fuel++;
      }
    } else {
      //console.log(`Didn't reach any full cycle. Returns produced fuel: ${fuel}`);
    }

    return fuel;
  };

  describe('Part 2', () => {
    it('The 13312 ORE-per-FUEL example could produce 82892753 FUEL.', () => {
      const input = `157 ORE => 5 NZVS
      165 ORE => 6 DCFZ
      44 XJWVT, 5 KHKGT, 1 QDVJ, 29 NZVS, 9 GPVTF, 48 HKGWZ => 1 FUEL
      12 HKGWZ, 1 GPVTF, 8 PSHF => 9 QDVJ
      179 ORE => 7 PSHF
      177 ORE => 5 HKGWZ
      7 DCFZ, 7 PSHF => 2 XJWVT
      165 ORE => 2 GPVTF
      3 DCFZ, 7 NZVS, 5 HKGWZ, 10 PSHF => 8 KHKGT`;

      const chain = toReactionChain(input);
      const fuel = totalFuelBinary(chain, 1000000000000);

      assert.equal(fuel, 82892753);
    });

    it('The 180697 ORE-per-FUEL example could produce 5586022 FUEL.', () => {
      const input = `2 VPVL, 7 FWMGM, 2 CXFTF, 11 MNCFX => 1 STKFG
      17 NVRVD, 3 JNWZP => 8 VPVL
      53 STKFG, 6 MNCFX, 46 VJHF, 81 HVMC, 68 CXFTF, 25 GNMV => 1 FUEL
      22 VJHF, 37 MNCFX => 5 FWMGM
      139 ORE => 4 NVRVD
      144 ORE => 7 JNWZP
      5 MNCFX, 7 RFSQX, 2 FWMGM, 2 VPVL, 19 CXFTF => 3 HVMC
      5 VJHF, 7 MNCFX, 9 VPVL, 37 CXFTF => 6 GNMV
      145 ORE => 6 MNCFX
      1 NVRVD => 8 CXFTF
      1 VJHF, 6 MNCFX => 4 RFSQX
      176 ORE => 6 VJHF`;

      const chain = toReactionChain(input);
      const fuel = totalFuelBinary(chain, 1000000000000);

      assert.equal(fuel, 5586022);
    });

    it('The 2210736 ORE-per-FUEL example could produce 460664 FUEL.', () => {
      const input = `171 ORE => 8 CNZTR
      7 ZLQW, 3 BMBT, 9 XCVML, 26 XMNCP, 1 WPTQ, 2 MZWV, 1 RJRHP => 4 PLWSL
      114 ORE => 4 BHXH
      14 VRPVC => 6 BMBT
      6 BHXH, 18 KTJDG, 12 WPTQ, 7 PLWSL, 31 FHTLT, 37 ZDVW => 1 FUEL
      6 WPTQ, 2 BMBT, 8 ZLQW, 18 KTJDG, 1 XMNCP, 6 MZWV, 1 RJRHP => 6 FHTLT
      15 XDBXC, 2 LTCX, 1 VRPVC => 6 ZLQW
      13 WPTQ, 10 LTCX, 3 RJRHP, 14 XMNCP, 2 MZWV, 1 ZLQW => 1 ZDVW
      5 BMBT => 4 WPTQ
      189 ORE => 9 KTJDG
      1 MZWV, 17 XDBXC, 3 XCVML => 2 XMNCP
      12 VRPVC, 27 CNZTR => 2 XDBXC
      15 KTJDG, 12 BHXH => 5 XCVML
      3 BHXH, 2 VRPVC => 7 MZWV
      121 ORE => 7 VRPVC
      7 XCVML => 6 RJRHP
      5 BHXH, 4 VRPVC => 5 LTCX`;

      const chain = toReactionChain(input);
      const fuel = totalFuelBinary(chain, 1000000000000);

      assert.equal(fuel, 460664);
    });

    it('Given 1 trillion ORE, what is the maximum amount of FUEL you can produce?', () => {
      const chain = toReactionChain(input);
      const fuel = totalFuelBinary(chain, 1000000000000);

      assert.equal(fuel, 3848998);
    })
  });


});
