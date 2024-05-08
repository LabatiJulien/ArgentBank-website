import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, setUser } from '../../redux/reducers';
import '../../Css/Global.css';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa'; 

const Navbar = () => {
  // Utilisation de useSelector pour accéder au token et au profil utilisateur
  const token = useSelector(state => state.auth.token);
  const user = useSelector(state => state.auth.user); 

  // Utilisation de useDispatch pour dispatch les actions Redux
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      // Si l'utilisateur est déjà présent dans le store Redux, pas besoin de refaire la requête
      if (user) {
        return;
      }
      
      try {
        // Appel à l'API pour récupérer le profil utilisateur
        const response = await fetch('http://localhost:3001/api/v1/user/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        const data = await response.json();
        
        // Si la réponse est OK, on met à jour le store Redux avec les données du profil
        if (response.ok) {
          dispatch(setUser(data.body)); 
        } else {
          console.error('Failed to fetch user profile:', data.message);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    // Si un token est présent, on charge le profil utilisateur
    if (token) {
      fetchUserProfile();
    }
  }, [token, user, dispatch]);

  // Fonction pour gérer la déconnexion de l'utilisateur
  const handleLogout = () => {
    dispatch(logout()); // Dispatch l'action de déconnexion
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
        {/* Si un token est présent, affiche le nom d'utilisateur et le bouton de déconnexion */}
        {token && user ? (
          <div>
            <FaUserCircle /> 
            <span className="main-nav-item" style={{ marginLeft: '5px' }}>{user.userName}</span> 
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
