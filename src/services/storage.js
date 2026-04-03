const STORAGE_KEY = 'close-maker-transcriptions';

export function getAll() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveAll(fiches) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(fiches));
}

export function save(fiche) {
  const fiches = getAll();
  fiches.unshift(fiche);
  saveAll(fiches);
  return fiches;
}

export function update(id, data) {
  const fiches = getAll();
  const index = fiches.findIndex((f) => f.id === id);
  if (index !== -1) {
    fiches[index] = { ...fiches[index], ...data };
    saveAll(fiches);
  }
  return fiches;
}

export function remove(id) {
  const fiches = getAll().filter((f) => f.id !== id);
  saveAll(fiches);
  return fiches;
}
