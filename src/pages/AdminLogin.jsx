import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="login-card glass-card">
        <div className="icon-wrapper">
          <Lock size={32} color="white" />
        </div>
        <h2>Admin Portal</h2>
        <p style={{ marginBottom: '20px', fontSize: '14px', opacity: 0.8 }}>Please sign in with your admin credentials.</p>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Admin Email"
              className="glass-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              className="glass-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-msg">{error}</p>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Authenticating...' : 'Access Dashboard'}
          </button>
        </form>
      </div>

      <style>{`
        .page-container {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0f172a; /* Fallback */
        }
        .login-card {
          width: 100%;
          max-width: 400px;
          text-align: center;
          color: white;
          padding: 40px;
        }
        .icon-wrapper {
          width: 60px;
          height: 60px;
          background: rgba(255,255,255,0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
        }
        .glass-input {
          width: 100%;
          padding: 14px;
          margin-bottom: 16px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          color: white;
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        .glass-input:focus {
          outline: none;
          background: rgba(255,255,255,0.1);
          border-color: var(--accent, #3b82f6);
        }
        .login-btn {
          width: 100%;
          padding: 14px;
          background: var(--accent, #3b82f6);
          color: white;
          border-radius: 12px;
          font-weight: 600;
          transition: 0.3s;
          border: none;
          cursor: pointer;
          margin-top: 10px;
        }
        .login-btn:hover {
           transform: translateY(-2px);
           box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
        .login-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
        .error-msg {
          color: #ef4444;
          margin-bottom: 1rem;
          font-size: 14px;
          background: rgba(239, 68, 68, 0.1);
          padding: 10px;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;
