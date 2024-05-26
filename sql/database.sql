BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE clients CASCADE CONSTRAINTS';
    EXECUTE IMMEDIATE 'DROP TABLE commandes CASCADE CONSTRAINTS';
    EXECUTE IMMEDIATE 'DROP TABLE reservations CASCADE CONSTRAINTS';
EXCEPTION
    WHEN OTHERS THEN
        IF SQLCODE != -942 THEN
            RAISE;
        END IF;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP SEQUENCE commandes_seq';
    EXECUTE IMMEDIATE 'DROP SEQUENCE reservations_seq';
EXCEPTION
    WHEN OTHERS THEN
        IF SQLCODE != -2289 THEN
            RAISE;
        END IF;
END;
/

CREATE TABLE clients (
    id INT PRIMARY KEY,
    nom VARCHAR(100),
    prenom VARCHAR(100),
    email VARCHAR(100),
    adresse VARCHAR(255)
);

CREATE TABLE commandes (
    id INT PRIMARY KEY,
    produit VARCHAR(100),
    quantite INT
);

CREATE TABLE reservations (
    id INT PRIMARY KEY,
    nom VARCHAR(100),
    date_reservation DATE,
    heure VARCHAR(10)
);

CREATE SEQUENCE commandes_seq START WITH 1 INCREMENT BY 1 NOCACHE;
CREATE SEQUENCE reservations_seq START WITH 1 INCREMENT BY 1 NOCACHE;

CREATE OR REPLACE TRIGGER commandes_bir
BEFORE INSERT ON commandes
FOR EACH ROW
BEGIN
    :new.id := commandes_seq.NEXTVAL;
END;
/

CREATE OR REPLACE TRIGGER reservations_bir
BEFORE INSERT ON reservations
FOR EACH ROW
BEGIN
    :new.id := reservations_seq.NEXTVAL;
END;
/
