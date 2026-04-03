import { useState, useRef } from 'react';

const ACCEPT = '.mp3,.wav,.ogg,.opus,.m4a,.webm,audio/*';

function stripExtension(filename) {
  return filename.replace(/\.[^.]+$/, '');
}

export default function UploadForm({ onSubmit }) {
  const [entries, setEntries] = useState([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const canSubmit = entries.length > 0 && entries.every((e) => e.name.trim());

  function addFiles(newFiles) {
    const audioFiles = Array.from(newFiles).filter(
      (f) => f.type.startsWith('audio/') || /\.(mp3|wav|ogg|opus|m4a|webm)$/i.test(f.name)
    );
    if (audioFiles.length > 0) {
      const newEntries = audioFiles.map((file) => ({
        file,
        name: stripExtension(file.name),
      }));
      setEntries((prev) => [...prev, ...newEntries]);
    }
  }

  function removeEntry(index) {
    setEntries((prev) => prev.filter((_, i) => i !== index));
  }

  function updateName(index, newName) {
    setEntries((prev) =>
      prev.map((e, i) => (i === index ? { ...e, name: newName } : e))
    );
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  }

  function handleFileChange(e) {
    addFiles(e.target.files);
    if (inputRef.current) inputRef.current.value = '';
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    entries.forEach((entry) => {
      onSubmit(entry.file, 'call', entry.name.trim());
    });
    setEntries([]);
    if (inputRef.current) inputRef.current.value = '';
  }

  function formatSize(bytes) {
    if (bytes < 1024) return bytes + ' o';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' Ko';
    return (bytes / (1024 * 1024)).toFixed(1) + ' Mo';
  }

  return (
    <form className="upload-form glass-card" onSubmit={handleSubmit}>
      <div
        className={`dropzone ${dragging ? 'dropzone--active' : ''} ${entries.length > 0 ? 'dropzone--has-file' : ''}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragEnter={() => setDragging(true)}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          onChange={handleFileChange}
          multiple
          hidden
        />
        {entries.length === 0 && (
          <div className="dropzone-placeholder">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p>Glissez vos fichiers audio ici</p>
            <p className="dropzone-hint">ou cliquez pour parcourir (multi-selection)</p>
          </div>
        )}
      </div>

      {entries.length > 0 && (
        <div className="file-entries">
          {entries.map((entry, i) => (
            <div key={`${entry.file.name}-${i}`} className="file-entry">
              <div className="file-entry-top">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>
                <span className="file-entry-filename">{entry.file.name}</span>
                <span className="file-entry-size">{formatSize(entry.file.size)}</span>
                <button
                  type="button"
                  className="dropzone-remove"
                  onClick={() => removeEntry(i)}
                >
                  &times;
                </button>
              </div>
              <input
                type="text"
                className="form-input file-entry-name"
                placeholder="Nom de la transcription..."
                value={entry.name}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => updateName(i, e.target.value)}
              />
            </div>
          ))}
          <button
            type="button"
            className="btn-add-more"
            onClick={() => inputRef.current?.click()}
          >
            + Ajouter d'autres fichiers
          </button>
        </div>
      )}

      <button
        type="submit"
        className="btn-primary"
        disabled={!canSubmit}
      >
        {entries.length > 1 ? `Transcrire ${entries.length} fichiers` : 'Transcrire'}
      </button>
    </form>
  );
}
