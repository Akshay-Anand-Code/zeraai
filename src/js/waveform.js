export class Waveform {
    constructor() {
        this.canvas = document.getElementById('waveform');
        if (!this.canvas) {
            throw new Error('Waveform canvas element not found');
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.setupCanvas();
        this.animate = this.animate.bind(this);
        window.addEventListener('resize', () => this.setupCanvas());
    }

    setupCanvas() {
        const container = this.canvas.parentElement;
        this.canvas.width = container.offsetWidth;
        this.canvas.height = container.offsetHeight;
    }

    animate() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#00ff00';
        this.ctx.lineWidth = 2;
        
        for (let i = 0; i < this.canvas.width; i++) {
            const y = this.canvas.height/2 + 
                     Math.sin(i * 0.02 + Date.now() * 0.001) * 30 +
                     Math.sin(i * 0.01 + Date.now() * 0.002) * 20;
            
            if (i === 0) {
                this.ctx.moveTo(i, y);
            } else {
                this.ctx.lineTo(i, y);
            }
        }
        
        this.ctx.stroke();
        requestAnimationFrame(this.animate);
    }

    start() {
        this.animate();
    }
} 