-- Revert brushizer:structure from pg

BEGIN;

DROP TABLE "artwork_has_attribute", "attribute", "artwork", "collection", "user", "role";

COMMIT;
