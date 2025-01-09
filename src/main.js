import './styles/style.css'
import { Terminal } from './js/terminal'
import { Waveform } from './js/waveform'

function initializeInterface() {
    try {
        const terminal = new Terminal()
    } catch (error) {
        console.error('Initialization error:', error)
    }
}

// Simulate scanning process
function simulateScan() {
    return new Promise(resolve => {
        const scanOverlay = document.getElementById('scanOverlay')
        const container = document.querySelector('.container')
        const scanStatus = document.querySelector('.scan-status')
        const scanDetails = document.querySelector('.scan-details')
        
        // Add typing class to trigger animation
        scanStatus.style.width = '0'
        scanDetails.style.width = '0'
        
        setTimeout(() => {
            scanStatus.style.width = '100%'
        }, 500)
        
        setTimeout(() => {
            scanDetails.style.width = '100%'
        }, 2000)
        
        // Show scanning animation for 5 seconds total
        setTimeout(() => {
            scanOverlay.classList.add('fade-out')
            container.classList.add('visible')
            
            // Remove overlay after animation
            setTimeout(() => {
                scanOverlay.style.display = 'none'
                resolve()
            }, 1000)
        }, 5000)
    })
}

function setupAudio() {
    const music = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    let isPlaying = true;

    // Set initial volume
    music.volume = 0.3;

    // Add muted class initially to show correct icon state
    musicToggle.classList.remove('muted');

    // Try to play immediately
    const playPromise = music.play();

    if (playPromise !== undefined) {
        playPromise.catch(error => {
            // Auto-play was prevented
            // Show user a message or button to manually start
            isPlaying = false;
            musicToggle.classList.add('muted');
            
            // Add one-time click handler to start music
            document.addEventListener('click', () => {
                if (!isPlaying) {
                    music.play();
                    musicToggle.classList.remove('muted');
                    isPlaying = true;
                }
            }, { once: true });
        });
    }

    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            music.pause();
            musicToggle.classList.add('muted');
        } else {
            music.play();
            musicToggle.classList.remove('muted');
        }
        isPlaying = !isPlaying;
    });
}

function setupModal() {
    const modal = document.getElementById('agentModal');
    const addAgentBtn = document.getElementById('addAgentBtn');
    const comingSoonBtn = document.querySelector('.coming-soon-btn');
    const cancelBtn = document.querySelector('.cancel-btn');

    addAgentBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    comingSoonBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    cancelBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    await simulateScan()
    initializeInterface()
    setupAudio()
    setupModal()
})
