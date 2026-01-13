import './loginpage.css';
import { useState } from 'react';
import axios from 'axios';
import Login from '../../Login';

export function LoginPage() {

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password) {
      setError('All fields are required');
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        form,
        { withCredentials: true }
      );

      // redirect after login
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='body-l'>
      <div className='main-section-l'>

        <div className='Heading-l'>
          <h1>Welcome Back</h1>
          <p>Sign in to your account to continue</p>
        </div>

        <div className='form-l'>
          <form onSubmit={handleSubmit}>

            <div className='fix-ml'>
              <label>Email address</label>
              <div className='input-1'>
                <i className="bi bi-person"></i>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className='fix-ml'>
              <label>Password</label>
              <div className='input-1'>
                <i className="bi bi-key-fill"></i>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            {error && <p className="text-red-600 mt-2">{error}</p>}

            <button className='sign-in-btn' disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>

            <p className='dont-have'>
              Don’t have an account? <a href="/register">Sign up</a>
            </p>
          </form>
        </div>

        {/* Google login  */}
        <div className='flex justify-center items-center bg-[rgb(255,255,255)]  rounded-md w-full    mt-4'>
          <Login />
        </div>

      </div>
    </div>
  );
}
