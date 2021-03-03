import React, { useState, useLayoutEffect } from 'react';
import Game from '../Game';
import PauseMenu from '../PauseMenu';
import Footer from '../Footer';
import Header from '../Header';
import { getAllCountries, getEuropeanCountries } from '../API';
import './App.scss';

interface defaultSettingsTypes {
  gamePaused: boolean;
  easyMode: boolean;
  freeVowels: boolean;
  europeanCountries: boolean;
  volume: number;
  muted: boolean;
  music: boolean;
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
      europeanCountries: false,
      volume: 1,
      muted: false,
      music: true,
    };
  });

  const [keyWord, setKeyWord] = useState<any>({
    countryName: 'none',
    countryFlag: '',
  });

  const maxMistakes: number = defaultSettings.easyMode ? 6 : 4;

  useLayoutEffect(() => {
    const keyWord: any = localStorage.getItem('keyWord') || null;
    if (keyWord) {
      setKeyWord(JSON.parse(keyWord));
    } else {
      setCountry();
      localStorage.clear();
    }
    const defaultSettings: any =
      localStorage.getItem('defaultSettings') || null;
    if (defaultSettings) {
      setDefaultSettings(JSON.parse(defaultSettings));
    }
  }, []);

  useLayoutEffect(() => {
    localStorage.setItem(
      'defaultSettings',
      JSON.stringify(defaultSettings),
    );
    localStorage.setItem('keyWord', JSON.stringify(keyWord));
  }, [defaultSettings, keyWord]);

  const setCountry = async () => {
    const getCountry = !defaultSettings.europeanCountries
      ? getAllCountries
      : getEuropeanCountries;

    await getCountry().then((country) => {
      setKeyWord({
        countryName: country.name.trim().toLowerCase(),
        countryFlag: country.flag,
      });
    });
  };

  const setVolumeLevel = (value: any) => {
    setDefaultSettings((prevState: defaultSettingsTypes) => {
      return {
        ...prevState,
        volume: value,
      };
    });
  };

  const setMuted = () => {
    setDefaultSettings((prevState: defaultSettingsTypes) => {
      return {
        ...prevState,
        muted: !prevState.muted,
      };
    });
  };

  const setMusic = () => {
    setDefaultSettings((prevState: defaultSettingsTypes) => {
      return {
        ...prevState,
        music: !prevState.music,
      };
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

  const toggleFreeVowels = () => {
    setDefaultSettings((prevState: defaultSettingsTypes) => {
      return {
        ...prevState,
        freeVowels: !prevState.freeVowels,
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

  const toggleEuropeanCountries = () => {
    setDefaultSettings((prevState: defaultSettingsTypes) => {
      return {
        ...prevState,
        europeanCountries: !prevState.europeanCountries,
      };
    });
  };

  return (
    <div className='App'>
      <Header
        toggleGamePause={toggleGamePause}
        volumeLevel={defaultSettings.volume}
        setVolumeLevel={setVolumeLevel}
        setMuted={setMuted}
        muted={defaultSettings.muted}
        music={defaultSettings.music}
        setMusic={setMusic}
      />

      <main className='container'>
        {!defaultSettings.gamePaused ? (
          <Game
            countryName={keyWord.countryName}
            countryFlag={keyWord.countryFlag}
            maxMistakes={maxMistakes}
            easyMode={defaultSettings.easyMode}
            freeVowels={defaultSettings.freeVowels}
            setCountry={setCountry}
            volumeLevel={defaultSettings.volume}
            muted={defaultSettings.muted}
          />
        ) : (
          <PauseMenu
            toggleEasyMode={toggleEasyMode}
            toggleFreeVowels={toggleFreeVowels}
            toggleEuropeanCountries={toggleEuropeanCountries}
            toggleGamePause={toggleGamePause}
            setCountry={setCountry}
            easyMode={defaultSettings.easyMode}
            freeVowels={defaultSettings.freeVowels}
            europeanCountries={defaultSettings.europeanCountries}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
