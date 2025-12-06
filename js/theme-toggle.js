/**
 * Theme Toggle - Modo Oscuro/Claro
 * Gestiona el cambio entre temas y guarda la preferencia del usuario
 */

(function () {
    'use strict';

    // Constantes
    const THEME_KEY = 'bienestar-theme';
    const THEME_DARK = 'dark';
    const THEME_LIGHT = 'light';

    // Elementos
    let themeToggle = null;

    /**
     * Obtiene el tema guardado o la preferencia del sistema
     */
    function getSavedTheme() {
        const savedTheme = localStorage.getItem(THEME_KEY);
        if (savedTheme) {
            return savedTheme;
        }

        // Detectar preferencia del sistema
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return THEME_DARK;
        }

        return THEME_LIGHT;
    }

    /**
     * Aplica el tema al documento
     */
    function applyTheme(theme) {
        if (theme === THEME_DARK) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }

        // Actualizar icono del botón
        updateToggleIcon(theme);

        // Guardar preferencia
        localStorage.setItem(THEME_KEY, theme);
    }

    /**
     * Actualiza el icono del botón toggle
     */
    function updateToggleIcon(theme) {
        if (!themeToggle) return;

        if (theme === THEME_DARK) {
            themeToggle.innerHTML = '🌙';
            themeToggle.setAttribute('aria-label', 'Cambiar a modo claro');
        } else {
            themeToggle.innerHTML = '☀️';
            themeToggle.setAttribute('aria-label', 'Cambiar a modo oscuro');
        }
    }

    /**
     * Alterna entre temas
     */
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark'
            ? THEME_DARK
            : THEME_LIGHT;

        const newTheme = currentTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK;

        // Añadir clase de transición
        document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';

        applyTheme(newTheme);

        // Remover clase de transición después de la animación
        setTimeout(() => {
            document.documentElement.style.transition = '';
        }, 300);
    }

    /**
     * Crea el botón toggle si no existe
     */
    function createToggleButton() {
        // Verificar si ya existe
        if (document.querySelector('.theme-toggle')) {
            return document.querySelector('.theme-toggle');
        }

        const button = document.createElement('button');
        button.className = 'theme-toggle';
        button.setAttribute('aria-label', 'Cambiar tema');
        button.setAttribute('type', 'button');

        // Añadir evento
        button.addEventListener('click', toggleTheme);

        // Añadir al body
        document.body.appendChild(button);

        return button;
    }

    /**
     * Inicializa el sistema de temas
     */
    function init() {
        // Aplicar tema guardado inmediatamente (antes del DOMContentLoaded)
        const savedTheme = getSavedTheme();
        applyTheme(savedTheme);

        // Cuando el DOM esté listo, crear el botón
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                themeToggle = createToggleButton();
                updateToggleIcon(savedTheme);
            });
        } else {
            themeToggle = createToggleButton();
            updateToggleIcon(savedTheme);
        }

        // Escuchar cambios en la preferencia del sistema
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                // Solo aplicar si el usuario no ha establecido una preferencia manual
                if (!localStorage.getItem(THEME_KEY)) {
                    applyTheme(e.matches ? THEME_DARK : THEME_LIGHT);
                }
            });
        }
    }

    // Inicializar inmediatamente
    init();

    // Exponer API global para debugging
    window.ThemeToggle = {
        toggle: toggleTheme,
        setTheme: applyTheme,
        getTheme: () => document.documentElement.getAttribute('data-theme') === 'dark' ? THEME_DARK : THEME_LIGHT,
        reset: () => {
            localStorage.removeItem(THEME_KEY);
            applyTheme(getSavedTheme());
        }
    };

})();
