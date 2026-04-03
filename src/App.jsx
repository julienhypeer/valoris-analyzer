import { useState } from 'react';
import { useTranscriptions } from './hooks/useTranscriptions';
import LoginPage from './components/LoginPage';
import Header from './components/Header';
import UploadForm from './components/UploadForm';
import TranscriptionList from './components/TranscriptionList';
import FicheModal from './components/FicheModal';
import Footer from './components/Footer';
import './App.css';

const AUTH_KEY = 'call-analyzer-auth';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem(AUTH_KEY) === 'true';
  });
  const { fiches, startTranscription, deleteFiche, toggleCheck } = useTranscriptions();
  const [selectedFiche, setSelectedFiche] = useState(null);

  async function handleLogin(password) {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json();
        return data.error || 'Mot de passe incorrect';
      }
      localStorage.setItem(AUTH_KEY, 'true');
      setIsAuthenticated(true);
      return null;
    } catch {
      return 'Erreur de connexion au serveur';
    }
  }

  function handleSubmit(file, tag, name) {
    startTranscription(file, tag, name);
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <div className="container">
        <Header />
        <UploadForm onSubmit={handleSubmit} />
        <TranscriptionList
          fiches={fiches}
          onSelect={setSelectedFiche}
          onDelete={deleteFiche}
          onToggleCheck={toggleCheck}
        />
        <Footer />
      </div>

      {selectedFiche && (
        <FicheModal
          fiche={selectedFiche}
          onClose={() => setSelectedFiche(null)}
        />
      )}
    </div>
  );
}
