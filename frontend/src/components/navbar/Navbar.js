import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, setUser } from '../../redux/reducers';
import '../../Css/Global.css';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa'; 

const Navbar = () => {
  const token = useSelector(state => state.auth.token);
  const userName = useSelector(state => state.auth.user?.firstName); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/v1/user/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        const data = await response.json();
        if (response.ok) {
          dispatch(setUser(data.body)); 
        } else {
          console.error('Failed to fetch user profile:', data.message);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (token) {
      fetchUserProfile();
    }
  }, [token, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src="/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
      </Link>
      <div>
        {token ? (
          <div>
            <FaUserCircle />
            <span className="main-nav-item" style={{ marginLeft: '5px' }}>{userName}</span> 
            <button onClick={handleLogout} className="main-nav-item">
              <FaSignOutAlt />
              <span style={{ marginLeft: '5px' }}>Sign Out</span>
            </button>
          </div>
        ) : (
          <Link to="/login" className="main-nav-item">
            <FaUserCircle />
            <span style={{ marginLeft: '5px' }}>Sign In</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
