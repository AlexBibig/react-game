import React, { useState } from 'react';

interface PropTypes {
  onAdd(title: string): void;
  name?: string;
}

const TodoForm: React.FunctionComponent<PropTypes> = (props) => {
  const [title, setTitle] = useState<string>('');

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const keyPressHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const shouldAdd = window.confirm('Add this todo?');
      if (shouldAdd) {
        props.onAdd(title);
        setTitle('');
      }
    }
  };

  return (
    <div className='TodoForm input-field'>
      <input
        type='text'
        id='title'
        value={title}
        onChange={changeHandler}
        onKeyPress={keyPressHandler}
      />
      <label htmlFor='title' className='active'>
        Your task
      </label>
    </div>
  );
};

export default TodoForm;

// import React, { useState, useEffect } from 'react';
// import MainPicture from '../MainPicture';
// import Keyboard from '../Keyboard';
// import HiddenWord from '../HiddenWord';
// import GameInfo from '../GameInfo';
// import GameOverWindow from '../GameOverWindow';
// import './HangmanGame.scss';
// import { Fade } from 'react-awesome-reveal';
// import { getCountry } from '../words';

// interface PropTypes {
//   maxMistakes: number;
//   easyMode: boolean;
//   countryName: string;
//   countryFlag: string;
//   setCountry: any;
// }

// interface KeyWordTypes {
//   countryName: string;
//   countryFlag: string;
// }

// const HangmanGame: React.FunctionComponent<PropTypes> = (props) => {
//   const {
//     maxMistakes,
//     easyMode,
//     countryName,
//     countryFlag,
//     setCountry,
//   } = props;
//   // const [keyWord, setKeyWord] = useState<KeyWordTypes>({
//   //   countryName: 'none',
//   //   countryFlag: '',
//   // });
//   const [mistakesCounter, setMistakesCounter] = useState<number>(0);
//   const [score, setScore] = useState<number>(0);
//   const [pushedLetters, setPushedLetters] = useState<any>(new Set());
//   // const [remainingLetters, setRemainingLetters] = useState<any>(
//   //   new Set(keyWord.countryName.split('')),
//   // );

//   const [remainingLetters, setRemainingLetters] = useState<any>(
//     new Set(countryName.trim().toLowerCase().split('')),
//   );

//   useEffect(() => {
//     setRemainingLetters(
//       new Set(countryName.trim().toLowerCase().split('')),
//     );
//   }, [countryName]);

//   // const setCountry = async () => {
//   //   await getCountry().then((country) => {
//   //     setKeyWord({
//   //       countryName: country.name.trim().toLowerCase(),
//   //       countryFlag: country.flag,
//   //     });
//   //     setRemainingLetters(
//   //       new Set(country.name.trim().toLowerCase().split('')),
//   //     );
//   //     setPushedLetters(new Set());
//   //   });
//   // };

//   const handleGuess = (e: any) => {
//     const letter: string = e.target.innerHTML;
//     setPushedLetters(pushedLetters.add(letter));
//     if (remainingLetters.has(letter)) {
//       setRemainingLetters((prevSet: any) => {
//         prevSet.delete(letter);
//         return prevSet;
//       });
//       setScore((prevValue: number) => prevValue + 100);
//     } else {
//       setScore((prevValue: number) => prevValue - 10);
//       if (e.target.id !== 'vowel') {
//         setMistakesCounter((prevValue: number) => prevValue + 1);
//       }
//     }
//   };

//   const setNewGame = () => {
//     if (mistakesCounter >= maxMistakes) {
//       setScore(0);
//     }
//     setCountry();
//     setMistakesCounter(0);

//     setPushedLetters(new Set());
//   };

