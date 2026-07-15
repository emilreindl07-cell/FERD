# FERD – Generative Album Cover

Dieses Mini-Projekt erzeugt bei jedem frischen Seitenaufruf ein neues KI-generiertes Albumcover.

Der unveränderte Prompt lautet exakt:

`Create an album cover`

## Dateien

- `index.html` – die sichtbare Webseite
- `netlify/functions/generate.js` – sichere Server-Funktion, die OpenAI aufruft
- `netlify.toml` – Netlify-Konfiguration

## Voraussetzung

In Netlify muss diese Environment Variable existieren:

`OPENAI_API_KEY`

Der API-Key darf niemals in `index.html` oder in eine GitHub-Datei kopiert werden.

## Installation über GitHub

1. Den Inhalt dieses Ordners in das Root-Verzeichnis deines GitHub-Repositories hochladen.
2. Vorhandene `index.html` ersetzen.
3. Darauf achten, dass die Ordnerstruktur exakt so bleibt:

   FERD/
   ├── index.html
   ├── netlify.toml
   └── netlify/
       └── functions/
           └── generate.js

4. Änderungen committen.
5. Netlify sollte automatisch neu deployen.
6. Nach dem Deployment die Netlify-URL öffnen.

## Verhalten

- Jeder frische Seitenaufruf startet eine neue Bildgenerierung.
- Der Prompt bleibt immer gleich.
- Das Ergebnis kann trotzdem bei jeder Generierung anders sein.
- Bei einem Fehler erscheint eine Fehlermeldung plus „Try again“.

## Wichtig

Das Generieren von Bildern über die OpenAI API kann Kosten verursachen. Für eine öffentlich zugängliche Ausstellung sollte zusätzlich ein Schutz gegen sehr viele automatisierte Aufrufe ergänzt werden.
