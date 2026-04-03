import { useState } from 'react';

export default function LoginPage({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!password) return;
    setLoading(true);
    const err = await onLogin(password);
    setLoading(false);
    if (err) {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  }

  return (
    <div className="login-page">
      <img src="/logo/logo-large.png" alt="Valoris" className="login-logo" />

      <p className="login-subtitle">Accès réservé à l'équipe</p>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-input-wrap">
          <svg className="login-lock-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            placeholder="Mot de passe"
            autoFocus
            className={`login-input ${error ? 'login-input--error' : ''}`}
          />
        </div>
        {error && <p className="login-error">Mot de passe incorrect</p>}
        <button type="submit" disabled={loading} className="login-btn">
          {loading ? 'Connexion...' : 'Accéder'}
        </button>
      </form>
    </div>
  );
}
