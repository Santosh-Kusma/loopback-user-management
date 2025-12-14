import {useState} from 'react';
import api from '../api/axios';
import {useNavigate} from 'react-router-dom';
import './ChangePassword.css';

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters');
      return;
    }

    setLoading(true);
    try {
      await api.patch('/user/change-password', {
        oldPassword,
        newPassword,
      });
      navigate('/profile');
    } catch (err) {
      setError(
        err.response?.data?.error?.message ||
        'Failed to change password',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="change-container">
      <form className="change-card" onSubmit={submit}>
        <h2>Change Password</h2>
        <p className="change-subtitle">
          Keep your account secure
        </p>

        {error && <div className="change-error">{error}</div>}

        <input
          type="password"
          placeholder="Current Password"
          value={oldPassword}
          onChange={e => setOldPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          required
        />

        <div className="change-actions">
          <button
            type="submit"
            className="primary"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>

          <button
            type="button"
            className="secondary"
            onClick={() => navigate('/profile')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
