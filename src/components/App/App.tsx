import React, { useState, useEffect } from 'react';
import HangmanGame from '../HangmanGame';
import PauseMenu from '../PauseMenu';
import rsSchoolLogo from '../../assets/img/rs_school_logo.svg';
import { getCountry } from '../words';

import './App.scss';

interface defaultSettingsTypes {
  gamePaused: boolean;
  easyMode: boolean;
  freeVowels: boolean;
  darkMode: boolean;
  sound: boolean;
}

const App: React.FunctionComponent = () => {
  const [
    defaultSettings,
    setDefaultSettings,
  ] = useState<defaultSettingsTypes>(() => {
    return {
      gamePaused: true,
      easyMode: true,
      freeVowels: true,
      darkMode: false,
      sound: true,
    };
  });

  const [keyWord, setKeyWord] = useState<any>({
    countryName: 'none',
    countryFlag: '',
  });

  const maxMistakes: number = defaultSettings.easyMode ? 6 : 4;

  useEffect(() => {
    setCountry();
  }, []);

  const setCountry = async () => {
    await getCountry().then((country) => {
      setKeyWord({
        countryName: country.name.trim().toLowerCase(),
        countryFlag: country.flag,
      });
    });
  };

  const toggleGamePause = () => {
    setDefaultSettings((prevState: defaultSettingsTypes) => {
      return {
        ...prevState,
        gamePaused: !prevState.gamePaused,
      };
    });
  };

  const toggleEasyMode = () => {
    setDefaultSettings((prevState: defaultSettingsTypes) => {
      return {
        ...prevState,
        easyMode: !prevState.easyMode,
      };
    });
  };

  return (
    <div className='App'>
      <div className='container'>
        {!defaultSettings.gamePaused ? (
          <HangmanGame
            countryName={keyWord.countryName}
            countryFlag={keyWord.countryFlag}
            maxMistakes={maxMistakes}
            easyMode={defaultSettings.easyMode}
            setCountry={setCountry}
          />
        ) : (
          <PauseMenu
            toggleGamePause={toggleGamePause}
            toggleEasyMode={toggleEasyMode}
          />
        )}
      </div>

      <footer>
        <div>
          <p>2021</p>
        </div>
        <div>
          <a href='https://github.com/AlexBibig'>
            github.com/AlexBibig
          </a>
        </div>
        <div>
          <img src={rsSchoolLogo} alt='' />
        </div>
      </footer>
    </div>
  );
};

export default App;
