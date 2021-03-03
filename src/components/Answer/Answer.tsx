import React from 'react';
import './Answer.scss';
import { Fade } from 'react-awesome-reveal';

interface PropTypes {
  keyWord: string;
  remainingLetters: Array<string>;
}

const Answer: React.FunctionComponent<PropTypes> = (props) => {
  const { keyWord, remainingLetters } = props;

  return (
    <div className='Answer'>
      <Fade direction={'up'}>
        <ul>
          {keyWord.split('').map((el: string, index: number) => {
            return (
              <li
                key={index}
                className={
                  remainingLetters.includes(el)
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

export default Answer;
