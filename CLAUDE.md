# Valoris Analyzer

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

## Déploiement
- VPS : 69.62.109.87
- Domaine : analyzer.valoris-conseil.fr
- Nginx reverse proxy → port 3088 (API) + fichiers statiques dist/
- PM2 process : valoris-analyzer

## Commandes
```bash
npm run build    # Build production
npm run dev      # Dev server
```

## Structure
- `server.js` : Express proxy pour l'API Gladia (upload, transcription, résultats)
- `src/` : App React (composants, hooks, services)
- `dist/` : Build de production servi par nginx
