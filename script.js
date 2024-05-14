document.addEventListener('DOMContentLoaded', () => {
    const terminalOutput = document.getElementById('terminal-output');
    const commandInput = document.getElementById('command-input');

    const commands = {
        help: 'Available commands: about\n, skills\n, projects\n, contact\n, clear\n',
        about: 'I am a web developer with a passion for creating interactive applications.',
        skills: 'HTML, CSS, JavaScript, React, Node.js',
        projects: 'Project 1: A cool web app\nProject 2: Another cool project',
        contact: 'Email: example@example.com\nLinkedIn: linkedin.com/in/example'
    };

    const handleCommand = (input) => {
        const command = input.trim().toLowerCase();
        let response;
        if (command === 'clear') {
            terminalOutput.innerHTML = '';
            return;
        } else if (commands.hasOwnProperty(command)) {
            response = commands[command];
        } else {
            response = `'${command}' is not recognized as a valid command. Type 'help' for a list of available commands.`;
        }
        terminalOutput.innerHTML += `<div>$ ${input}</div><div>${response}</div>`;
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    };

    commandInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const input = commandInput.value;
            handleCommand(input);
            commandInput.value = '';
        }
    });
});
