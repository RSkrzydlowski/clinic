import React, {useContext} from 'react';
import './sidebar.scss';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { AuthContext } from '../../authentication';

const Sidebar = () => {
  const { currentUser } = useContext(AuthContext);
  return <div className="sidebar"> {currentUser && currentUser.role === 'admin' && (<div>
    <Link to="/admin" className="link">
      ADMIN
    </Link>
  </div>)}
  <Link to="/my-account" className="link">
    Moje konto
  </Link>
  <Link to="/my-visit" className="link">
    Moje wizyty
  </Link>
  <Link to="/doctor-list" className="link">
    Lekarze
  </Link>
  </div>
}

export default Sidebar;
