import logo from '../images/logo.svg';
import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="header">
        <a href="#" className="header__link">
          <img src={logo} alt="mesto" className="header__logo" />
        </a>
      </header>
    );
  }
}

export default Header;
