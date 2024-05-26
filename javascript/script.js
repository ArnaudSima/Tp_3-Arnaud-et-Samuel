// script.js

document.addEventListener('DOMContentLoaded', () => {
    const reservationForm = document.getElementById('reservation-form');
    const orderForm = document.getElementById('order-form');
    const clientForm = document.getElementById('client-form');

    if (reservationForm) {
        reservationForm.addEventListener('submit', handleReservationSubmit);
    }

    if (orderForm) {
        orderForm.addEventListener('submit', handleOrderSubmit);
    }

    if (clientForm) {
        clientForm.addEventListener('submit', handleClientSubmit);
    }

    if (document.getElementById('reservations-info') || document.getElementById('commandes-info') || document.getElementById('clients-info')) {
        displayReports();
    }
});

function handleReservationSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const reservation = {
        type: 'Réservation',
        name: formData.get('name'),
        date: formData.get('date'),
        time: formData.get('time')
    };
    logSubmission(reservation);
    event.target.reset();
}

function handleOrderSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const order = {
        type: 'Commande',
        product: formData.get('product'),
        quantity: formData.get('quantity')
    };
    logSubmission(order);
    event.target.reset();
}

function handleClientSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const client = {
        type: 'Client',
        id: formData.get('id'),
        nom: formData.get('nom'),
        prenom: formData.get('prenom'),
        email: formData.get('email'),
        adresse: formData.get('adresse')
    };
    logSubmission(client);
    event.target.reset();
}

function logSubmission(submission) {
    let submissions = JSON.parse(localStorage.getItem('submissions')) || [];
    submissions.push(submission);
    localStorage.setItem('submissions', JSON.stringify(submissions));
}

function displayReports() {
    const submissions = JSON.parse(localStorage.getItem('submissions')) || [];
    const reservationSection = document.getElementById('reservations-info');
    const orderSection = document.getElementById('commandes-info');
    const clientSection = document.getElementById('clients-info');

    const reservations = submissions.filter(sub => sub.type === 'Réservation');
    const orders = submissions.filter(sub => sub.type === 'Commande');
    const clients = submissions.filter(sub => sub.type === 'Client');

    if (reservationSection) {
        reservationSection.innerHTML = reservations.length ? reservations.map(res => `
            <div class="report-item">
                <span>Nom: ${res.name}</span>
                <span>Date: ${res.date}</span>
                <span>Heure: ${res.time}</span>
            </div>
        `).join('') : '<p>Aucune réservation pour l\'instant.</p>';
    }

    if (orderSection) {
        orderSection.innerHTML = orders.length ? orders.map(order => `
            <div class="report-item">
                <span>Produit: ${order.product}</span>
                <span>Quantité: ${order.quantity}</span>
            </div>
        `).join('') : '<p>Aucune commande pour l\'instant.</p>';
    }

    if (clientSection) {
        clientSection.innerHTML = clients.length ? clients.map(client => `
            <div class="report-item">
                <span>ID: ${client.id}</span>
                <span>Nom: ${client.nom}</span>
                <span>Prénom: ${client.prenom}</span>
                <span>Email: ${client.email}</span>
                <span>Adresse: ${client.adresse}</span>
            </div>
        `).join('') : '<p>Aucun nouveau client pour l\'instant.</p>';
    }
}
