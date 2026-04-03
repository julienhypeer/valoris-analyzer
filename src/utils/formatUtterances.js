export function mergeUtterances(utterances) {
  if (!utterances || utterances.length === 0) return [];

  const speakerMap = {};
  let speakerCount = 0;
  const merged = [];

  for (const u of utterances) {
    const id = String(u.speaker);
    if (!(id in speakerMap)) {
      speakerCount++;
      speakerMap[id] = `Interlocuteur ${speakerCount}`;
    }
    const label = speakerMap[id];
    const last = merged[merged.length - 1];
    if (last && last.speaker === label) {
      last.text += ' ' + u.text;
    } else {
      merged.push({ speaker: label, text: u.text });
    }
  }
  return merged;
}
