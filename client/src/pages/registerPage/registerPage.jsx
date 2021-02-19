import React, { useState } from 'react';
import './registerPage.scss';
import { APP_URL } from '../../data/constant'

const RegisterPage = () => {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

  const save = () => {
    const url = `${APP_URL}/api/users/register`
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
      <p>
        Nazwa:
        <input onChange={(e) => setName(e.target.value)} type="text" />
      </p>
      <p>
        Email:
        <input onChange={(e) => setEmail(e.target.value)} type="email" />
      </p>
      <p>
        Hasło:
        <input onChange={(e) => setPassword(e.target.value)} type="password" />
      </p>
      <button onClick={save}>Zarejestruj</button>
    </form>
   );
}

export default RegisterPage;
