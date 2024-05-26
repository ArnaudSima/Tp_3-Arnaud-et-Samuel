document.addEventListener('DOMContentLoaded', () => {
    const formulaireReservation = document.getElementById('reservation-form');
    const formulaireCommande = document.getElementById('order-form');
    const formulaireClient = document.getElementById('client-form');

    if (formulaireReservation) {
        formulaireReservation.addEventListener('submit', gererSoumissionReservation);
    }

    if (formulaireCommande) {
        formulaireCommande.addEventListener('submit', gererSoumissionCommande);
    }

    if (formulaireClient) {
        formulaireClient.addEventListener('submit', gererSoumissionClient);
    }

    if (document.getElementById('reservations-info') || document.getElementById('commandes-info') || document.getElementById('clients-info')) {
        afficherRapports();
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

    try {
        const response = await fetch('http://localhost:8080/ords/scott/api/reservations/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reservation)
        });

        if (response.ok) {
            afficherRapports();
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

    try {
        const response = await fetch('http://localhost:8080/ords/scott/api/commandes/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commande)
        });

        if (response.ok) {
            afficherRapports();
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

    try {
        const response = await fetch('http://localhost:8080/ords/scott/api/clients/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(client)
        });

        if (response.ok) {
            afficherRapports();
        } else {
            console.error('Erreur lors de la soumission du client:', response.statusText);
        }
    } catch (error) {
        console.error('Erreur lors de la soumission du client:', error);
    }

    event.target.reset();
}

async function afficherRapports() {
    const sectionReservations = document.getElementById('reservations-info');
    const sectionCommandes = document.getElementById('commandes-info');
    const sectionClients = document.getElementById('clients-info');

    try {
        const [reponseReservations, reponseCommandes, reponseClients] = await Promise.all([
            fetch('http://localhost:8080/ords/scott/api/reservations/'),
            fetch('http://localhost:8080/ords/scott/api/commandes/'),
            fetch('http://localhost:8080/ords/scott/api/clients/')
        ]);

        const [reservations, commandes, clients] = await Promise.all([
            reponseReservations.json(),
            reponseCommandes.json(),
            reponseClients.json()
        ]);

        if (sectionReservations) {
            sectionReservations.innerHTML = reservations.items.length ? reservations.items.map(res => `
                <div class="report-item">
                    <span>Nom: ${res.nom}</span>
                    <span>Date: ${res.date_reservation}</span>
                    <span>Heure: ${res.heure}</span>
                </div>
            `).join('') : "<p>Aucune réservation pour l'instant.</p>";
        }

        if (sectionCommandes) {
            sectionCommandes.innerHTML = commandes.items.length ? commandes.items.map(commande => `
                <div class="report-item">
                    <span>Produit: ${commande.produit}</span>
                    <span>Quantité: ${commande.quantite}</span>
                </div>
            `).join('') : "<p>Aucune commande pour l'instant.</p>";
        }

        if (sectionClients) {
            sectionClients.innerHTML = clients.items.length ? clients.items.map(client => `
                <div class="report-item">
                    <span>ID: ${client.id}</span>
                    <span>Nom: ${client.nom}</span>
                    <span>Prénom: ${client.prenom}</span>
                    <span>Email: ${client.email}</span>
                    <span>Adresse: ${client.adresse}</span>
                </div>
            `).join('') : "<p>Aucun nouveau client pour l'instant.</p>";
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des rapports:', error);
    }
}
