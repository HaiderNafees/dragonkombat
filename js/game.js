class TokenGame {
    constructor() {
        this.tokens = parseInt(localStorage.getItem('tokens')) || 0;
        this.tokensPerClick = 1;
        
        this.elements = {
            tokenCount: document.getElementById('tokenCount'),
            totalCoins: document.getElementById('totalCoins'),
            coinTarget: document.getElementById('coinTarget')
        };
        
        this.init();
        this.initCountdown();
    }

    init() {
        this.updateDisplay();
        
        // Add click event for coin target
        this.elements.coinTarget.addEventListener('click', () => this.handleClick());
        
        // Save game state periodically
        setInterval(() => this.saveGame(), 5000);
    }

    handleClick() {
        this.tokens += this.tokensPerClick;
        this.updateDisplay();
        this.createTokenPopup();
        this.saveGame();
    }

    createTokenPopup() {
        const popup = document.createElement('div');
        popup.className = 'token-popup';
        popup.textContent = `+${this.tokensPerClick}`;
        
        // Random position around the click area
        const randomX = Math.random() * 40 - 20;
        popup.style.left = `calc(50% + ${randomX}px)`;
        
        this.elements.coinTarget.appendChild(popup);
        setTimeout(() => popup.remove(), 800);
    }

    updateDisplay() {
        // Update token displays
        this.elements.tokenCount.textContent = this.formatNumber(this.tokens);
        this.elements.totalCoins.textContent = this.formatNumber(this.tokens);
    }

    initCountdown() {
        const targetDate = new Date('March 31, 2025 00:00:00').getTime();
        
        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        };

        // Update immediately and then every second
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    formatNumber(num) {
        if (num < 1000) return num;
        if (num < 1000000) return (num/1000).toFixed(1) + 'K';
        return (num/1000000).toFixed(1) + 'M';
    }

    saveGame() {
        localStorage.setItem('tokens', this.tokens);
    }
}

// Initialize game when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TokenGame();
}); 