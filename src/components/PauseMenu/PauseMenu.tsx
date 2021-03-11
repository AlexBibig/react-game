import React from 'react';
import './PauseMenu.scss';

interface PropTypes {
  toggleGamePause: () => void;
  toggleEasyMode: () => void;
  toggleFreeVowels: () => void;
  setCountry: () => void;
  easyMode: boolean;
  freeVowels: boolean;
  volumeLevel: number;
  setVolumeLevel: any;
  setMuted: () => void;
  muted: boolean;
  setMusic: () => void;
  music: boolean;
}

const PauseMenu: React.FunctionComponent<PropTypes> = (props) => {
  const {
    toggleGamePause,
    toggleEasyMode,
    toggleFreeVowels,
    setCountry,
    easyMode,
    freeVowels,
    volumeLevel,
    setVolumeLevel,
    setMuted,
    muted,
    setMusic,
    music,
  } = props;

  return (
    <div className='PauseMenu'>
      <div className='settings-block'>
        <button
          onClick={() => {
            setCountry();
            toggleGamePause();
            localStorage.clear();
          }}
          className='waves-effect waves-light btn'
        >
          New game
        </button>

        <span className='switch'>
          Easy mode
          <label>
            <input
              onChange={toggleEasyMode}
              checked={easyMode}
              type='checkbox'
            />
            <span className='lever'></span>
          </label>
        </span>

        <span className='switch'>
          Free vowels
          <label>
            <input
              onChange={toggleFreeVowels}
              checked={freeVowels}
              type='checkbox'
            />
            <span className='lever'></span>
          </label>
        </span>
      </div>

      <div className='sound-block'>
        <button
          onClick={() => {
            setMuted();
          }}
          className=' btn-large btn-floating waves-effect waves-light btn button-mute'
        >
          {muted ? (
            <i className='material-icons'>volume_off</i>
          ) : (
            <i className='material-icons'>volume_mute</i>
          )}
        </button>

        <input
          type='range'
          className='volume-level'
          min={0}
          max={1}
          step={0.02}
          value={volumeLevel}
          onChange={(event) => {
            setVolumeLevel(event.target.valueAsNumber);
          }}
        />

        <button
          onClick={() => {
            setMusic();
          }}
          className=' btn-large btn-floating waves-effect waves-light btn button-music'
        >
          {music ? (
            <i className='material-icons'>music_note</i>
          ) : (
            <i className='material-icons'>music_off</i>
          )}
        </button>
      </div>
    </div>
  );
};

export default PauseMenu;
