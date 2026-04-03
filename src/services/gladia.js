const API_KEY = import.meta.env.VITE_GLADIA_API_KEY;
const BASE_URL = 'https://api.gladia.io/v2';

export async function uploadAudio(file) {
  const formData = new FormData();
  formData.append('audio', file);

  const res = await fetch(`${BASE_URL}/upload`, {
    method: 'POST',
    headers: { 'x-gladia-key': API_KEY },
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Upload echoue (${res.status}): ${text}`);
  }

  return res.json();
}

export async function requestTranscription(audioUrl) {
  const res = await fetch(`${BASE_URL}/pre-recorded`, {
    method: 'POST',
    headers: {
      'x-gladia-key': API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ audio_url: audioUrl }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Transcription echouee (${res.status}): ${text}`);
  }

  return res.json();
}

export async function getTranscriptionResult(resultUrl) {
  const res = await fetch(resultUrl, {
    headers: { 'x-gladia-key': API_KEY },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Recuperation echouee (${res.status}): ${text}`);
  }

  return res.json();
}

export async function transcribeAudio(file, onProgress) {
  onProgress('uploading');
  const { audio_url } = await uploadAudio(file);

  onProgress('transcribing');
  const { result_url } = await requestTranscription(audio_url);

  onProgress('polling');
  const POLL_INTERVAL = 1000;
  const MAX_POLLS = 300;

  for (let i = 0; i < MAX_POLLS; i++) {
    const data = await getTranscriptionResult(result_url);

    if (data.status === 'done') {
      return data.result;
    }

    if (data.status === 'error') {
      throw new Error('Erreur serveur lors de la transcription');
    }

    await new Promise((r) => setTimeout(r, POLL_INTERVAL));
  }

  throw new Error('Transcription timeout (5 min)');
}
