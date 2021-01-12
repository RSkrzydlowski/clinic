import React, { useState } from 'react';
import authService from "../../services/auth";
import './loginPage.scss';
// import { APP_URL } from '../../data/constant'

const LoginPage = () => {
  const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

  // const login = () => {
  //   const url = `${APP_URL}/api/users/login`
  //   if(name && email && password) {
  //     fetch(url, {
  //       method: "post",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         email,
  //         password
  //       })
  //     }).then(async res => {
  //       const { success, error } = await res.json();
  //       if (!success) {
  //         alert(error);
  //       } else {
  //         history.push("/users");
  //       }
  //     });
  //   }

  // };


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
      <button onClick={async ev => {
              ev.preventDefault();
              await authService.signIn({
                email: email,
                password: password
              });
            }}>Zaloguj</button>
    </form>
   );
}

export default LoginPage;
