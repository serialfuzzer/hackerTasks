#!/bin/sh

# Wait for the MySQL service to be reachable on port 3306
until nc -z -v -w30 mysql 3306; do
  echo "Waiting for MySQL to start..."
  sleep 1
done

# Once MySQL is up, execute your CMD command
exec "$@"
