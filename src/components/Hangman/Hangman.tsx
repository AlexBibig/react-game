import React from 'react';
import './Hangman.scss';
import { useTransition, animated } from 'react-spring';
import { Spring } from 'react-spring/renderprops';

import hangman0 from '../../assets/img/Hangman-0.png';
import hangman1 from '../../assets/img/Hangman-1.png';
import hangman2 from '../../assets/img/Hangman-2.png';
import hangman3 from '../../assets/img/Hangman-3.png';
import hangman4 from '../../assets/img/Hangman-4.png';
import hangman5 from '../../assets/img/Hangman-5.png';
import hangman6 from '../../assets/img/Hangman-6.png';
import success from '../../assets/img/Success.png';

interface PropTypes {
  mistakesCounter: number;
  remainingLetters: any;
  easyMode: boolean;
}

const Hangman: React.FunctionComponent<PropTypes> = (props) => {
  const { mistakesCounter, remainingLetters, easyMode } = props;

  const winImage: string = success;
  const imagesArr: Array<string> = easyMode
    ? [
        hangman0,
        hangman1,
        hangman2,
        hangman3,
        hangman4,
        hangman5,
        hangman6,
      ]
    : [hangman2, hangman3, hangman4, hangman5, hangman6];

  const transitions = useTransition(
    imagesArr[mistakesCounter],
    (item) => item,
    {
      from: { opacity: 0, transition: '0.3s' },
      enter: { opacity: 1, transition: '0.3s' },
      leave: { opacity: 0, transition: '0.3s' },
    },
  );

  return (
    <div className='Hangman'>
      {remainingLetters.length !== 0 ? (
        transitions.map(({ item, props, key }) => (
          <animated.img
            className='hangman-image'
            key={key}
            style={props}
            src={item}
            alt='hangman'
          />
        ))
      ) : (
        <Spring
          from={{ opacity: 0, transition: '0.3s' }}
          to={{ opacity: 1, transition: '0.3s' }}
        >
          {(props) => (
            <div style={props}>
              <img
                src={winImage}
                className='hangman-image win'
                alt='Hangman'
              />
            </div>
          )}
        </Spring>
      )}
    </div>
  );
};

export default Hangman;
