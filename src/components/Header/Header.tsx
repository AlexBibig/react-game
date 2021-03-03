import React, { useEffect } from 'react';
import './Header.scss';

import useSound from 'use-sound';
import mainTheme from '../../assets/sounds/main.mp3';

interface PropTypes {
  toggleGamePause: () => void;
  volumeLevel: number;
  setVolumeLevel: any;
  setMuted: () => void;
  muted: boolean;
  setMusic: () => void;
  music: boolean;
}

const Header: React.FunctionComponent<PropTypes> = (props) => {
  const {
    toggleGamePause,
    volumeLevel,
    setVolumeLevel,
    setMuted,
    muted,
    setMusic,
    music,
  } = props;

  const [playMainTheme, { stop }] = useSound(mainTheme, {
    volume: muted ? 0 : volumeLevel,
  });

  useEffect(() => {
    if (music === true) {
      playMainTheme();
    } else {
      stop();
    }
  }, [music]);

  return (
    <header className='Header'>
      <button
        onClick={toggleGamePause}
        className=' btn-large btn-floating waves-effect waves-light btn button-pause'
      >
        <i className='material-icons'>not_started</i>
      </button>

      <button
        onClick={() => {
          setMuted();
        }}
        className=' btn-large btn-floating waves-effect waves-light btn button-mute'
      >
        {muted ? (
          <i className='material-icons'>volume_mute</i>
        ) : (
          <i className='material-icons'>volume_off</i>
        )}
      </button>

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
    </header>
  );
};

export default Header;