//   const checkGameStatus = () => {
//     if (mistakesCounter < maxMistakes) {
//       if (!remainingLetters.size) {
//         return (
//           <GameOverWindow
//             gameStatus={'game-status win'}
//             setNewGame={setNewGame}
//             keyWord={countryName.toUpperCase()}
//           />
//         );
//       }
//     } else {
//       return (
//         <GameOverWindow
//           gameStatus={'game-status lose'}
//           setNewGame={setNewGame}
//           keyWord={countryName.toUpperCase()}
//         />
//       );
//     }
//   };

//   console.log(countryName);
//   console.log(pushedLetters);
//   console.log(remainingLetters);

//   return (
//     <div className='HangmanGame'>
//       <MainPicture
//         mistakesCounter={mistakesCounter}
//         remainingLetters={remainingLetters}
//         easyMode={easyMode}
//       />

//       <HiddenWord
//         keyWord={countryName}
//         remainingLetters={remainingLetters}
//       />

//       <GameInfo
//         mistakesCounter={mistakesCounter}
//         maxMistakes={maxMistakes}
//         score={score}
//         countryFlag={countryFlag}
//       />

//       <Keyboard
//         handleGuess={handleGuess}
//         pushedLetters={pushedLetters}
//         mistakesCounter={mistakesCounter}
//         maxMistakes={maxMistakes}
//         remainingLetters={remainingLetters}
//       />

//       <Fade
//         delay={1000}
//         duration={1000}
//         direction={'down'}
//         style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         {checkGameStatus()}
//       </Fade>
//     </div>
//   );
// };

// export default HangmanGame;

// import React, { useState, useEffect } from 'react';
// import HangmanGame from '../HangmanGame';
// import PauseMenu from '../PauseMenu';
// import rsSchoolLogo from '../../assets/img/rs_school_logo.svg';
// import { getCountry } from '../words';

// import './App.scss';

// interface defaultSettingsTypes {
//   gamePaused: boolean;
//   easyMode: boolean;
//   freeVowels: boolean;
//   darkMode: boolean;
//   sound: boolean;
// }

// const App: React.FunctionComponent = () => {
//   const [
//     defaultSettings,
//     setDefaultSettings,
//   ] = useState<defaultSettingsTypes>(() => {
//     return {
//       gamePaused: true,
//       easyMode: true,
//       freeVowels: true,
//       darkMode: false,
//       sound: true,
//     };
//   });

//   const [keyWord, setKeyWord] = useState<any>({
//     countryName: 'none',
//     countryFlag: '',
//   });

//   const maxMistakes: number = defaultSettings.easyMode ? 6 : 4;

//   useEffect(() => {
//     setCountry();
//   }, []);

//   const setCountry = async () => {
//     await getCountry().then((country) => {
//       setKeyWord({
//         countryName: country.name.trim().toLowerCase(),
//         countryFlag: country.flag,
//       });
//     });
//   };

//   const toggleGamePause = () => {
//     setDefaultSettings((prevState: defaultSettingsTypes) => {
//       return {
//         ...prevState,
//         gamePaused: !prevState.gamePaused,
//       };
//     });
//   };

//   const toggleEasyMode = () => {
//     setDefaultSettings((prevState: defaultSettingsTypes) => {
//       return {
//         ...prevState,
//         easyMode: !prevState.easyMode,
//       };
//     });
//   };

//   return (
//     <div className='App'>
//       <div className='container'>
//         {!defaultSettings.gamePaused ? (
//           <HangmanGame
//             countryName={keyWord.countryName}
//             countryFlag={keyWord.countryFlag}
//             maxMistakes={maxMistakes}
//             easyMode={defaultSettings.easyMode}
//             setCountry={setCountry}
//           />
//         ) : (
//           <PauseMenu
//             toggleGamePause={toggleGamePause}
//             toggleEasyMode={toggleEasyMode}
//           />
//         )}
//       </div>

//       <footer>
//         <div>
//           <p>2021</p>
//         </div>
//         <div>
//           <a href='https://github.com/AlexBibig'>
//             github.com/AlexBibig
//           </a>
//         </div>
//         <div>
//           <img src={rsSchoolLogo} alt='' />
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default App;
