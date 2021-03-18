import React from 'react';
import { useTransition, animated } from 'react-spring';
import { Zoom } from 'react-awesome-reveal';
import './Indicators.scss';

interface PropTypes {
  mistakesCounter: number;
  maxMistakes: number;
  score: number;
  countryFlag: string;
  guessedWords: number;
}

const Indicators: React.FunctionComponent<PropTypes> = (props) => {
  const {
    mistakesCounter,
    maxMistakes,
    score,
    countryFlag,
    guessedWords,
  } = props;

  const transitions = useTransition(
    countryFlag,
    (item: string) => item,
    {
      from: { position: 'absolute', opacity: 0, transition: '0.3s' },
      enter: { opacity: 1, transition: '0.3s' },
      leave: { opacity: 0, transition: '0.3s' },
    },
  );

  return (
    <div className='Indicators'>
      <Zoom style={{ width: '100%' }}>
        <div className='statistics'>
          <p>
            Mistakes: {mistakesCounter} of {maxMistakes}
          </p>
          <p>Score: {score}</p>
          <p>Guessed countries: {guessedWords}</p>
        </div>
      </Zoom>

      <div className='flag'>
        {transitions.map(({ item, props, key }) => (
          <animated.img
            key={key}
            style={props}
            src={item}
            alt='flag'
          />
        ))}
      </div>
    </div>
  );
};

export default Indicators;
