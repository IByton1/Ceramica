# Ceramica Warenwirtschaftssystem

Dieses Repository enthält ein kleines Warenwirtschaftssystem für Ceramica. Die Anwendung besteht aus einem Angular-Frontend, einer Node.js/Express-API und einer MySQL-Datenbank.

## Projektaufbau

```text
Ceramica/
├── warenwirtschaftssystem/      # Angular 19 Frontend
├── server/                      # Node.js/Express Backend und Webserver
│   ├── backend.js               # REST-API für Inventar-Daten
│   ├── webseite.js              # Express-Server für das gebaute Angular-Frontend
│   └── package.json             # Backend-Abhängigkeiten
└── backup/                      # SQL-Backups und Backup-Skript
```

## Technischer Überblick

Das Frontend liegt im Ordner `warenwirtschaftssystem` und wurde mit Angular CLI 19.2.8 erstellt. Das Backend liegt im Ordner `server` und nutzt Express, CORS und `mysql2`.

Die API in `server/backend.js` läuft standardmäßig auf Port `4000`. Der separate Webserver in `server/webseite.js` liefert das gebaute Angular-Frontend aus und läuft standardmäßig auf Port `9090`.

Die Datenbank heißt laut Backend-Code `Ceramica`. Die verwendete Tabelle heißt `inventory_items` und besitzt diese Spalten:

```sql
CREATE TABLE inventory_items (
  id int unsigned NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  shelf varchar(50) NOT NULL,
  qty int unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
);
```

Die wichtigsten API-Endpunkte sind:

| Methode | Pfad | Beschreibung |
| --- | --- | --- |
| `GET` | `/api/getItems` | Alle Inventar-Einträge laden |
| `GET` | `/api/items/:id` | Einzelnen Eintrag laden |
| `POST` | `/api/addItem` | Neuen Eintrag anlegen |
| `PUT` | `/api/updateItem` | Eintrag vollständig aktualisieren |
| `PATCH` | `/api/items/:id/qty` | Menge ändern |
| `PATCH` | `/api/items/:id/shelf` | Regal/Fach ändern |
| `PATCH` | `/api/items/:id/name` | Namen ändern |
| `DELETE` | `/api/deleteItem/:id` | Eintrag löschen |

## Voraussetzungen

Auf dem Server werden benötigt:

- Ubuntu/Debian Server oder vergleichbares Linux-System
- Node.js, empfohlen Node.js 20 LTS oder neuer
- npm
- MySQL Server
- Git
- PM2
- optional Nginx als Reverse Proxy

## Lokale Entwicklung

Repository klonen:

```bash
git clone <REPOSITORY_URL> Ceramica
cd Ceramica
```

Backend-Abhängigkeiten installieren:

```bash
cd server
npm install
```

Frontend-Abhängigkeiten installieren:

```bash
cd ../warenwirtschaftssystem
npm install
```

Frontend im Entwicklungsmodus starten:

```bash
npm start
```

Danach ist das Angular-Frontend unter `http://localhost:4200` erreichbar.

Backend lokal starten:

```bash
cd ../server
node backend.js
```

Die API ist danach unter `http://localhost:4000` erreichbar.

Wichtig: Im Frontend ist die Backend-URL in `warenwirtschaftssystem/src/app/core/services/backend.service.ts` hinterlegt. Aktuell zeigt sie auf:

```ts
private baseUrl = 'https://api.zeroleak.de/api2';
```

Wenn lokal getestet werden soll, kann diese URL vorübergehend auf den lokalen Backend-Port geändert werden:

```ts
private baseUrl = 'http://localhost:4000';
```

## Datenbank einrichten

MySQL installieren:

```bash
sudo apt update
sudo apt install mysql-server
```

In MySQL einloggen:

```bash
sudo mysql
```

Datenbank und Benutzer anlegen:

```sql
CREATE DATABASE Ceramica CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE USER 'ceramica_user'@'localhost' IDENTIFIED BY '<SICHERES_PASSWORT>';
GRANT ALL PRIVILEGES ON Ceramica.* TO 'ceramica_user'@'localhost';
FLUSH PRIVILEGES;
```

Tabelle anlegen:

