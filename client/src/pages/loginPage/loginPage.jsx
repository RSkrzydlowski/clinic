import React, { useState } from 'react';
import authService from "../../services/auth";
import './loginPage.scss';
import { Button, LinkButton, FormElement } from '../../components'

const LoginPage = ({history}) => {
  const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');


  return (
    <form className="login_form">
      <FormElement text="Email:" onChange={(e) => setEmail(e.target.value)} type="email"/>
      <FormElement text="Hasło:" onChange={(e) => setPassword(e.target.value)} type="password"/>
      <LinkButton text="Nie pamietasz hasła?" link="/reset-password"/>
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
