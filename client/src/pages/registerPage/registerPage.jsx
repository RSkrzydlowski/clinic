import React, { useState } from 'react';
import './registerPage.scss';
import { SERVER_URL } from '../../data/constant'
import { Button, FormElement } from '../../components'

const RegisterPage = () => {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

  const save = () => {
    const url = `${SERVER_URL}/api/users/register`
    if(name && email && password) {
      fetch(url, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password
        })
      }).then(async res => {
        const { success, error } = await res.json();
        if (!success) {
          alert(error);
        }
      })
    }

  };


  return (
    <form className="register_form">
      <FormElement text="Nazwa:" onChange={(e) => setName(e.target.value)} type="text" />
      <FormElement text="Email:" onChange={(e) => setEmail(e.target.value)} type="email" />
      <FormElement text="Hasło:" onChange={(e) => setPassword(e.target.value)} type="password" />
      <Button onClick={save} text="Zarejestruj" />
    </form>
   );
}

export default RegisterPage;
