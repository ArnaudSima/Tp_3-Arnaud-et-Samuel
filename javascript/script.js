document.addEventListener("DOMContentLoaded", () => {
    // Charger les informations de réservations
    fetch('api/reservations')
        .then(response => response.json())
        .then(data => afficherInformations(data, 'reservations-info'))
        .catch(error => console.error('Erreur lors du chargement des réservations:', error));

    // Charger les informations de commandes
    fetch('api/commandes')
        .then(response => response.json())
        .then(data => afficherInformations(data, 'commandes-info'))
        .catch(error => console.error('Erreur lors du chargement des commandes:', error));

    // Charger les informations des nouveaux clients
    fetch('api/clients')
        .then(response => response.json())
        .then(data => afficherInformations(data, 'clients-info'))
        .catch(error => console.error('Erreur lors du chargement des clients:', error));
});

function afficherInformations(data, elementId) {
    const element = document.getElementById(elementId);
    if (data.length === 0) {
        element.innerHTML = "<p>Aucune information trouvée.</p>";
    } else {
        const list = document.createElement('ul');
        data.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = JSON.stringify(item);
            list.appendChild(listItem);
        });
        element.innerHTML = "";
        element.appendChild(list);
    }
}
