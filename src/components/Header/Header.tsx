import React from 'react';
import './Header.scss';

interface PropTypes {
  toggleGamePause: () => void;
}

const Header: React.FunctionComponent<PropTypes> = (props) => {
  const { toggleGamePause } = props;

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
