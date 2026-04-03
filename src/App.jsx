import { useState } from 'react';
import { useTranscriptions } from './hooks/useTranscriptions';
import Header from './components/Header';
import UploadForm from './components/UploadForm';
import TranscriptionList from './components/TranscriptionList';
import FicheModal from './components/FicheModal';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  const { fiches, startTranscription, deleteFiche, toggleCheck } = useTranscriptions();
  const [selectedFiche, setSelectedFiche] = useState(null);

  function handleSubmit(file, tag, name) {
    startTranscription(file, tag, name);
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
