const STATUS_LABELS = {
  queued: 'En attente...',
  uploading: 'Upload...',
  transcribing: 'Envoi...',
  polling: 'Transcription...',
  done: 'Termine',
  error: 'Erreur',
};

export default function TranscriptionCard({ fiche, number, onClick, onDelete, onToggleCheck }) {
  const isQueued = fiche.status === 'queued';
  const isProcessing = ['uploading', 'transcribing', 'polling'].includes(fiche.status);
  const isDone = fiche.status === 'done';
  const isError = fiche.status === 'error';

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return (
    <div
      className={`card-row glass-card ${isDone ? 'card--clickable' : ''} ${isProcessing || isQueued ? 'card--processing' : ''} ${isError ? 'card--error' : ''}`}
      onClick={onClick}
    >
      <span className="card-number">{number}</span>
      {isDone && (
        <input
          type="checkbox"
          className="card-checkbox"
          checked={!!fiche.checked}
          onClick={(e) => e.stopPropagation()}
          onChange={() => onToggleCheck()}
        />
      )}
      <span className={`card-name-compact ${fiche.checked ? 'card-name-checked' : ''}`}>{fiche.name}</span>
      <span className={`card-status-mini ${isProcessing || isQueued ? 'status-processing' : ''} ${isDone ? 'status-done' : ''} ${isError ? 'status-error' : ''}`}>
        {(isProcessing || isQueued) && <span className="spinner-sm" />}
        {isDone && <span className="check">&#10003;</span>}
        {isError && <span className="cross">&#10007;</span>}
      </span>
      <span className="card-date-mini">{formatDate(fiche.createdAt)}</span>
      <button
        className="card-delete-mini"
        onClick={(e) => { e.stopPropagation(); onDelete(); }}
        title="Supprimer"
      >
        &times;
      </button>
    </div>
  );
}
