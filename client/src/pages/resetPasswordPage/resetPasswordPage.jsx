import React, { useState } from 'react';
import './resetPasswordPage.scss'
import { Button, FormElement } from '../../components'
import { APP_URL } from '../../data/constant'

const ResetPasswordPage = () => {
  const [ email, setEmail ] = useState('');

  const send = () => {
    if(email) {
      const url = `${APP_URL}/api/reset-passwords/send-email-reset-password`
      fetch(url, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email
        })
      }).then(async res => {
        const { success, error } = await res.json();
        if (!success) {
          alert(error);
        }
      })
    }
  }


  return (
    <div className="reset_password_block">
      <FormElement text="Email:" onChange={(e) => setEmail(e.target.value)} type="email" />
      <Button
      text="Wyślij"
      onClick={send}/>
    </div>
   );
}

export default ResetPasswordPage;
