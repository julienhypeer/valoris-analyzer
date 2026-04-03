import { useState, useCallback, useEffect, useRef } from 'react';
import { transcribeAudio } from '../services/gladia';
import * as storage from '../services/storage';

const MAX_CONCURRENT = 3;

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

export function useTranscriptions() {
  const [fiches, setFiches] = useState(() => storage.getAll());
  const fichesRef = useRef(fiches);
  const queueRef = useRef([]);
  const activeRef = useRef(0);

  useEffect(() => {
    fichesRef.current = fiches;
  }, [fiches]);

  const updateFiche = useCallback((id, data) => {
    setFiches(storage.update(id, data));
  }, []);

  const processNext = useCallback(() => {
    while (activeRef.current < MAX_CONCURRENT && queueRef.current.length > 0) {
      const { id, file } = queueRef.current.shift();
      activeRef.current++;

      updateFiche(id, { status: 'uploading' });

      transcribeAudio(file, (status) => {
        updateFiche(id, { status });
      })
        .then((result) => {
          updateFiche(id, {
            status: 'done',
            transcript: result.transcription.full_transcript,
            utterances: (result.transcription.utterances || []).map(({ words, ...u }) => u),
            completedAt: new Date().toISOString(),
          });
        })
        .catch((err) => {
          updateFiche(id, {
            status: 'error',
            errorMessage: err.message,
          });
        })
        .finally(() => {
          activeRef.current--;
          processNext();
        });
    }
  }, [updateFiche]);

  const startTranscription = useCallback((file, tag, name) => {
    const id = generateId();
    const fiche = {
      id,
      name,
      tag,
      status: 'queued',
      fileName: file.name,
      fileSize: file.size,
      transcript: null,
      createdAt: new Date().toISOString(),
      completedAt: null,
      errorMessage: null,
    };

    setFiches(storage.save(fiche));
    queueRef.current.push({ id, file });
    processNext();

    return id;
  }, [processNext]);

  const deleteFiche = useCallback((id) => {
    queueRef.current = queueRef.current.filter((item) => item.id !== id);
    setFiches(storage.remove(id));
  }, []);

  const toggleCheck = useCallback((id) => {
    setFiches((prev) => {
      const fiche = prev.find((f) => f.id === id);
      if (!fiche) return prev;
      return storage.update(id, { checked: !fiche.checked });
    });
  }, []);

  return { fiches, startTranscription, deleteFiche, toggleCheck };
}
