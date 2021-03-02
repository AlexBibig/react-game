import React from 'react';
import './GameOverWindow.scss';

interface PropTypes {
  gameStatus: string;
  setNewGame: any;
  keyWord?: string;
}

const GameOverWindow: React.FunctionComponent<PropTypes> = (
  props,
) => {
  const { gameStatus, setNewGame, keyWord } = props;
  return (
    <div className='GameOverWindow'>
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

export default GameOverWindow;
