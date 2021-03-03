import React from 'react';
import './Footer.scss';

import rsSchoolLogo from '../../assets/img/rs_school_logo.svg';

const Footer: React.FunctionComponent = () => {
  return (
    <footer className='Footer'>
      <div>
        <p>@2021</p>
      </div>
      <div>
        <a href='https://github.com/AlexBibig'>
          github.com/AlexBibig
        </a>
      </div>
      <div>
        <a href='https://rs.school/js/'>
          <img src={rsSchoolLogo} alt='rollihg-scopes-school-logo' />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
