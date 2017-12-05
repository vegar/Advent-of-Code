export function validatePassphrase(phrase) {

  let words = phrase.split(' ');
  let seen = [];
  return words.every(word => {
    if (seen.includes(word)) {
      return false;
    }

    seen.push(word);

    return true;
  });
}

export function validatePassphraseAna(phrase) {

  let words = phrase.split(' ');
  let seen = [];
  return words.every(word => {
    let letters = word.split('').sort().join();
    if (seen.includes(letters)) {
      return false;
    }

    seen.push(letters);

    return true;
  });
}