```sql
USE Ceramica;

CREATE TABLE inventory_items (
  id int unsigned NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  shelf varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  qty int unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

Danach MySQL verlassen:

```sql
EXIT;
```

In `server/backend.js` müssen die Datenbank-Zugangsdaten zu deinem Server passen:

```js
const pool = mysql.createPool({
  host: 'localhost',
  user: 'ceramica_user',
  password: '<SICHERES_PASSWORT>',
  database: 'Ceramica'
});
```

Hinweis: Im aktuellen Projektstand sind Datenbank-Zugangsdaten direkt im Code hinterlegt. Für einen produktiven Server sollte das Passwort nicht im Repository stehen, sondern über Umgebungsvariablen oder eine nicht versionierte Konfigurationsdatei geladen werden.

## Server-Deployment

Die folgenden Schritte gehen davon aus, dass das Projekt auf dem Server unter `/home/Ceramica` liegt. Dieser Pfad ist wichtig, weil `server/webseite.js` aktuell genau diesen Build-Pfad verwendet:

```js
/home/Ceramica/warenwirtschaftssystem/dist/warenwirtschaftssystem/browser
```

Falls du einen anderen Pfad verwendest, muss der Pfad in `server/webseite.js` angepasst werden.

Projekt auf den Server klonen:

```bash
cd /home
git clone <REPOSITORY_URL> Ceramica
cd /home/Ceramica
```

Backend installieren:

```bash
cd /home/Ceramica/server
npm install --production
```

Frontend installieren und bauen:

```bash
cd /home/Ceramica/warenwirtschaftssystem
npm install
npm run build
```

Nach dem Build muss dieser Ordner existieren:

```text
/home/Ceramica/warenwirtschaftssystem/dist/warenwirtschaftssystem/browser
```

Wenn das Frontend über eine eigene Domain läuft und die API über eine andere Domain erreichbar ist, muss vor dem Build die `baseUrl` in `warenwirtschaftssystem/src/app/core/services/backend.service.ts` korrekt gesetzt sein.

Beispiele:

```ts
private baseUrl = 'https://api.deine-domain.de';
```

oder, wenn Nginx die API unter `/api2` weiterleitet:

```ts
private baseUrl = 'https://api.deine-domain.de/api2';
```

Danach erneut bauen:

```bash
cd /home/Ceramica/warenwirtschaftssystem
npm run build
```

## PM2 einrichten

PM2 global installieren:

```bash
sudo npm install -g pm2
```

Backend-API mit PM2 starten:

```bash
cd /home/Ceramica/server
pm2 start backend.js --name ceramica-api
```

Angular-Webserver mit PM2 starten:

```bash
cd /home/Ceramica/server
pm2 start webseite.js --name ceramica-web
```

Status prüfen:

```bash
pm2 status
```

Logs anzeigen:

```bash
pm2 logs ceramica-api
pm2 logs ceramica-web
```

Prozesse nach Server-Neustart automatisch starten lassen:

```bash
pm2 save
pm2 startup
```

Der Befehl `pm2 startup` gibt anschließend einen weiteren `sudo ...` Befehl aus. Diesen Befehl kopieren und ausführen. Danach PM2 erneut speichern:

```bash
pm2 save
```

## PM2 mit ecosystem.config.js

Alternativ kann eine PM2-Konfigurationsdatei verwendet werden. Lege im Ordner `/home/Ceramica/server` eine Datei `ecosystem.config.js` an:

```js
module.exports = {
  apps: [
    {
      name: 'ceramica-api',
      script: './backend.js',
      cwd: '/home/Ceramica/server',
      watch: false
    },
    {
      name: 'ceramica-web',
      script: './webseite.js',
      cwd: '/home/Ceramica/server',
      watch: false,
      env: {
        PORT: 9090
      }
    }
  ]
};
```

Starten:

```bash
cd /home/Ceramica/server
pm2 start ecosystem.config.js
pm2 save
```

Neustarten:

```bash
pm2 restart ecosystem.config.js
```

Stoppen:

```bash
pm2 stop ceramica-api
pm2 stop ceramica-web
```

## Ports

Standardmäßig werden diese Ports genutzt:

| Dienst | Datei | Port |
| --- | --- | --- |
| Backend API | `server/backend.js` | `4000` |
| Frontend Webserver | `server/webseite.js` | `9090` |
| Angular Dev Server | `warenwirtschaftssystem` | `4200` |

Firewall-Regeln beispielhaft öffnen:

```bash
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

Wenn kein Nginx verwendet wird und der Webserver direkt erreichbar sein soll:

```bash
sudo ufw allow 9090
sudo ufw allow 4000
```

Für Produktion ist Nginx mit HTTPS empfehlenswert. Dann müssen die Ports `4000` und `9090` nicht öffentlich geöffnet werden.

