import {useState} from 'react';
import api from '../api/axios';
import {Link, useNavigate} from 'react-router-dom';
import './Auth.css';

export default function Register() {
  const [form, setForm] = useState({
    userName: '',
    email: '',
    mobileNo: '',
    age: '',
    gender: '',
    location: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm(prev => ({...prev, [name]: value}));
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/user/register', {
        ...form,
        age: Number(form.age),
      });
      navigate('/');
    } catch (err) {
      setError(
        err.response?.data?.error?.message ||
        'Something went wrong. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={submit}>
        <h2>Create Account</h2>
        <p className="subtitle">Join us and manage your profile</p>

        {error && <div className="error-box">{error}</div>}

        <input
          name="userName"
          placeholder="Full Name"
          value={form.userName}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="mobileNo"
          placeholder="Mobile Number"
          value={form.mobileNo}
          onChange={handleChange}
          required
        />

        <input
          name="age"
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
        />

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password (min 8 chars)"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Creating account...' : 'Register'}
        </button>

        <p className="footer-text">
          Already registered? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
}
