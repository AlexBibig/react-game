import React from 'react';
import './HiddenWord.scss';
import { Fade } from 'react-awesome-reveal';

interface PropTypes {
  keyWord: string;
  remainingLetters: any;
}

const HiddenWord: React.FunctionComponent<PropTypes> = (props) => {
  const { keyWord, remainingLetters } = props;
  return (
    <div className='HiddenWord'>
      <Fade direction={'up'}>
        <ul>
          {keyWord.split('').map((el: string, index: number) => {
            return (
              <li
                key={index}
                className={
                  remainingLetters.has(el)
                    ? 'closed-letter'
                    : 'open-letter'
                }
              >
                <span>{el.toUpperCase()}</span>
              </li>
            );
          })}
        </ul>
      </Fade>
    </div>
  );
};

export default HiddenWord;
