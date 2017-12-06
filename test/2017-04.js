import { validatePassphrase, validatePassphraseAna, readFileLines } from '../lib';

let assert = require('chai').assert;

describe('2017 - Day 4', function() {

  let input;
  before('read file', function() {
    input = readFileLines('./input/2017-04.txt')
  });

  describe('Part 1', function() {

    it('aa bb cc dd ee is valid.', function() {
      let valid = validatePassphrase('aa bb cc dd ee');

      assert.isOk(valid);
    });

    it('aa bb cc dd aa is not valid - the word aa appears more than once.', function() {
      let valid = validatePassphrase('aa bb cc dd aa');

      assert.isNotOk(valid);
    });

    it('aa bb cc dd aaa is valid - aa and aaa count as different words.', function() {

      let valid = validatePassphrase('aa bb cc dd aaa');

      assert.isOk(valid);
    });

    it('How many passphrases are valid? --> 455', function() {
      let count = input
        .reduce((count, passphrase) => {
          return validatePassphrase(passphrase)
            ?  ++count
            :  count;
        }, 0);

        assert.equal(455, count);
    });

  });


  describe('Part 2', function() {
    it('abcde fghij is a valid passphrase.', function() {
      let valid = validatePassphraseAna('abcde fghij ');

      assert.isOk(valid);
    });

    it('abcde xyz ecdab is not valid - the letters from the third word can be rearranged to form the first word.', function() {
      let valid = validatePassphraseAna('abcde xyz ecdab');

      assert.isNotOk(valid);
    });

    it('a ab abc abd abf abj is a valid passphrase, because all letters need to be used when forming another word.', function() {
      let valid = validatePassphraseAna('a ab abc abd abf abj');

      assert.isOk(valid);
    });

    it('iiii oiii ooii oooi oooo is valid.', function() {
      let valid = validatePassphraseAna('iiii oiii ooii oooi oooo');

      assert.isOk(valid);
    });

    it('oiii ioii iioi iiio is not valid - any of these words can be rearranged to form any other word.', function() {
      let valid = validatePassphraseAna('oiii ioii iioi iiio');

      assert.isNotOk(valid);
    });

    it('How many passphrases are valid? --> 186', function() {
      let count = input
        .reduce((count, passphrase) => {
          return validatePassphraseAna(passphrase)
            ?  ++count
            :  count;
        }, 0);

        assert.equal(186, count);
    });

  });

});
