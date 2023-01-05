-- Deploy brushizer:structure to pg

BEGIN;

CREATE TABLE "role"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label" TEXT NOT NULL
);

CREATE TABLE "user"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "pseudo" TEXT NOT NULL UNIQUE,
    "country" TEXT NOT NULL,
    "description" TEXT,
    "profile_pic" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ,
    "role_id" INT NOT NULL REFERENCES "role"("id")
);

CREATE TABLE "collection"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "artist_name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ,
    "user_id" INT NOT NULL REFERENCES "user"("id")
);

CREATE TABLE "artwork"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL UNIQUE,
    "description" TEXT NOT NULL,
    "artist_name" TEXT NOT NULL,
    "price_usd" NUMERIC NOT NULL,
    "price_sol" NUMERIC NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ,
    "user_id" INT NOT NULL REFERENCES "user"("id"),
    "collection_id" INT REFERENCES "collection"("id")
);

CREATE TABLE "attribute"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "background" TEXT NOT NULL,
    "shape" TEXT NOT NULL UNIQUE,
    "shape_color" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "artwork_has_attribute"(
    "artwork_id" INT NOT NULL REFERENCES "artwork"("id"),
    "attribute_id" INT NOT NULL REFERENCES "attribute"("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMIT;
