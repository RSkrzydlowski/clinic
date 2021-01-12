import React, {useContext} from 'react';
import './sidebar.scss';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { AuthContext } from '../../authentication';

const Sidebar = () => {
  // const { currentUser } = useContext(AuthContext);

  return (
    <div className="sidebar">
      {/* {currentUser && currentUser.role === 'admin' && (<div>
        <Link to="/admin" className="link">
				  ADMIN
			  </Link>
      </div>)} */}
      <Link to="/flashcards" className="link">
				Test 1
			</Link>
      <Link to="/course" className="link">
				Test 2
			</Link>
    </div>
   );
}

export default Sidebar;
