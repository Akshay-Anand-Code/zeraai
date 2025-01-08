import { getChatResponse } from './openai';

export class Terminal {
    constructor() {
        this.terminal = document.getElementById('terminal');
        if (!this.terminal) {
            throw new Error('Terminal element not found');
        }
        
        this.input = document.getElementById('terminal-input');
        if (!this.input) {
            throw new Error('Terminal input element not found');
        }
        
        this.setupEventListeners();
        this.commandHistory = [];
        this.historyIndex = -1;
        this.chatMode = false;
    }

    setupEventListeners() {
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.handleCommand();
            } else if (e.key === 'ArrowUp') {
                this.navigateHistory(-1);
                e.preventDefault();
            } else if (e.key === 'ArrowDown') {
                this.navigateHistory(1);
                e.preventDefault();
            }
        });
    }

    async handleCommand() {
        const command = this.input.value.trim();
        if (!command) return;
        
        this.commandHistory.push(command);
        this.historyIndex = this.commandHistory.length;
        this.printOutput(`> ${command}`);
        
        if (this.chatMode) {
            if (command.toLowerCase() === 'exit') {
                this.chatMode = false;
                this.printOutput('Exiting chat mode...');
            } else {
                try {
                    this.printOutput('AETHER: Analyzing input patterns...');
                    const response = await getChatResponse(command);
                    this.printOutput(`AETHER: ${response}`);
                } catch (error) {
                    this.printOutput(`ERROR: ${error.message}`);
                    if (error.message.includes('API key')) {
                        this.chatMode = false;
                    }
                }
            }
        } else {
            switch (command.toLowerCase()) {
                case 'help':
                    this.printOutput(`Available commands:
- help: Show this help message
- chat: Enter chat mode with AETHER
- clear: Clear the terminal
- exit: Exit current mode`);
                    break;
                case 'chat':
                    this.chatMode = true;
                    this.printOutput(`
Establishing connection to AETHER...
Connection established.
WARNING: Experimental AI interface detected.
Type 'exit' to end chat mode.
                    `);
                    break;
                case 'clear':
                    this.clearTerminal();
                    break;
                default:
                    this.printOutput('Command not recognized. Type "help" for available commands.');
            }
        }
        
        // Clear input after processing command
        this.input.value = '';
    }

    printOutput(text) {
        const output = document.createElement('div');
        output.className = 'output';
        output.textContent = text;
        this.terminal.insertBefore(output, this.input.parentElement);
        this.terminal.scrollTop = this.terminal.scrollHeight;
    }

    clearTerminal() {
        while (this.terminal.firstChild) {
            if (this.terminal.firstChild === this.input.parentElement) break;
            this.terminal.removeChild(this.terminal.firstChild);
        }
    }

    async simulateAIResponse(message) {
        this.printOutput('Processing query...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.printOutput(`AI: I received your message: "${message}"`);
    }

    navigateHistory(direction) {
        this.historyIndex += direction;
        if (this.historyIndex < 0) this.historyIndex = 0;
        if (this.historyIndex > this.commandHistory.length) {
            this.historyIndex = this.commandHistory.length;
        }

        this.input.value = this.commandHistory[this.historyIndex] || '';
    }
} 