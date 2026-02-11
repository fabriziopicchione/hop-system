// DATABASE UTENTI CONCIERGE (per la firma della consegna)
const DEFAULT_USERS = [
    { nome: "Admin", codice: "2251" },
    { nome: "Marco", codice: "1010" },
    { nome: "Luca", codice: "2020" }
];

(function initUserDB() {
    if (!localStorage.getItem('cavalieri_users')) {
        localStorage.setItem('cavalieri_users', JSON.stringify(DEFAULT_USERS));
    }
})();