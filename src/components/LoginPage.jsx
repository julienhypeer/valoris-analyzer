import { useState } from 'react';

export default function LoginPage({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!password) {
      setError('Veuillez entrer le mot de passe.');
      return;
    }
    setLoading(true);
    const err = await onLogin(password);
    setLoading(false);
    if (err) setError(err);
  }

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="login-header">
          <img src="/icon-192.png" alt="Valoris" className="login-logo" />
          <p className="login-label">Call Analyzer</p>
        </div>

        <form onSubmit={handleSubmit} className="login-card">
          <div className="login-field">
            <label className="login-field-label">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              placeholder="Mot de passe"
              autoFocus
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" disabled={loading} className="login-btn">
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <p className="login-footer">
          Valoris &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
