import React from "react";
import Header from './Header.js';

function Login({ onLogin }) {
  const [userEmail, setUserEmail] = React.useState('');
  const [userPassword, setUserPassword] = React.useState('');
  
  function handleSubmit(evt) {
    console.log(userEmail, userPassword)
    evt.preventDefault();
    onLogin({userEmail, userPassword});
    resetForm();
  }

  function handleChangeEmail(evt) {
    setUserEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setUserPassword(evt.target.value);
  }

  function resetForm() {
    setUserEmail('');
    setUserPassword('');
  }
  
  return (
    <div className="body-background">

      <div className="page">

        <Header headerLink={"Регистрация"} path={"/sign-up"} />

        <div className='authorization'>
          <h1 className='authorization__title'>Вход</h1>
          <form className="authorization__form" id="authorization-form" autoComplete="on" name="authorization-form" onSubmit={handleSubmit}>
            <fieldset className="authorization__container">
              <input className='authorization__input' placeholder='Email' onChange={handleChangeEmail} value={userEmail} type="email" required />
              <span className='authorization__input-error' id='email-input-error'></span>
              <input className='authorization__input' placeholder='Password' onChange={handleChangePassword} value={userPassword} type="password" required />
              <span className='authorization__input-error' id='password-input-error'></span>
            </fieldset>
            <button className="authorization__submit-button" type='submit'>Войти</button>
          </form>
        </div>

      </div>
    
    </div>

  )      
}

export default Login;
