import React, { useState, useEffect } from 'react';
import Hangman from '../Hangman';
import Keyboard from '../Keyboard';
import Answer from '../Answer';
import Indicators from '../Indicators';
import FinalPopUp from '../FinalPopUp';
import './Game.scss';
import { Fade } from 'react-awesome-reveal';

interface PropTypes {
  maxMistakes: number;
  easyMode: boolean;
  freeVowels: boolean;
  countryName: string;
  countryFlag: string;
  setCountry: any;
}

const Game: React.FunctionComponent<PropTypes> = (props) => {
  const {
    maxMistakes,
    easyMode,
    freeVowels,
    countryName,
    countryFlag,
    setCountry,
  } = props;

  const [mistakesCounter, setMistakesCounter] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [pushedLetters, setPushedLetters] = useState<Array<string>>(
    [],
  );
  const [remainingLetters, setRemainingLetters] = useState<
    Array<string>
  >([]);

  useEffect(() => {
    setRemainingLetters(
      Array.from(new Set(countryName.trim().toLowerCase().split(''))),
    );
  }, [countryName]);

  // useEffect(() => {
  //   const defaultSettings: any =
  //     localStorage.getItem('defaultSettings') || null;
  //   if (defaultSettings) {
  //     setDefaultSettings(JSON.parse(defaultSettings));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem(
  //     'defaultSettings',
  //     JSON.stringify(defaultSettings),
  //   );
  // }, [score]);

  const handleGuess = (e: any) => {
    const letter: string = e.target.innerHTML;
    setPushedLetters((prevArr: any) => {
      prevArr.push(letter);
      return prevArr;
    });

    if (remainingLetters.includes(letter)) {
      setRemainingLetters(
        remainingLetters.filter((el: any) => el !== letter),
      );
      setScore((prevValue: number) => prevValue + 100);
    } else {
      setScore((prevValue: number) => prevValue - 10);
      if (e.target.id !== 'vowel') {
        setMistakesCounter((prevValue: number) => prevValue + 1);
      }
    }
  };

  const setNewGame = () => {
    if (mistakesCounter >= maxMistakes) {
      setScore(0);
    }
    setCountry();
    setMistakesCounter(0);
    setPushedLetters([]);
  };

  const checkGameStatus = () => {
    if (mistakesCounter < maxMistakes) {
      if (!remainingLetters.length) {
        return (
          <FinalPopUp
            gameStatus={'game-status win'}
            setNewGame={setNewGame}
            keyWord={countryName.toUpperCase()}
          />
        );
      }
    } else {
      return (
        <FinalPopUp
          gameStatus={'game-status lose'}
          setNewGame={setNewGame}
          keyWord={countryName.toUpperCase()}
        />
      );
    }
  };

  return (
    <div className='Game'>
      <Hangman
        mistakesCounter={mistakesCounter}
        remainingLetters={remainingLetters}
        easyMode={easyMode}
      />

      <Answer
        keyWord={countryName}
        remainingLetters={remainingLetters}
      />

      <Indicators
        mistakesCounter={mistakesCounter}
        maxMistakes={maxMistakes}
        score={score}
        countryFlag={countryFlag}
      />

      <Keyboard
        handleGuess={handleGuess}
        pushedLetters={pushedLetters}
        mistakesCounter={mistakesCounter}
        maxMistakes={maxMistakes}
        remainingLetters={remainingLetters}
        freeVowels={freeVowels}
      />

      <Fade
        delay={1000}
        duration={1000}
        direction={'down'}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {checkGameStatus()}
      </Fade>
    </div>
  );
};

export default Game;
