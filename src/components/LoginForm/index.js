import React, { useState } from 'react';
import isEmailValid from '../../utils/isEmailValid';

export default function LoginForm() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  function isLoginValid() {
    const minPasswordLength = 6;
    const isUserEmailValid = isEmailValid(userEmail);
    const isUserPasswordValid = userPassword.length > minPasswordLength;

    return isUserEmailValid && isUserPasswordValid;
  }

  function handleEmailInputChange({ target }) {
    const { value } = target;

    setUserEmail(value);
  }

  function handlePasswordInputChange({ target }) {
    const { value } = target;

    setUserPassword(value);
  }

  return (
    <form>
      <input type="text" data-testid="email-input" onChange={ handleEmailInputChange } />
      <input
        type="password"
        data-testid="password-input"
        onChange={ handlePasswordInputChange }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ !isLoginValid() }
      >
        Enter
      </button>
    </form>
  );
}
