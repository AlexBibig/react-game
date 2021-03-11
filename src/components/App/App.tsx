import React, { useState, useEffect } from 'react';
import Game from '../Game';
import PauseMenu from '../PauseMenu';
import { getAllCountries } from '../API';
import './App.scss';
import { DefaultSettingsTypes, KeyWordTypes } from '../types';
import mainTheme from '../../assets/sounds/main.mp3';
import useSound from 'use-sound';

const App: React.FC = () => {
  const [countriesArr, setCoutnriesArr] = useState([]);

  const [keyWord, setKeyWord] = useState<KeyWordTypes>({
    countryName: 'none',
    countryFlag: '',
  });

  const [
    defaultSettings,
    setDefaultSettings,
  ] = useState<DefaultSettingsTypes>(() => {
    return {
      gamePaused: true,
      easyMode: true,
      freeVowels: true,
      volume: 1,
      muted: false,
      music: false,
    };
  });

  const maxMistakes: number = defaultSettings.easyMode ? 6 : 4;

  const [playMainTheme, { stop }] = useSound(mainTheme, {
    volume: defaultSettings.muted ? 0 : defaultSettings.volume,
  });

  useEffect(() => {
    getAllCountries().then((countries: any) =>
      setCoutnriesArr(countries),
    );

    if (countriesArr.length) {
      getNewCountry();
    }
  }, []);

  useEffect(() => {
    if (defaultSettings.music === true) {
      playMainTheme();
    } else {
      stop();
    }
  }, [defaultSettings.music]);

  const getNewCountry = (array: any = countriesArr): void => {
    const country =
      array[Math.floor(Math.random() * countriesArr.length)];

    setKeyWord({
      countryName: country.name.trim().toLowerCase(),
      countryFlag: country.flag,
    });

    setCoutnriesArr((prev) => {
      return prev.filter((el) => el !== country);
    });
  };

  const setVolumeLevel = (value: number): void => {
    setDefaultSettings((prevState: DefaultSettingsTypes) => {
      return {
        ...prevState,
        volume: value,
      };
    });
  };

  const setMuted = (): void => {
    setDefaultSettings((prevState: DefaultSettingsTypes) => {
      return {
        ...prevState,
        muted: !prevState.muted,
      };
    });
  };

  const setMusic = (): void => {
    setDefaultSettings((prevState: DefaultSettingsTypes) => {
      return {
        ...prevState,
        music: !prevState.music,
      };
    });
  };

  const toggleGamePause = (): void => {
    setDefaultSettings((prevState: DefaultSettingsTypes) => {
      return {
        ...prevState,
        gamePaused: !prevState.gamePaused,
      };
    });
  };

  const toggleFreeVowels = (): void => {
    setDefaultSettings((prevState: DefaultSettingsTypes) => {
      return {
        ...prevState,
        freeVowels: !prevState.freeVowels,
      };
    });
  };

  const toggleEasyMode = (): void => {
    setDefaultSettings((prevState: DefaultSettingsTypes) => {
      return {
        ...prevState,
        easyMode: !prevState.easyMode,
      };
    });
  };

  console.log(countriesArr);

  return (
    <div className='App'>
      <main className='container'>
        <button
          onClick={toggleGamePause}
          className=' btn-large btn-floating waves-effect waves-light btn button-pause'
        >
          <i className='material-icons'>not_started</i>
        </button>

        {!defaultSettings.gamePaused ? (
          <Game
            countryName={keyWord.countryName}
            countryFlag={keyWord.countryFlag}
            maxMistakes={maxMistakes}
            easyMode={defaultSettings.easyMode}
            freeVowels={defaultSettings.freeVowels}
            volumeLevel={defaultSettings.volume}
            muted={defaultSettings.muted}
            setCountry={getNewCountry}
          />
        ) : (
          <PauseMenu
            easyMode={defaultSettings.easyMode}
            freeVowels={defaultSettings.freeVowels}
            volumeLevel={defaultSettings.volume}
            muted={defaultSettings.muted}
            music={defaultSettings.music}
            toggleEasyMode={toggleEasyMode}
            toggleFreeVowels={toggleFreeVowels}
            toggleGamePause={toggleGamePause}
            setCountry={getNewCountry}
            setVolumeLevel={setVolumeLevel}
            setMuted={setMuted}
            setMusic={setMusic}
          />
        )}
      </main>
    </div>
  );
};

export default App;
