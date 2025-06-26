// Gerenciador de Menu
class MenuManager {
    constructor() {
        this.menuButton = document.getElementById('menuButton');
        this.sideMenu = document.getElementById('sideMenu');
        
        this.init();
    }

    init() {
        // Configurar evento do botão
        this.menuButton.addEventListener('click', () => this.toggleMenu());
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!this.sideMenu.contains(e.target) && !this.menuButton.contains(e.target)) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        this.sideMenu.classList.toggle('menu-closed');
        this.sideMenu.classList.toggle('menu-open');
    }

    closeMenu() {
        this.sideMenu.classList.add('menu-closed');
        this.sideMenu.classList.remove('menu-open');
    }
}

// Inicializar o gerenciador de menu quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new MenuManager();
}); 