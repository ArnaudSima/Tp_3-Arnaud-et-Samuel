document.addEventListener('DOMContentLoaded', () => {
    const formulaireReservation = document.getElementById('reservation-form');
    const formulaireCommande = document.getElementById('order-form');
    const formulaireClient = document.getElementById('client-form');

    if (formulaireReservation) {
        formulaireReservation.addEventListener('submit', gererSoumissionReservation);
        afficherReservations();
    }

    if (formulaireCommande) {
        formulaireCommande.addEventListener('submit', gererSoumissionCommande);
        afficherCommandes();
    }

    if (formulaireClient) {
        formulaireClient.addEventListener('submit', gererSoumissionClient);
        afficherClients();
    }
});

async function gererSoumissionReservation(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const reservation = {
        nom: formData.get('name'),
        date_reservation: formData.get('date'),
        heure: formData.get('time')
    };

    console.log('Soumission de la réservation:', reservation);

    try {
        const response = await fetch('http://localhost:8080/ords/scott/api/reservations/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reservation)
        });

        if (response.ok) {
            console.log('Réservation soumise avec succès');
            afficherReservations();
        } else {
            console.error('Erreur lors de la soumission de la réservation:', response.statusText);
        }
    } catch (error) {
        console.error('Erreur lors de la soumission de la réservation:', error);
    }

    event.target.reset();
}

async function gererSoumissionCommande(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const commande = {
        produit: formData.get('product'),
        quantite: formData.get('quantity')
    };

    console.log('Soumission de la commande:', commande);

    try {
        const response = await fetch('http://localhost:8080/ords/scott/api/commandes/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commande)
        });

        if (response.ok) {
            console.log('Commande soumise avec succès');
            afficherCommandes();
        } else {
            console.error('Erreur lors de la soumission de la commande:', response.statusText);
        }
    } catch (error) {
        console.error('Erreur lors de la soumission de la commande:', error);
    }

    event.target.reset();
}

async function gererSoumissionClient(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const client = {
        id: formData.get('id'),
        nom: formData.get('nom'),
        prenom: formData.get('prenom'),
        email: formData.get('email'),
        adresse: formData.get('adresse')
    };

    console.log('Soumission du client:', client);

    try {
        const response = await fetch('http://localhost:8080/ords/scott/api/clients/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(client)
        });

        if (response.ok) {
            console.log('Client soumis avec succès');
            afficherClients();
        } else {
            console.error('Erreur lors de la soumission du client:', response.statusText);
        }
    } catch (error) {
        console.error('Erreur lors de la soumission du client:', error);
    }

    event.target.reset();
}

async function afficherReservations() {
    const sectionReservations = document.getElementById('reservations-list');

    try {
        const response = await fetch('http://localhost:8080/ords/scott/api/reservations/');
        const reservations = await response.json();

        console.log('Réservations récupérées:', reservations);

        sectionReservations.innerHTML = reservations.items.length ? reservations.items.map(res => `
            <div class="report-item">
                <span>Nom: ${res.nom}</span>
                <span>Date: ${res.date_reservation}</span>
                <span>Heure: ${res.heure}</span>
            </div>
        `).join('') : "<p>Aucune réservation pour l'instant.</p>";
    } catch (error) {
        console.error('Erreur lors de la récupération des réservations:', error);
    }
}

async function afficherCommandes() {
    const sectionCommandes = document.getElementById('orders-list');

    try {
        const response = await fetch('http://localhost:8080/ords/scott/api/commandes/');
        const commandes = await response.json();

        console.log('Commandes récupérées:', commandes);

        sectionCommandes.innerHTML = commandes.items.length ? commandes.items.map(commande => `
            <div class="report-item">
                <span>Produit: ${commande.produit}</span>
                <span>Quantité: ${commande.quantite}</span>
            </div>
        `).join('') : "<p>Aucune commande pour l'instant.</p>";
    } catch (error) {
        console.error('Erreur lors de la récupération des commandes:', error);
    }
}

async function afficherClients() {
    const sectionClients = document.getElementById('clients-list');

    try {
        const response = await fetch('http://localhost:8080/ords/scott/api/clients/');
        const clients = await response.json();

        console.log('Clients récupérés:', clients);

        sectionClients.innerHTML = clients.items.length ? clients.items.map(client => `
            <div class="report-item">
                <span>ID: ${client.id}</span>
                <span>Nom: ${client.nom}</span>
                <span>Prénom: ${client.prenom}</span>
                <span>Email: ${client.email}</span>
                <span>Adresse: ${client.adresse}</span>
            </div>
        `).join('') : "<p>Aucun client pour l'instant.</p>";
    } catch (error) {
        console.error('Erreur lors de la récupération des clients:', error);
    }
}
