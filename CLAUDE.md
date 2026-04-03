# Valoris - Call Analyzer

Outil de transcription audio intelligente pour Valoris Conseil.

## Stack
- React 19 + Vite 8
- PWA (vite-plugin-pwa)
- Express backend (server.js) - proxy Gladia API sur port 3088
- Vanilla CSS (pas de Tailwind)

## Couleurs (identiques à valoris-callers)
- Navy (texte principal) : #223947
- Gold (accent) : #C9973A
- Cream (fond app) : #F5F0E8
- Cream dark (bordures) : #EDE8DB
- Gray light (inputs) : #F7F8FA

## Auth
- Page de login (design copié de valoris-planning) : fond blanc, logo, input lock, bouton gold
- POST /api/login — mot de passe : Crosoft2 (configurable via env APP_PASSWORD)
- Session persistée en localStorage (clé: call-analyzer-auth)
- Erreur auto-dismiss 2s

## Déploiement
- VPS : 69.62.109.87
- Domaine : analyzer.valoris-conseil.fr
- Caddy reverse proxy → port 3088 (API) + fichiers statiques dist/
- PM2 process : valoris-analyzer (startup configuré, persiste au reboot)

## Commandes
```bash
npm run build    # Build production
npm run dev      # Dev server
```

## Structure
- `server.js` : Express proxy pour l'API Gladia (upload, transcription, résultats) + endpoint /api/login
- `src/App.jsx` : Conditionne login vs app principale
- `src/components/LoginPage.jsx` : Page de login (fond blanc, logo, input cadenas, bouton gold)
- `src/components/TopBar.jsx` : Barre navy avec logo Valoris image
- `src/components/Header.jsx` : Titre Call Analyzer + liens Drive/Leads/Discours
- `src/components/UploadForm.jsx` : Upload multi-fichiers audio
- `src/components/TranscriptionList.jsx` : Liste des transcriptions
- `src/components/TranscriptionCard.jsx` : Carte individuelle
- `src/components/FicheModal.jsx` : Modal détail transcription
- `src/hooks/useTranscriptions.js` : Hook gestion transcriptions (queue max 3 concurrent)
- `src/services/gladia.js` : Intégration API Gladia
- `src/services/storage.js` : Wrapper localStorage
- `public/logo/logo-large.png` : Logo Valoris
- `public/video/` : Dossier prévu pour vidéo logo-animation (à venir)
- `dist/` : Build de production servi par Caddy
