-- Revert brushizer:initial_constraints from pg

BEGIN;

ALTER TABLE "attribute"
    DROP CONSTRAINT "consistant_date";
ALTER TABLE "artwork"
    DROP CONSTRAINT "consistant_date";
ALTER TABLE "collection"
    DROP CONSTRAINT "consistant_date";
ALTER TABLE "user"
    DROP CONSTRAINT "consistant_date";

ALTER TABLE "user"
    ALTER COLUMN "email" TYPE TEXT;
DROP DOMAIN email;

ALTER TABLE "artwork"
    ALTER COLUMN "price_usd" TYPE NUMERIC,
    ALTER COLUMN "price_sol" TYPE NUMERIC;
DROP DOMAIN posnum;

COMMIT;
