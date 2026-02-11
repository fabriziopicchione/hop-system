const API_URL = '/api/luggage';
const ARCHIVE_URL = '/api/archivio-dedicato';
const USERS_URL = '/api/users';

function updateClock(elementId = 'live-clock') {
    const el = document.getElementById(elementId);
    if (!el) return;
    const now = new Date();
    // Default format: "GIO 06 FEB | 15:30"
    el.innerText = now.toLocaleDateString('it-IT', { weekday: 'short', day: '2-digit', month: 'short' }).toUpperCase() + 
                   " | " + 
                   now.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
}

// Helper to format currency or simple text
function formatMoney(amount) {
    return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(amount);
}
