# Valoris Analyzer (Call Analyzer)

Outil de transcription audio intelligente pour Valoris Conseil.

## Stack
- React 19 + Vite 8
- PWA (vite-plugin-pwa)
- Express backend (server.js) - proxy Gladia API sur port 3088
- Vanilla CSS (pas de Tailwind)

## Couleurs (identiques à valoris-callers)
- Navy (texte principal) : #223947
- Gold (accent) : #C9973A
- Cream (fond) : #F5F0E8
- Cream dark (bordures) : #EDE8DB

## Auth
- Login page avec mot de passe (POST /api/login)
- Mot de passe : Crosoft2 (configurable via env APP_PASSWORD)
- Session persistée en localStorage (clé: call-analyzer-auth)

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
- `src/` : App React (composants, hooks, services)
- `src/components/LoginPage.jsx` : Page de login (design copié de valoris-planning)
- `src/components/TopBar.jsx` : Barre VALORIS logo en haut
- `public/video/` : Dossier pour la vidéo logo-animation (login page)
- `public/logo/` : Logo Valoris large
- `dist/` : Build de production servi par Caddy
