import React from 'react';

import './PauseMenu.scss';

const PauseMenu: React.FunctionComponent<any> = ({
  toggleGamePause,
  toggleEasyMode,
}) => {
  return (
    <div className='PauseMenu'>
      <span>
        Game paused
        <button
          className='waves-effect waves-light btn'
          onClick={toggleGamePause}
        >
          *
        </button>
      </span>
      <span>
        Easy mode<button onClick={toggleEasyMode}>*</button>
      </span>
    </div>
  );
};

export default PauseMenu;
