const GUESS = 'GUESS';
const NOT_IN_WORD = 'NOT_IN_WORD';
const IN_WORD = 'IN_WORD';
const CORRECT = 'CORRECT';
export type CharacterStatus = typeof GUESS | typeof NOT_IN_WORD | typeof IN_WORD | typeof CORRECT;

interface Word {
  characters: string[];
  charactersStatus: CharacterStatus[];
}

export function pushCharacter(character: string, word: Word): Word {
  return {
    characters: [...word.characters, character],
    charactersStatus: [...word.charactersStatus, 'GUESS']
  };
}

export function popCharacter(word: Word): Word {
  return {
    characters: word.characters.slice(0, -1),
    charactersStatus: word.charactersStatus.slice(0, -1)
  };
}

export function guessWordle(answer: string, guess: Word): Word {
  const leftCharacters: string[] = [];

  const correctCharactersStatus: CharacterStatus[] = guess.characters.map((character, index) => {
    const isCorrect = answer.charAt(index) === character;
    if (!isCorrect) leftCharacters.push(answer.charAt(index));
    return isCorrect ? 'CORRECT' : 'GUESS';
  });

  const charactersStatus: CharacterStatus[] = guess.characters.map((character, index) => {
    if (correctCharactersStatus[index] === 'CORRECT') return 'CORRECT';

    const characterIndexInLeftCharacters = leftCharacters.indexOf(character);

    if (characterIndexInLeftCharacters === -1) return 'NOT_IN_WORD';

    leftCharacters.splice(characterIndexInLeftCharacters, 1);
    return 'IN_WORD';
  });

  return {
    ...guess,
    charactersStatus
  };
}

if (import.meta.vitest) {
  const { it, expect, describe } = import.meta.vitest;

  const answer = 'tests';

  describe('Wordle', () => {
    it('Correct answer', () => {
      const guess: Word = {
        characters: ['t', 'e', 's', 't', 's'],
        charactersStatus: ['GUESS', 'GUESS', 'GUESS', 'GUESS', 'GUESS']
      };
      const expectedOutput: Word = {
        characters: ['t', 'e', 's', 't', 's'],
        charactersStatus: ['CORRECT', 'CORRECT', 'CORRECT', 'CORRECT', 'CORRECT']
      };
      expect(guessWordle(answer, guess)).toStrictEqual(expectedOutput);
    });

    it('Prioritize correct answers', () => {
      const guess: Word = {
        characters: ['s', 'e', 'e', 's', 's'],
        charactersStatus: ['GUESS', 'GUESS', 'GUESS', 'GUESS', 'GUESS']
      };
      const expectedOutput: Word = {
        characters: ['s', 'e', 'e', 's', 's'],
        charactersStatus: ['IN_WORD', 'CORRECT', 'NOT_IN_WORD', 'NOT_IN_WORD', 'CORRECT']
      };
      const notExpectedOutput: Word = {
        characters: ['s', 'e', 'e', 's', 's'],
        charactersStatus: ['IN_WORD', 'NOT_IN_WORD', 'IN_WORD', 'NOT_IN_WORD', 'CORRECT']
      };
      expect(guessWordle(answer, guess)).toStrictEqual(expectedOutput);
      expect(guessWordle(answer, guess)).not.toStrictEqual(notExpectedOutput);
    });

    it('In word', () => {
      const guess: Word = {
        characters: ['s', 's', 't', 'e', 't'],
        charactersStatus: ['GUESS', 'GUESS', 'GUESS', 'GUESS', 'GUESS']
      };
      const expectedOutput: Word = {
        characters: ['s', 's', 't', 'e', 't'],
        charactersStatus: ['IN_WORD', 'IN_WORD', 'IN_WORD', 'IN_WORD', 'IN_WORD']
      };
      expect(guessWordle(answer, guess)).toStrictEqual(expectedOutput);
    });

    it('Input test', () => {
      const expectedOutput: Word = {
        characters: ['t', 'e', 's', 't', 's'],
        charactersStatus: ['GUESS', 'GUESS', 'GUESS', 'GUESS', 'GUESS']
      };

      const state: {
        word: Word;
      } = {
        word: {
          characters: [],
          charactersStatus: []
        }
      };

      state.word = pushCharacter('t', state.word);
      state.word = pushCharacter('e', state.word);
      state.word = pushCharacter('s', state.word);
      state.word = pushCharacter('s', state.word);
      state.word = popCharacter(state.word);
      state.word = pushCharacter('t', state.word);
      state.word = pushCharacter('s', state.word);

      expect(state.word).toStrictEqual(expectedOutput);
    });
  });
}
