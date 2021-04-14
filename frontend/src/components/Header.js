import logo from '../images/header.svg';
import { Link } from 'react-router-dom';

function Header(props) {

  return (
    <header className="header page__header">
      <img className="logo" src={logo} alt="Логотип" />
      <div className="header__container">
        <h2 className="header__email">{props.userEmail}</h2>
        <Link className="header__title" to={props.path} onClick={props.onClick} >{props.headerLink}</Link>
      </div>
    </header>
  )
}

export default Header;