## Nginx als Reverse Proxy

Eine typische Nginx-Konfiguration kann so aussehen:

```nginx
server {
    listen 80;
    server_name deine-domain.de;

    location / {
        proxy_pass http://127.0.0.1:9090;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

server {
    listen 80;
    server_name api.deine-domain.de;

    location / {
        proxy_pass http://127.0.0.1:4000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Wenn die API wie im aktuellen Frontend unter `/api2` erreichbar sein soll, kann die API stattdessen unter einem Pfad weitergeleitet werden:

```nginx
server {
    listen 80;
    server_name api.deine-domain.de;

    location /api2/ {
        proxy_pass http://127.0.0.1:4000/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Nginx-Konfiguration testen und neu laden:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

HTTPS mit Certbot einrichten:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx
```

## Anwendung aktualisieren

Neue Version vom Repository holen:

```bash
cd /home/Ceramica
git pull
```

Backend-Abhängigkeiten aktualisieren:

```bash
cd /home/Ceramica/server
npm install --production
```

Frontend neu bauen:

```bash
cd /home/Ceramica/warenwirtschaftssystem
npm install
npm run build
```

PM2-Prozesse neu starten:

```bash
pm2 restart ceramica-api
pm2 restart ceramica-web
```

Status prüfen:

```bash
pm2 status
```

## Backup

Im Ordner `backup` liegt ein Skript `backup.sh`. Es erstellt mit `mysqldump` ein Backup der MySQL-Datenbank `Ceramica` und legt die SQL-Datei unter `/home/Ceramica/backup` ab.

Manuell ausführen:

```bash
cd /home/Ceramica/backup
chmod +x backup.sh
./backup.sh
```

Wichtig: Auch im Backup-Skript ist aktuell ein Datenbank-Passwort direkt hinterlegt. Für Produktion sollte das Passwort nicht im Skript stehen. Besser ist eine MySQL-Optionsdatei wie `~/.my.cnf` mit eingeschränkten Dateirechten.

Beispiel für `~/.my.cnf`:

```ini
[client]
user=root
password=<MYSQL_ROOT_PASSWORT>
```

Dateirechte setzen:

```bash
chmod 600 ~/.my.cnf
```

Danach kann `mysqldump` ohne Passwort im Befehl genutzt werden:

```bash
mysqldump Ceramica > /home/Ceramica/backup/backup.sql
```

## Fehlerbehebung

Wenn die Webseite nicht lädt:

```bash
pm2 logs ceramica-web
ls -la /home/Ceramica/warenwirtschaftssystem/dist/warenwirtschaftssystem/browser
```

Wenn die API nicht antwortet:

```bash
pm2 logs ceramica-api
curl http://127.0.0.1:4000/api/getItems
```

Wenn die Datenbank-Verbindung fehlschlägt:

```bash
mysql -u ceramica_user -p Ceramica
```

Wenn das Frontend keine Daten lädt, prüfe:

- Ist `ceramica-api` in PM2 online?
- Stimmt die `baseUrl` in `warenwirtschaftssystem/src/app/core/services/backend.service.ts`?
- Leitet Nginx auf den richtigen Port weiter?
- Ist die Tabelle `inventory_items` vorhanden?
- Blockiert die Firewall Port `4000` oder den Nginx-Zugriff?

## Nützliche Befehle

```bash
pm2 status
pm2 logs
pm2 restart ceramica-api
pm2 restart ceramica-web
pm2 delete ceramica-api
pm2 delete ceramica-web
```

Angular neu bauen:

```bash
cd /home/Ceramica/warenwirtschaftssystem
npm run build
```

API direkt testen:

```bash
curl http://127.0.0.1:4000/api/getItems
```

Frontend direkt testen:

```bash
curl http://127.0.0.1:9090
```

## Sicherheitshinweise

Vor dem produktiven Betrieb sollten diese Punkte verbessert werden:

- Datenbank-Passwörter aus `server/backend.js` entfernen und über Umgebungsvariablen laden.
- Datenbank-Passwörter aus `backup/backup.sh` entfernen.
- HTTPS über Nginx und Certbot aktivieren.
- Ports `4000` und `9090` nur lokal erreichbar lassen und öffentlich nur über Nginx freigeben.
- CORS im Backend nicht komplett offen lassen, sondern auf die echte Frontend-Domain beschränken.
- Regelmäßige Backups einrichten und Restore testen.

