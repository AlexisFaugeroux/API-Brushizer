-- Revert brushizer:pseudo_uniqueness from pg

BEGIN;

ALTER TABLE "user"
    ALTER COLUMN pesudo TYPE TEXT;

COMMIT;
