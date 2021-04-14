import React from "react";
import Header from './Header.js';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  const [userEmail, setUserEmail] = React.useState('');
  const [userPassword, setUserPassword] = React.useState('');
  
  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister({userPassword, userEmail});
  }

  function handleChangeEmail(evt) {
    setUserEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setUserPassword(evt.target.value);
  }

  return (
    <div className="body-background">

      <div className="page">

        <Header headerLink={"Вход"} path={"/sign-in"} />

        <div className="authorization">
          <h1 className="authorization__title">Регистрация</h1>
          <form className="authorization__form" id="authorization-form" autoComplete="on" name="authorization-form" onSubmit={handleSubmit}>
            <fieldset className="authorization__container">
              <input className='authorization__input' placeholder='Email' onChange={handleChangeEmail} value={userEmail} name="email" type="email" required />
              <span className='authorization__input-error' id='email-input-error'></span>
              <input className='authorization__input' placeholder='Password' onChange={handleChangePassword} value={userPassword} name="password" type="password" required />
              <span className='authorization__input-error' id='password-input-error'></span>
            </fieldset>
            <button className="authorization__submit-button" type='submit'>Зарегистрироваться</button>
          </form>
          <h2 className="authorization__text">Уже зарегистрированы? <Link to="/sign-in" className="authorization__link">Войти</Link></h2>
        </div>

      </div>
    
    </div>
  )      
}

export default Register;
