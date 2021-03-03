import React from 'react';
import './Header.scss';

const Header: React.FunctionComponent<any> = ({
  toggleGamePause,
}) => {
  return (
    <header className='Header'>
      <button
        onClick={toggleGamePause}
        className='waves-effect waves-light btn'
      >
        <i className='material-icons'>pause_circle_outline</i>
        play/pause
      </button>
    </header>
  );
};

export default Header;
