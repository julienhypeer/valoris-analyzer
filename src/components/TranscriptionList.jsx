import { useState } from 'react';
import TranscriptionCard from './TranscriptionCard';
import { mergeUtterances } from '../utils/formatUtterances';

export default function TranscriptionList({ fiches, onSelect, onDelete, onToggleCheck }) {
  const [copied, setCopied] = useState(false);

  if (fiches.length === 0) return null;

  const doneFiches = fiches.filter((f) => f.status === 'done');

  function getTranscriptText(f) {
    const merged = mergeUtterances(f.utterances);
    if (merged.length > 0) {
      return merged.map((u) => `${u.speaker}: ${u.text}`).join('\n');
    }
    return f.transcript || '';
  }

  function copyToClipboard(text) {
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

  function handleCopyAll() {
    const allText = doneFiches
      .map((f) => `Retranscription de ${f.name}\n${getTranscriptText(f)}`)
      .join('\n\n');
    copyToClipboard(allText);
  }

  return (
    <section className="transcription-list">
      <div className="list-header">
        <h2 className="list-title">Transcriptions</h2>
        {doneFiches.length > 0 && (
          <button className="btn-copy-all" onClick={handleCopyAll}>
            {copied ? 'Copie !' : `Copier tout (${doneFiches.length})`}
          </button>
        )}
      </div>
      <div className="list-items-compact">
        {fiches.map((fiche, index) => (
          <TranscriptionCard
            key={fiche.id}
            fiche={fiche}
            number={index + 1}
            onClick={() => fiche.status === 'done' && onSelect(fiche)}
            onDelete={() => onDelete(fiche.id)}
            onToggleCheck={() => onToggleCheck(fiche.id)}
          />
        ))}
      </div>
    </section>
  );
}
