import React, {useState} from 'react';
import './myAccountPage.scss'
import { LoadingComponent } from '../../components';

const MyAccountPage = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  return isLoaded ? (
    <div>
      Moje konto
    </div>
   ) : <LoadingComponent isLoaded={isLoaded}/>;;
}

export default MyAccountPage;
