-- Revert brushizer:pseudo_uniqueness from pg

BEGIN;

ALTER TABLE "user"
    ALTER COLUMN pseudo TYPE TEXT;

COMMIT;
