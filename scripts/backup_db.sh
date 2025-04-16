#!/bin/bash
# Backup the kambaz database to a file
BACKUP_FILE="kambaz_backup_$(date +%Y%m%d%H%M%S).gz"
echo "Backing up the kambaz database to $BACKUP_FILE..."
mongodump --db=kambaz --archive="$BACKUP_FILE" --gzip
echo "Backup completed: $BACKUP_FILE"