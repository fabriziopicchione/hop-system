// Custom UI Library for H.O.P. System
// Replaces native alert, confirm, prompt with Bootstrap Modals

// Inject Modal HTML into the DOM
document.addEventListener('DOMContentLoaded', () => {
    const modalHTML = `
    <!-- Custom Generic Modal -->
    <div class="modal fade" id="customUiModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content custom-modal-content">
                <div class="modal-header border-0 pb-0">
                    <h5 class="modal-title w-100 text-center text-gold" id="customUiTitle">ATTENZIONE</h5>
                </div>
                <div class="modal-body text-center text-white pb-4" id="customUiBody" style="font-size: 1.1rem;">
                    <!-- Message goes here -->
                </div>
                <div class="modal-body pt-0 pb-4" id="customUiInputContainer" style="display:none;">
                    <input type="text" id="customUiInput" class="form-control luxury-input text-center" autocomplete="off">
                </div>
                <div class="modal-footer border-0 justify-content-center gap-2 pb-4" id="customUiFooter">
                    <!-- Buttons injected here -->
                </div>
            </div>
        </div>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
});

// Helper to get modal instance
function getModal() {
    const el = document.getElementById('customUiModal');
    return new bootstrap.Modal(el);
}

// Internal State
let resolvePromise;

window.showCustomAlert = function (message, title = "AVVISO") {
    return new Promise(resolve => {
        const el = document.getElementById('customUiModal');
        const modal = getModal();

        document.getElementById('customUiTitle').innerText = title;
        document.getElementById('customUiBody').innerText = message;
        document.getElementById('customUiInputContainer').style.display = 'none';

        const footer = document.getElementById('customUiFooter');
        footer.innerHTML = `<button class="btn btn-warning fw-bold px-4" onclick="handleCustomClose()">AL RIGHT</button>`;

        resolvePromise = () => resolve();

        window.handleCustomClose = () => {
            modal.hide();
            resolvePromise();
        };

        modal.show();
    });
};

window.showCustomConfirm = function (message, title = "CONFERMA") {
    return new Promise(resolve => {
        const el = document.getElementById('customUiModal');
        const modal = getModal();

        document.getElementById('customUiTitle').innerText = title;
        document.getElementById('customUiBody').innerText = message;
        document.getElementById('customUiInputContainer').style.display = 'none';

        const footer = document.getElementById('customUiFooter');
        footer.innerHTML = `
            <button class="btn btn-outline-danger fw-bold px-4" onclick="handleCustomConfirm(false)">NO</button>
            <button class="btn btn-success fw-bold px-4" onclick="handleCustomConfirm(true)">SÌ</button>
        `;

        window.handleCustomConfirm = (result) => {
            modal.hide();
            resolve(result);
        };

        modal.show();
    });
};

window.showCustomPrompt = function (message, isPassword = false, title = "INSERIMENTO") {
    return new Promise(resolve => {
        const el = document.getElementById('customUiModal');
        const modal = getModal();
        const input = document.getElementById('customUiInput');

        document.getElementById('customUiTitle').innerText = title;
        document.getElementById('customUiBody').innerText = message;
        document.getElementById('customUiInputContainer').style.display = 'block';

        input.value = '';
        input.type = isPassword ? 'password' : 'text';

        const footer = document.getElementById('customUiFooter');
        footer.innerHTML = `
            <button class="btn btn-outline-secondary fw-bold px-4" onclick="handleCustomPrompt(null)">ANNULLA</button>
            <button class="btn btn-warning fw-bold px-4" onclick="handleCustomPrompt(true)">CONFERMA</button>
        `;

        window.handleCustomPrompt = (confirm) => {
            const val = input.value;
            modal.hide();
            resolve(confirm ? val : null);
        };

        // Focus input
        el.addEventListener('shown.bs.modal', () => input.focus(), { once: true });

        // Enter key support
        input.onkeydown = (e) => {
            if (e.key === 'Enter') handleCustomPrompt(true);
        };

        modal.show();
    });
};
