INSERT INTO clients (id, nom, prenom, email, adresse) VALUES
(1, 'Doe', 'John', 'john.doe@example.com', '123 Main St'),
(2, 'Smith', 'Jane', 'jane.smith@example.com', '456 Elm St');

INSERT INTO commandes (produit, quantite) VALUES
('Haltère', 10),
('Tapis de yoga', 5);

INSERT INTO reservations (nom, date_reservation, heure) VALUES
('John Doe', TO_DATE('2024-05-01', 'YYYY-MM-DD'), '10:00:00'),
('Jane Smith', TO_DATE('2024-05-02', 'YYYY-MM-DD'), '11:00:00');
