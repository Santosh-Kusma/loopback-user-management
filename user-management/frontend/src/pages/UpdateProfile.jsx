import {useEffect, useState} from 'react';
import api from '../api/axios';
import {useNavigate} from 'react-router-dom';
import {logout} from '../auth/auth';
import './UpdateProfile.css';

export default function UpdateProfile() {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    api.get('/user/account')
      .then(res => {
        setFormData(res.data);
        setLoading(false);
      })
      .catch(() => {
        logout();
        navigate('/');
      });
  }, []);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      await api.patch('/user/update-details', {
        userName: formData.userName,
        mobileNo: formData.mobileNo,
        gender: formData.gender,
        age: Number(formData.age),
        location: formData.location,
      });
      navigate('/profile');
    } catch (err) {
      setError(
        err.response?.data?.error?.message ||
        'Failed to update profile',
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="update-container">
        <div className="update-card">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="update-container">
      <form className="update-card" onSubmit={submit}>
        <h2>Update Profile</h2>

        {error && <div className="update-error">{error}</div>}

        <input
          name="userName"
          placeholder="Full Name"
          value={formData.userName || ''}
          onChange={handleChange}
          required
        />

        <input
          name="mobileNo"
          placeholder="Mobile Number"
          value={formData.mobileNo || ''}
          onChange={handleChange}
        />

        <select
          name="gender"
          value={formData.gender || ''}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input
          name="age"
          type="number"
          placeholder="Age"
          value={formData.age || ''}
          onChange={handleChange}
        />

        <input
          name="location"
          placeholder="Location"
          value={formData.location || ''}
          onChange={handleChange}
        />

        <div className="update-actions">
          <button type="submit" className="primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
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
