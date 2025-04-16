#!/bin/bash
# Restore the kambaz database from a file to a specified MongoDB URL
if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <backup_file> <mongo_url>"
  exit 1
fi
BACKUP_FILE=$1
MONGO_URL=$2
echo "Restoring the kambaz database from $BACKUP_FILE to $MONGO_URL..."
mongorestore --uri="$MONGO_URL" --archive="$BACKUP_FILE" --gzip
echo "Restore completed."