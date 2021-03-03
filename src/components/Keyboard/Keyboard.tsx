import React from 'react';
import './Keyboard.scss';
import { Zoom } from 'react-awesome-reveal';

interface PropTypes {
  handleGuess: any;
  pushedLetters: Array<string>;
  remainingLetters: Array<string>;
  mistakesCounter: number;
  maxMistakes: number;
  freeVowels: boolean;
}

const Keyboard: React.FunctionComponent<PropTypes> = (props) => {
  const {
    handleGuess,
    pushedLetters,
    mistakesCounter,
    maxMistakes,
    remainingLetters,
    freeVowels,
  } = props;

  const letters: Array<string> = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];

  return (
    <div className='Keyboard'>
      <Zoom>
        {letters.map((letter: string, index: number) => (
          <button
            key={index}
            onClick={handleGuess}
            disabled={
              pushedLetters.includes(letter) ||
              mistakesCounter >= maxMistakes ||
              !remainingLetters.length
            }
            id={
              'aeiou'.includes(letter) && freeVowels
                ? 'vowel'
                : 'consonant'
            }
            className={
              'btn-floating btn-large waves-effect waves-teal'
            }
          >
            {letter}
          </button>
        ))}
      </Zoom>
    </div>
  );
};

export default Keyboard;
