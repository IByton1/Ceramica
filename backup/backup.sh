#!/bin/bash
git pull
# Backup-Verzeichnis erstellen
mkdir -p /home/Ceramica/warenwirtschaftssystem/backup

# Zeitstempel für den Dateinamen generieren
timestamp=$(date +"%Y-%m-%d_%H-%M-%S")

# Backup erstellen mit Zeitstempel im Dateinamen

backup_file="/home/Ceramica/warenwirtschaftssystem/backup/backup_$timestamp.sql"
mysqldump -u root -p'fZ@r-Muhyhz!*sv9' Ceramica > "$backup_file"

# Zum Backup-Verzeichnis wechseln
cd /home/Ceramica/warenwirtschaftssystem/backup

# Änderungen in Git hinzufügen und committen
git add "$backup_file"
git commit -m "Automated backup $timestamp"
git push origin main
