import React, { useState, useEffect } from 'react';
import MainPicture from '../MainPicture';
import Keyboard from '../Keyboard';
import HiddenWord from '../HiddenWord';
import GameInfo from '../GameInfo';
import GameOverWindow from '../GameOverWindow';
import './HangmanGame.scss';
import { Fade } from 'react-awesome-reveal';
import { getCountry } from '../words';

interface PropTypes {
  maxMistakes: number;
  easyMode: boolean;
  countryName: string;
  countryFlag: string;
  setCountry: any;
}

interface KeyWordTypes {
  countryName: string;
  countryFlag: string;
}

const HangmanGame: React.FunctionComponent<PropTypes> = (props) => {
  const {
    maxMistakes,
    easyMode,
    countryName,
    countryFlag,
    setCountry,
  } = props;

  const [mistakesCounter, setMistakesCounter] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [pushedLetters, setPushedLetters] = useState<any>(new Set());
  const [remainingLetters, setRemainingLetters] = useState<any>(
    new Set(countryName.trim().toLowerCase().split('')),
  );

  useEffect(() => {
    setRemainingLetters(
      new Set(countryName.trim().toLowerCase().split('')),
    );
  }, [countryName]);

  const handleGuess = (e: any) => {
    const letter: string = e.target.innerHTML;
    setPushedLetters(pushedLetters.add(letter));
    if (remainingLetters.has(letter)) {
      setRemainingLetters((prevSet: any) => {
        prevSet.delete(letter);
        return prevSet;
      });
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

    setPushedLetters(new Set());
  };

  const checkGameStatus = () => {
    if (mistakesCounter < maxMistakes) {
      if (!remainingLetters.size) {
        return (
          <GameOverWindow
            gameStatus={'game-status win'}
            setNewGame={setNewGame}
            keyWord={countryName.toUpperCase()}
          />
        );
      }
    } else {
      return (
        <GameOverWindow
          gameStatus={'game-status lose'}
          setNewGame={setNewGame}
          keyWord={countryName.toUpperCase()}
        />
      );
    }
  };

  console.log(countryName);
  console.log(pushedLetters);
  console.log(remainingLetters);

  return (
    <div className='HangmanGame'>
      <MainPicture
        mistakesCounter={mistakesCounter}
        remainingLetters={remainingLetters}
        easyMode={easyMode}
      />

      <HiddenWord
        keyWord={countryName}
        remainingLetters={remainingLetters}
      />

      <GameInfo
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

export default HangmanGame;
