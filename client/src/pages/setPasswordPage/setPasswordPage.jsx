import React, {useState, useContext} from 'react';
import './setPasswordPage.scss'
import { Button } from '../../components'
import { APP_URL } from '../../data/constant'
import { AuthContext } from '../../authentication';

const SetPasswordPage = () => {
  const { currentUser } = useContext(AuthContext);
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [repeatNewPassword, setRepeatNewPassword] = useState('')

  const changePassword = () => {
    if(oldPassword && newPassword && repeatNewPassword && newPassword === repeatNewPassword && oldPassword !== newPassword) {
      const url = `${APP_URL}/api/users/set-password`
        fetch(url, {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            _id: currentUser.id,
            oldPassword,
            newPassword
          })
        }).then(async res => {
          const { success, error } = await res.json();
          console.log(success)
          if (!success) {
            alert(error);
          }
        })
      }
  }

  return (
    <div>
      <p>
        Stare hasło:
        <input onChange={(e) => setOldPassword(e.target.value)} type="password" />
      </p>
      <p>
        Nowe hasło:
        <input onChange={(e) => setNewPassword(e.target.value)} type="password" />
      </p>
      <p>
        Powtórz nowe hasło:
        <input onChange={(e) => setRepeatNewPassword(e.target.value)} type="password" />
      </p>
      <Button text="Wyślij" onClick={changePassword} />
    </div>
   );
}

export default SetPasswordPage;
