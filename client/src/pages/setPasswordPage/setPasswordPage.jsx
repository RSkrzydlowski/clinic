import React, {useState, useContext} from 'react';
import './setPasswordPage.scss'
import { Button, FormElement } from '../../components'
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
    <div className="set_password_page_block">
      <FormElement text="Stare hasło:" onChange={(e) => setOldPassword(e.target.value)} type="password"/>
      <FormElement text="Nowe hasło:" onChange={(e) => setNewPassword(e.target.value)} type="password"/>
      <FormElement text="Powtórz hasło:" onChange={(e) => setRepeatNewPassword(e.target.value)} type="password"/>
      <Button text="Zmień" onClick={changePassword} />
    </div>
   );
}

export default SetPasswordPage;
