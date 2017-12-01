import {captcha} from '../lib';

let assert = require('assert');

describe('2017 - Day 1', function() {

  const input = '6592822488931338589815525425236818285229555616392928433262436847386544514648645288129834834862363847542262953164877694234514375164927616649264122487182321437459646851966649732474925353281699895326824852555747127547527163197544539468632369858413232684269835288817735678173986264554586412678364433327621627496939956645283712453265255261565511586373551439198276373843771249563722914847255524452675842558622845416218195374459386785618255129831539984559644185369543662821311686162137672168266152494656448824719791398797359326412235723234585539515385352426579831251943911197862994974133738196775618715739412713224837531544346114877971977411275354168752719858889347588136787894798476123335894514342411742111135337286449968879251481449757294167363867119927811513529711239534914119292833111624483472466781475951494348516125474142532923858941279569675445694654355314925386833175795464912974865287564866767924677333599828829875283753669783176288899797691713766199641716546284841387455733132519649365113182432238477673375234793394595435816924453585513973119548841577126141962776649294322189695375451743747581241922657947182232454611837512564776273929815169367899818698892234618847815155578736875295629917247977658723868641411493551796998791839776335793682643551875947346347344695869874564432566956882395424267187552799458352121248147371938943799995158617871393289534789214852747976587432857675156884837634687257363975437535621197887877326295229195663235129213398178282549432599455965759999159247295857366485345759516622427833518837458236123723353817444545271644684925297477149298484753858863551357266259935298184325926848958828192317538375317946457985874965434486829387647425222952585293626473351211161684297351932771462665621764392833122236577353669215833721772482863775629244619639234636853267934895783891823877845198326665728659328729472456175285229681244974389248235457688922179237895954959228638193933854787917647154837695422429184757725387589969781672596568421191236374563718951738499591454571728641951699981615249635314789251239677393251756396';

  describe('Part 1 - captcha n+1', function() {

    let nextFunc = (i) => i+1;

    it('should return 0 for empty string', function() {
      assert.equal(0, captcha('', nextFunc));
    });

    it('1122 produces a sum of 3 (1 + 2) because the first digit (1) matches the second digit and the third digit (2) matches the fourth digit.', function() {
      assert.equal(3, captcha('1122', nextFunc));
    });

    it('1111 produces 4 because each digit (all 1) matches the next.', function() {
      assert.equal(4, captcha('1111', nextFunc));
    });

    it('1234 produces 0 because no digit matches the next.', function() {
      assert.equal(0, captcha('1234', nextFunc));
    });

    it('91212129 produces 9 because the only digit that matches the next one is the last digit, 9.', function() {
      assert.equal(9, captcha('91212129', nextFunc));
    });

    it('should return 1029 when the input is day 1 input', function() {
        let result = captcha(input, nextFunc);

      assert.equal(1029, result);
    });
  });

  describe('Part 2 - captcha n+(len/2)', function() {

    let halfwayAroundFunc = (i, len) => i + (len/2);

    it('1212 produces 6: the list contains 4 items, and all four digits match the digit 2 items ahead.', function() {
      assert.equal(6, captcha('1212', halfwayAroundFunc));
    })

    it('1221 produces 0, because every comparison is between a 1 and a 2.', function() {
      assert.equal(0, captcha('1221', halfwayAroundFunc));
    });

    it('123425 produces 4, because both 2s match each other, but no other digit has a match.', function() {
      assert.equal(4, captcha('123425', halfwayAroundFunc));
    });

    it('123123 produces 12.', function() {
      assert.equal(12, captcha('123123', halfwayAroundFunc));
    });

    it('12131415 produces 4.', function() {
      assert.equal(4, captcha('12131415', halfwayAroundFunc));
    });

    it('should return 1220 when the input is day 1 input', function() {
      let result = captcha(input, halfwayAroundFunc);

      assert.equal(1220, result);
    });
  });

});