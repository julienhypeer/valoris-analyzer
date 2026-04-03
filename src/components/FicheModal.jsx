import { useState } from 'react';
import { mergeUtterances } from '../utils/formatUtterances';

export default function FicheModal({ fiche, onClose }) {
  const [copied, setCopied] = useState(false);
  const merged = mergeUtterances(fiche.utterances);

  function getTranscriptText() {
    if (merged.length > 0) {
      return merged.map((u) => `${u.speaker}: ${u.text}`).join('\n');
    }
    return fiche.transcript || '';
  }

  function handleCopy() {
    const text = getTranscriptText();
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function formatDate(iso) {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal glass-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-left">
            <span className={`card-tag ${fiche.tag === 'call' ? 'tag-call' : 'tag-remontee'}`}>
              {fiche.tag === 'call' ? 'Call' : 'Remontee'}
            </span>
            <h2 className="modal-title">{fiche.name}</h2>
          </div>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-meta">
          <span>{fiche.fileName}</span>
          <span>{formatDate(fiche.completedAt)}</span>
        </div>

        <div className="modal-transcript">
          {merged.length > 0
            ? merged.map((u, i) => (
                <div className="utterance" key={i}>
                  <span className="utterance-speaker">{u.speaker}</span>
                  <span className="utterance-text">{u.text}</span>
                </div>
              ))
            : fiche.transcript}
        </div>

        <div className="modal-actions">
          <button className="btn-primary" onClick={handleCopy}>
            {copied ? 'Copie !' : 'Copier le texte'}
          </button>
          <button className="btn-secondary" onClick={onClose}>
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
