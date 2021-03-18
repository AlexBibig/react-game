import React from 'react';
import './FinalPopUp.scss';

interface PropTypes {
  gameStatus: string;
  setNewGame: () => void;
  keyWord?: string;
}

const FinalPopUp: React.FunctionComponent<PropTypes> = (props) => {
  const { gameStatus, setNewGame, keyWord } = props;

  return (
    <div className='FinalPopUp'>
      <h2>
        {gameStatus === 'game-status win' ? 'You win' : 'You lose'}
      </h2>
      <p>
        {gameStatus === 'game-status win'
          ? 'Try to guess the next country'
          : `Сorrect answer: ${keyWord}`}
      </p>
      <button
        onClick={() => {
          setNewGame();
        }}
      >
        {gameStatus === 'game-status win'
          ? 'Next round'
          : 'Try again'}
      </button>
    </div>
  );
};

export default FinalPopUp;
