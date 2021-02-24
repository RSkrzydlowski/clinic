import React, { useState } from 'react';
import authService from "../../services/auth";
import './loginPage.scss';
import { Button } from '../../components'

const LoginPage = ({history}) => {
  const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');


  return (
    <form className="login_form">
      <p>
        Email:
        <input onChange={(e) => setEmail(e.target.value)} type="email" name="name" />
      </p>
      <p>
        Hasło:
        <input onChange={(e) => setPassword(e.target.value)} type="password" name="name" />
      </p>
      <p>Reset hasła</p>
      <Button
      text="Zaloguj"
      onClick={async ev => {
              ev.preventDefault();
              await authService.signIn({
                email: email,
                password: password
              });
            }}/>
    </form>
   );
}

export default LoginPage;
