-- Deploy brushizer:initial_constraints to pg

BEGIN;

-- Create domain "posnum" to ensure positivity of price fields
CREATE DOMAIN posnum AS NUMERIC
    CHECK( value > 0 );
-- Add "posnum" constraint to "price_usd" and "price_sol"
ALTER TABLE "artwork"
    ALTER COLUMN "price_usd" TYPE posnum,
    ALTER COLUMN "price_sol" TYPE posnum;

-- Create domain "email"
CREATE DOMAIN email AS TEXT
    CHECK ( value ~ '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$' );
-- Add "email" constraint to "price_usd" and "price_sol"
ALTER TABLE "user"
    ALTER COLUMN "email" TYPE email;

-- Add constraint to timestamps fields so that update date is always greater or equal to creation date
ALTER TABLE "user"
    ADD CONSTRAINT "consistant_date" CHECK ( "updated_at" >= "created_at" );
ALTER TABLE "collection"
    ADD CONSTRAINT "consistant_date" CHECK ( "updated_at" >= "created_at" );
ALTER TABLE "artwork"
    ADD CONSTRAINT "consistant_date" CHECK ( "updated_at" >= "created_at" );
ALTER TABLE "attribute"
    ADD CONSTRAINT "consistant_date" CHECK ( "updated_at" >= "created_at" );
   
COMMIT;
