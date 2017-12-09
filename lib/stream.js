export function parseStream(input) {
      let level = 0;
      let groups = [];
      let inGarbage = false;
      let garbageCount = 0;

      let startGroup = () => { inGarbage ? garbageCount++ : level++ }
      let endGroup = () => { inGarbage ? garbageCount++ : groups.push(level--); }
      let startGarbage = () => { inGarbage ? garbageCount++ : inGarbage = true }
      let endGarbarge = () => { inGarbage = false }

      for (var i = 0; i < input.length; i++) {
        let c = input[i];

          c == '{' ? startGroup()
        : c == '}' ? endGroup()
        : c == '<' ? startGarbage()
        : c == '>' ? endGarbarge()
        : c == '!' ? i++
        : inGarbage ? garbageCount++
        : null;
      }

      groups.garbageCount = garbageCount;
      return groups;
    }
