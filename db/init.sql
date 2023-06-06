-- CREATE DATABASE IF NOT EXISTS codrrdb
SELECT 'CREATE DATABASE railway'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'railway')\gexec