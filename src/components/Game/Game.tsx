import React, { useState, useEffect, useLayoutEffect } from 'react';
import Hangman from '../Hangman';
import Keyboard from '../Keyboard';
import Answer from '../Answer';
import Indicators from '../Indicators';
import FinalPopUp from '../FinalPopUp';
import { Fade } from 'react-awesome-reveal';
import './Game.scss';

import useSound from 'use-sound';
import selectClick from '../../assets/sounds/selectClick.mp3';
import clickError from '../../assets/sounds/clickError.mp3';
import singleClassicClick from '../../assets/sounds/single-classic-click.mp3';

interface PropTypes {
  maxMistakes: number;
  easyMode: boolean;
  freeVowels: boolean;
  countryName: string;
  countryFlag: string;
  setCountry: () => void;
  volumeLevel: number;
  muted: boolean;
}

const Game: React.FunctionComponent<PropTypes> = (props) => {
  const {
    maxMistakes,
    easyMode,
    freeVowels,
    countryName,
    countryFlag,
    setCountry,
    volumeLevel,
    muted,
  } = props;

  const [gameSettings, setGameSettings] = useState<any>({
    mistakesCounter: 0,
    score: 0,
    pushedLetters: [],
    remainingLetters: [],
    autoPlay: false,
    guessedWords: 0,
  });

  const [autoPlay, setAutoPlay] = useState(false);

  const [playSuccess] = useSound(selectClick, {
    volume: muted ? 0 : volumeLevel,
  });
  const [playFailure] = useSound(clickError, {
    volume: muted ? 0 : volumeLevel,
  });
  const [playAutoPlay] = useSound(singleClassicClick, {
    volume: muted ? 0 : volumeLevel,
  });

  useLayoutEffect(() => {
    setGameSettings((prevState: any) => {
      return {
        ...prevState,
        remainingLetters: Array.from(
          new Set(countryName.trim().toLowerCase().split('')),
        ),
      };
    });
  }, [countryName]);

  useEffect(() => {
    if (!autoPlay) {
      return;
    }
    const autoPlayTimer = setInterval(() => {
      setGameSettings((prevState: any) => {
        return {
          ...prevState,
          remainingLetters: prevState.remainingLetters.slice(0, -1),
          pushedLetters: prevState.pushedLetters.concat(
            prevState.remainingLetters.slice(
              prevState.remainingLetters.length - 2,
              prevState.remainingLetters.length - 1,
            ),
          ),
        };
      });
    }, 1000);
    return () => clearInterval(autoPlayTimer);
  }, [autoPlay]);

  const launchAutoplay = (): void => {
    playAutoPlay();
    setAutoPlay(true);
  };

  const handleGuess = (e: any): void => {
    const letter: string = e.target.innerHTML;

    if (gameSettings.remainingLetters.includes(letter)) {
      playSuccess();
      setGameSettings((prevState: any) => {
        return {
          ...prevState,
          pushedLetters: prevState.pushedLetters.concat([letter]),
          remainingLetters: prevState.remainingLetters.filter(
            (el: string) => el !== letter,
          ),
          score: prevState.score + 100,
        };
      });
    } else {
      playFailure();
      setGameSettings((prevState: any) => {
        return {
          ...prevState,
          pushedLetters: prevState.pushedLetters.concat([letter]),
          score: prevState.score - 10,
        };
      });
      if (e.target.id !== 'vowel') {
        setGameSettings((prevState: any) => {
          return {
            ...prevState,
            mistakesCounter: prevState.mistakesCounter + 1,
          };
        });
      }
    }
  };

  const setNewGame = (): void => {
    setCountry();

    setGameSettings((prevState: any) => {
      return {
        ...prevState,
        mistakesCounter: 0,
        pushedLetters: [],
        guessedWords:
          autoPlay || prevState.mistakesCounter >= maxMistakes
            ? prevState.guessedWords
            : prevState.guessedWords + 1,
      };
    });

    if (gameSettings.mistakesCounter >= maxMistakes) {
      setGameSettings((prevState: any) => {
        return {
          ...prevState,
          score: 0,
        };
      });
    }

    setAutoPlay(false);
  };

  const checkGameStatus = () => {
    if (gameSettings.mistakesCounter < maxMistakes) {
      if (!gameSettings.remainingLetters.length) {
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
        mistakesCounter={gameSettings.mistakesCounter}
        remainingLetters={gameSettings.remainingLetters}
        easyMode={easyMode}
      />

      <Answer
        keyWord={countryName}
        remainingLetters={gameSettings.remainingLetters}
      />

      <Indicators
        mistakesCounter={gameSettings.mistakesCounter}
        maxMistakes={maxMistakes}
        score={gameSettings.score}
        countryFlag={countryFlag}
        guessedWords={gameSettings.guessedWords}
      />

      <Keyboard
        handleGuess={handleGuess}
        launchAutoplay={launchAutoplay}
        pushedLetters={gameSettings.pushedLetters}
        mistakesCounter={gameSettings.mistakesCounter}
        maxMistakes={maxMistakes}
        remainingLetters={gameSettings.remainingLetters}
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
