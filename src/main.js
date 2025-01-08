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
    let isPlaying = false;

    // Set initial volume
    music.volume = 0.3;

    musicToggle.addEventListener('click', () => {
        if (!isPlaying) {
            music.play();
            musicToggle.classList.remove('muted');
        } else {
            music.pause();
            musicToggle.classList.add('muted');
        }
        isPlaying = !isPlaying;
    });

    // Auto-play handling (optional)
    document.addEventListener('click', () => {
        if (!isPlaying) {
            music.play();
            musicToggle.classList.remove('muted');
            isPlaying = true;
        }
    }, { once: true });
}

document.addEventListener('DOMContentLoaded', async () => {
    await simulateScan()
    initializeInterface()
    setupAudio()
})
