-- Deploy brushizer:pseudo_uniqueness to pg

BEGIN;

CREATE EXTENSION IF NOT EXISTS citext;

ALTER TABLE "user"
    ALTER COLUMN pseudo TYPE citext; 

COMMIT;
