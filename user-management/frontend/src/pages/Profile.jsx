import {useEffect, useState} from 'react';
import api from '../api/axios';
import {logout} from '../auth/auth';
import {useNavigate} from 'react-router-dom';
import './Profile.css';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    api.get('/user/account')
      .then(res => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Session expired. Please login again.');
        logout();
        setLoading(false);
        setTimeout(() => navigate('/'), 1500);
      });
  }, []);

  if (loading) {
    return (
      <div className="profile-container">
        <div className="profile-card loading">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <div className="profile-card error">{error}</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar">
            {user.userName?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2>{user.userName}</h2>
            <p className="email">{user.email}</p>
          </div>
        </div>

        <div className="profile-details">
          <div>
            <span>Mobile</span>
            <p>{user.mobileNo || 'NA'}</p>
          </div>
          <div>
            <span>Age</span>
            <p>{user.age || 'NA'}</p>
          </div>
          <div>
            <span>Gender</span>
            <p>{user.gender || 'NA'}</p>
          </div>
          <div>
            <span>Location</span>
            <p>{user.location || 'NA'}</p>
          </div>
        </div>

        <div className="profile-actions">
          <button onClick={() => navigate('/update-profile')}>
            Edit Profile
          </button>
          <button onClick={() => navigate('/change-password')}>
            Change Password
          </button>
          <button className="logout" onClick={() => {
            logout();
            navigate('/');
          }}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
