import React from 'react';
import './Keyboard.scss';
import { Zoom } from 'react-awesome-reveal';

interface PropTypes {
  handleGuess: any;
  pushedLetters: any;
  remainingLetters: any;
  mistakesCounter: number;
  maxMistakes: number;
}

const Keyboard: React.FunctionComponent<PropTypes> = (props) => {
  const {
    handleGuess,
    pushedLetters,
    mistakesCounter,
    maxMistakes,
    remainingLetters,
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
        {letters.map((letter, index) => (
          <button
            key={index}
            onClick={handleGuess}
            onKeyDown={handleGuess}
            disabled={
              pushedLetters.has(letter) ||
              mistakesCounter >= maxMistakes ||
              !remainingLetters.size
            }
            id={'aeiou'.includes(letter) ? 'vowel' : 'consonant'}
            className={
              'btn-floating btn-large waves-effect waves-light'
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
