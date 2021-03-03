import React from 'react';

import './PauseMenu.scss';

const PauseMenu: React.FunctionComponent<any> = ({
  toggleGamePause,
  toggleEasyMode,
  toggleFreeVowels,
  toggleEuropeanCountries,
  setCountry,
  easyMode,
  freeVowels,
  europeanCountries,
}) => {
  return (
    <div className='PauseMenu'>
      <button
        onClick={() => {
          setCountry();
          toggleGamePause();
        }}
        className='waves-effect waves-light btn'
      >
        <i className='material-icons'>autorenew</i>
        refresh the country
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

      <span className='switch'>
        Only European countries
        <label>
          <input
            onChange={toggleEuropeanCountries}
            checked={europeanCountries}
            type='checkbox'
          />
          <span className='lever'></span>
        </label>
      </span>
    </div>
  );
};

export default PauseMenu;
