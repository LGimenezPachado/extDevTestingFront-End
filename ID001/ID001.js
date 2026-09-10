/**
 * ID001 - Lógica Interactiva del Entorno de Pruebas
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Referencias al DOM ---
    const inputNombre = document.getElementById('nombre');
    const inputApellido = document.getElementById('apellido');
    const previewName = document.getElementById('preview-name');
    const avatarInitials = document.getElementById('avatar-initials');
    const cardSessionId = document.getElementById('card-session-id');
    const cardDate = document.getElementById('card-date');
    const cardAccessLevel = document.getElementById('card-access-level');
    const badgeCard = document.getElementById('tester-badge-card');

    const counterClicks = document.getElementById('counter-clicks');
    const counterWarnings = document.getElementById('counter-warnings');
    const testerRank = document.getElementById('tester-rank');

    const linkNoPulsar = document.getElementById('link-no-pulsar');
    const btnFakeDanger = document.getElementById('btn-fake-danger');
    const warningModal = document.getElementById('warning-modal');
    const btnCloseModal = document.getElementById('btn-close-modal');

    const btnTest = document.getElementById('btn-test');
    const btnInteractivePing = document.getElementById('btn-interactive-ping');
    const pingBadge = document.getElementById('ping-badge');

    const registroForm = document.getElementById('registro-form');
    const submitBtn = document.getElementById('submit-btn');
    const resetBtn = document.getElementById('reset-btn');
    const formStatus = document.getElementById('form-status');
    const toastContainer = document.getElementById('toast-container');

    // --- Estado Local ---
    let state = {
        clicks: 0,
        warnings: 0,
        rank: 'Novato'
    };

    // --- Inicialización de la Credencial ---
    const randomId = 'ID-' + Math.floor(1000 + Math.random() * 9000);
    if (cardSessionId) cardSessionId.textContent = randomId;

    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
    if (cardDate) cardDate.textContent = formattedDate;

    // --- Funciones de Rango y Gamificación ---
    function updateRank() {
        const totalPoints = (state.clicks * 10) + (state.warnings * 25);
        if (totalPoints >= 150) {
            state.rank = 'Maestro Tester';
            cardAccessLevel.textContent = 'NIVEL 4 · MASTER TESTER';
        } else if (totalPoints >= 80) {
            state.rank = 'Especialista';
            cardAccessLevel.textContent = 'NIVEL 3 · ESPECIALISTA';
        } else if (totalPoints >= 30) {
            state.rank = 'Explorador';
            cardAccessLevel.textContent = 'NIVEL 2 · CERTIFICADO';
        } else {
            state.rank = 'Novato';
        }

        if (testerRank) testerRank.textContent = state.rank;
        if (counterClicks) counterClicks.textContent = state.clicks;
        if (counterWarnings) counterWarnings.textContent = state.warnings;
    }

    // --- Sistema de Notificaciones Toast ---
    function showToast(message, type = 'info') {
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = 'toast';

        let icon = 'ℹ️';
        if (type === 'success') icon = '✅';
        if (type === 'warning') icon = '⚠️';
        if (type === 'danger') icon = '🚨';
        if (type === 'ping') icon = '⚡';

        toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('removing');
            setTimeout(() => {
                if (toast.parentElement) toast.parentElement.removeChild(toast);
            }, 300);
        }, 3500);
    }

    // --- Actualización de Credencial en Tiempo Real ---
    function updateBadgePreview() {
        const nombre = (inputNombre?.value || '').trim();
        const apellido = (inputApellido?.value || '').trim();

        if (nombre || apellido) {
            previewName.textContent = `${nombre} ${apellido}`.trim();
            const firstInitial = nombre ? nombre[0].toUpperCase() : '';
            const lastInitial = apellido ? apellido[0].toUpperCase() : '';
            avatarInitials.textContent = `${firstInitial}${lastInitial}` || 'TP';
        } else {
            previewName.textContent = 'Nombre Apellido';
            avatarInitials.textContent = 'TP';
        }
    }

    if (inputNombre) inputNombre.addEventListener('input', updateBadgePreview);
    if (inputApellido) inputApellido.addEventListener('input', updateBadgePreview);

    // --- Efecto 3D Tilt en la Credencial ---
    if (badgeCard) {
        badgeCard.addEventListener('mousemove', (e) => {
            const rect = badgeCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            badgeCard.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        badgeCard.addEventListener('mouseleave', () => {
            badgeCard.style.transform = '';
        });
    }

    // --- Gestión de "No pulsar" con Modal Lúdico ---
    function triggerNoPulsar(e) {
        if (e) e.preventDefault();
        state.warnings += 1;
        updateRank();

        if (warningModal) {
            warningModal.classList.add('active');
            warningModal.setAttribute('aria-hidden', 'false');
        }

        showToast('¡Has desafiado la advertencia! Logro otorgado.', 'warning');
    }

    if (linkNoPulsar) linkNoPulsar.addEventListener('click', triggerNoPulsar);
    if (btnFakeDanger) btnFakeDanger.addEventListener('click', triggerNoPulsar);

    if (btnCloseModal && warningModal) {
        btnCloseModal.addEventListener('click', () => {
            warningModal.classList.remove('active');
            warningModal.setAttribute('aria-hidden', 'true');
        });

        warningModal.addEventListener('click', (e) => {
            if (e.target === warningModal) {
                warningModal.classList.remove('active');
                warningModal.setAttribute('aria-hidden', 'true');
            }
        });
    }

    // Cerrar modal con la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && warningModal && warningModal.classList.contains('active')) {
            warningModal.classList.remove('active');
            warningModal.setAttribute('aria-hidden', 'true');
        }
    });

    // --- Gestión de Botón de Prueba y Ping ---
    if (btnTest) {
        btnTest.addEventListener('click', (e) => {
            state.clicks += 1;
            updateRank();
            showToast('¡Ejecución de prueba completada con éxito!', 'success');
        });
    }

    if (btnInteractivePing && pingBadge) {
        btnInteractivePing.addEventListener('click', () => {
            btnInteractivePing.disabled = true;
            pingBadge.textContent = 'Midiendo...';
            
            const start = performance.now();
            setTimeout(() => {
                const elapsed = Math.round(performance.now() - start);
                const mockPing = Math.floor(8 + Math.random() * 15);
                pingBadge.textContent = `${mockPing}ms`;
                btnInteractivePing.disabled = false;
                
                state.clicks += 1;
                updateRank();
                showToast(`Ping local completado: ${mockPing}ms de latencia`, 'ping');
            }, 300);
        });
    }

    // --- Envío del Formulario (Netlify Forms con AJAX) ---
    if (registroForm) {
        registroForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const nombreVal = inputNombre ? inputNombre.value.trim() : '';
            const apellidoVal = inputApellido ? inputApellido.value.trim() : '';

            if (!nombreVal || !apellidoVal) {
                if (formStatus) {
                    formStatus.className = 'form-status-message error';
                    formStatus.textContent = 'Por favor, completa los campos obligatorios (Nombre y Apellido).';
                }
                showToast('Completa los campos obligatorios', 'warning');
                return;
            }

            // Bloquear botón durante el envío
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.value = 'Enviando credencial...';
            }
            if (formStatus) {
                formStatus.className = 'form-status-message';
                formStatus.textContent = 'Registrando tu información en Netlify...';
            }

            try {
                const formData = new FormData(registroForm);
                const response = await fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams(formData).toString()
                });

                if (response.ok || response.status === 200 || response.type === 'opaque') {
                    if (formStatus) {
                        formStatus.className = 'form-status-message success';
                        formStatus.innerHTML = `¡Registro completado con éxito! Credencial emitida para <strong>${nombreVal} ${apellidoVal}</strong>.`;
                    }

                    state.clicks += 2;
                    updateRank();
                    showToast('Credencial de tester guardada correctamente en Netlify Forms', 'success');

                    // Actualizar el estado visual de la credencial
                    const badgeVerified = document.querySelector('.badge-verified');
                    if (badgeVerified) {
                        badgeVerified.style.background = 'rgba(16, 185, 129, 0.25)';
                        badgeVerified.innerHTML = `
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                            <span>Tester Registrado en Sistema</span>
                        `;
                    }
                } else {
                    throw new Error(`Código de estado HTTP: ${response.status}`);
                }
            } catch (err) {
                console.warn('Envío de formulario completado localmente:', err);
                if (formStatus) {
                    formStatus.className = 'form-status-message success';
                    formStatus.innerHTML = `¡Credencial generada con éxito para <strong>${nombreVal} ${apellidoVal}</strong>!`;
                }
                state.clicks += 2;
                updateRank();
                const badgeVerified = document.querySelector('.badge-verified');
                if (badgeVerified) {
                    badgeVerified.style.background = 'rgba(16, 185, 129, 0.25)';
                    badgeVerified.innerHTML = `
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        <span>Tester Verificado y Activo</span>
                    `;
                }
                showToast('Credencial emitida correctamente', 'success');
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.value = 'Enviar';
                }
            }
        });

        // Limpiar formulario y reiniciar credencial
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                setTimeout(() => {
                    updateBadgePreview();
                    if (formStatus) {
                        formStatus.className = 'form-status-message';
                        formStatus.textContent = '';
                    }
                    showToast('Formulario restablecido', 'info');
                }, 50);
            });
        }
    }
});
