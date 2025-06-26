// Configuração do tema
const themeConfig = {
    light: {
        background: 'linear-gradient(to bottom right, #f0f2ff, #fde6e8)',
        cardBackground: 'rgba(255, 255, 255, 0.95)',
        textPrimary: '#1a1a1a',
        textSecondary: '#4a5568',
        borderColor: '#e2e8f0',
        hoverBackground: 'rgba(0, 0, 0, 0.05)'
    },
    dark: {
        background: 'linear-gradient(to bottom right, #1a1a2e, #16213e)',
        cardBackground: 'rgba(30, 41, 59, 0.95)',
        textPrimary: '#f1f5f9',
        textSecondary: '#e2e8f0',
        borderColor: '#60a5fa',
        hoverBackground: 'rgba(51, 65, 85, 0.5)'
    }
};

// Gerenciador de tema
class ThemeManager {
    constructor() {
        this.themeButton = document.getElementById('themeButton');
        this.themeIcon = document.getElementById('themeIcon');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        this.init();
    }

    init() {
        // Aplicar tema salvo
        this.applyTheme(this.currentTheme);
        
        // Configurar evento do botão
        this.themeButton.addEventListener('click', () => this.toggleTheme());
        
        // Observar mudanças no tema do sistema
        this.observeSystemTheme();
    }

    applyTheme(theme) {
        const config = themeConfig[theme];
        
        // Atualizar variáveis CSS
        document.documentElement.style.setProperty('--background', config.background);
        document.documentElement.style.setProperty('--card-background', config.cardBackground);
        document.documentElement.style.setProperty('--text-primary', config.textPrimary);
        document.documentElement.style.setProperty('--text-secondary', config.textSecondary);
        document.documentElement.style.setProperty('--border-color', config.borderColor);
        document.documentElement.style.setProperty('--hover-background', config.hoverBackground);
        
        // Atualizar classes do body
        document.body.classList.toggle('dark-theme', theme === 'dark');
        
        // Atualizar ícone
        this.updateThemeIcon(theme);
        
        // Salvar preferência
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
    }

    updateThemeIcon(theme) {
        this.themeIcon.innerHTML = theme === 'light' 
            ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
               </svg>`
            : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
               </svg>`;
    }

    observeSystemTheme() {
        // Verificar se o navegador suporta prefers-color-scheme
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            // Função para atualizar o tema baseado na preferência do sistema
            const updateThemeFromSystem = (e) => {
                const systemTheme = e.matches ? 'dark' : 'light';
                // Só atualiza se o usuário não tiver uma preferência salva
                if (!localStorage.getItem('theme')) {
                    this.applyTheme(systemTheme);
                }
            };
            
            // Adicionar listener para mudanças na preferência do sistema
            mediaQuery.addListener(updateThemeFromSystem);
            
            // Aplicar tema inicial baseado no sistema se não houver preferência salva
            if (!localStorage.getItem('theme')) {
                updateThemeFromSystem(mediaQuery);
            }
        }
    }
}

// Inicializar o gerenciador de tema quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
}); 