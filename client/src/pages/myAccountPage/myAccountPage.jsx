import React, {useState} from 'react';
import './myAccountPage.scss'

const MyAccountPage = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  return isLoaded ? (
    <div>
      Moje konto
    </div>
   ) : null;
}

export default MyAccountPage;
