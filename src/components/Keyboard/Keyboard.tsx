import React from 'react';
import { Zoom } from 'react-awesome-reveal';
import './Keyboard.scss';

interface PropTypes {
  handleGuess: any;
  pushedLetters: Array<string>;
  remainingLetters: Array<string>;
  mistakesCounter: number;
  maxMistakes: number;
  freeVowels: boolean;
  launchAutoplay: () => void;
}

const Keyboard: React.FunctionComponent<PropTypes> = (props) => {
  const {
    handleGuess,
    pushedLetters,
    mistakesCounter,
    maxMistakes,
    remainingLetters,
    freeVowels,
    launchAutoplay,
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
    'autoplay',
  ];

  return (
    <div className='Keyboard'>
      <Zoom>
        {letters.map((letter: string, index: number) => (
          <button
            key={index}
            onClick={
              letter === 'autoplay' ? launchAutoplay : handleGuess
            }
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
              letter === 'autoplay'
                ? 'btn-floating btn-large waves-effect waves-teal autoplay'
                : 'btn-floating btn-large waves-effect waves-teal'
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
