import React, { useState, useEffect, useRef } from 'react';
import './Terminal.css';
import profileImg from '../assets/profile.jpg';
import resumePdf from '../assets/resume.pdf';

// Function to fetch a random cat image
const fetchCatImage = async () => {
  try {
    const response = await fetch('https://api.thecatapi.com/v1/images/search');
    const data = await response.json();
    return data[0]?.url || 'https://placekitten.com/400/400'; // Fallback image
  } catch (error) {
    console.error('Error fetching cat image:', error);
    return 'https://placekitten.com/400/400'; // Fallback image
  }
};

const Terminal = () => {
  const [commands, setCommands] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);  // For storing the command history
  const [historyIndex, setHistoryIndex] = useState(-1);  // For navigating through command history
  const terminalRef = useRef(null);

  const asciiArt = `
░▒▓████████▓▒░░▒▓████████▓▒░░▒▓███████▓▒░ ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░░▒▓███████▓▒░  
       ░▒▓█▓▒░░▒▓█▓▒░       ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░ 
     ░▒▓██▓▒░ ░▒▓█▓▒░       ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░ 
   ░▒▓██▓▒░   ░▒▓██████▓▒░  ░▒▓███████▓▒░ ░▒▓████████▓▒░ ░▒▓██████▓▒░ ░▒▓███████▓▒░  
 ░▒▓██▓▒░     ░▒▓█▓▒░       ░▒▓█▓▒░       ░▒▓█▓▒░░▒▓█▓▒░   ░▒▓█▓▒░    ░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░       ░▒▓█▓▒░       ░▒▓█▓▒░       ░▒▓█▓▒░░▒▓█▓▒░   ░▒▓█▓▒░    ░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓████████▓▒░░▒▓████████▓▒░░▒▓█▓▒░       ░▒▓█▓▒░░▒▓█▓▒░   ░▒▓█▓▒░    ░▒▓█▓▒░░▒▓█▓▒░ 
`;

  const initialCommand = {
    input: 'zephyr:~$',
    output: `${asciiArt}\nType 'help' to see the list of available commands.\nType 'zephyr' to display summary.\n`,
    currentInput: '',
    isProcessed: false
  };

  useEffect(() => {
    setCommands([initialCommand]);
  }, []);

  useEffect(() => {
    const terminal = terminalRef.current;
    if (terminal) {
      terminal.scrollTop = terminal.scrollHeight;
    }
  }, [commands]);

  const handleCommand = async (e, index) => {
    if (e.key === 'Enter') {
      const cmd = commands[index].currentInput.trim();
      await processCommand(cmd, index);
      setCommandHistory([...commandHistory, cmd]); // Add command to history
      setHistoryIndex(-1); // Reset history index
    } else if (e.key === 'ArrowUp') {
      // Navigate up in the command history
      const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
      setHistoryIndex(newIndex);
      if (newIndex >= 0) {
        const updatedCommands = [...commands];
        updatedCommands[index].currentInput = commandHistory[commandHistory.length - 1 - newIndex];
        setCommands(updatedCommands);
      }
    } else if (e.key === 'ArrowDown') {
      // Navigate down in the command history
      const newIndex = historyIndex > 0 ? historyIndex - 1 : -1;
      setHistoryIndex(newIndex);
      if (newIndex >= 0) {
        const updatedCommands = [...commands];
        updatedCommands[index].currentInput = commandHistory[commandHistory.length - 1 - newIndex];
        setCommands(updatedCommands);
      } else {
        const updatedCommands = [...commands];
        updatedCommands[index].currentInput = '';
        setCommands(updatedCommands);
      }
    }
  };

  const processCommand = async (cmd, index) => {

    let result = '';
    const commandPattern = /^(\w+)(?:\s+(.*))?$/; // Matches "command" or "command arg1 arg2"
    const matches = cmd.match(commandPattern);

    if (!matches) {
      result = `'${cmd}' is not recognized as a command.`;
    } else {
      const command = matches[1].toLowerCase();
      const args = matches[2] || '';

      switch (command) {
        case 'help':
          result = `
          **Welcome to Nikhil's Terminal!** Here's a list of all available commands:

          **Commands**:
          - about  banner  github  linkedin  twitter  instagram  projects
          - skills  contact  resume  donate  cat  clear  sudo  mkdir  vim  vi
          - nano  nvim  readme

          **Major Commands**:
          - **about**: Who I am, my interests, and achievements.
          - **banner**: View my ASCII art and profile image.
          - **projects**: Read about the exciting projects I've worked on.
          - **skills**: Explore my technical skills, with links to relevant resources.
          - **contact**: Get my contact information and copy it to the clipboard.
          - **resume**: Download my resume.
          - **sudo**: sudo access.
          
          Type the command you want to explore!`;
          break;

        case 'about':
          result = `👨‍💻 **Who I am?**
          I'm **Nikhil Kumar Shrey**, a dedicated developer with a knack for creating decentralized applications and tackling complex machine learning challenges.

          **🚀 Current Interests**:
          - Blockchain development, focusing on decentralization and transparency.
          - Machine learning, particularly class-sensitive loss functions and reinforcement learning.

          **🏆 Achievements**:
          - Developed **OnChain Radio** on the Aptos Blockchain to revolutionize artist compensation.
          - Conducted research on reinforcement learning to improve class imbalance in datasets.
          - Built a secure, decentralized **voting system** for fair and transparent elections.

          **🔗 Connect with me**:
          - [GitHub](https://github.com/NIKHIL-SHREY) (click to open in new tab)
          - [LinkedIn](https://linkedin.com/in/nikhil-shrey)
          - [Instagram](https://instagram.com/nikhilshrey)

          Always excited to collaborate and explore new innovations at the intersection of AI and blockchain.`;
          break;

        case 'github':
          result = 'Opening GitHub…';
          window.open('https://github.com/NIKHIL-SHREY', '_blank');
          break;
        case 'linkedin':
          result = 'Opening LinkedIn…';
          window.open('https://linkedin.com/in/nikhil-shrey', '_blank');
          break;
        case 'twitter':
          result = 'Opening Twitter…';
          window.open('https://twitter.com/yourtwitter', '_blank');
          break;
        case 'instagram':
          result = 'Opening Instagram…';
          window.open('https://instagram.com/nikhilshrey', '_blank');
          break;

        case 'banner':
          result = `
          <div style="display: flex; align-items: center;">
            <pre style="flex: 1;">${asciiArt}</pre>
            <img src="${profileImg}" alt="Profile" 
              style="border-radius: 50%; width: 150px; height: 150px; object-fit: cover; image-rendering: pixelated; margin-left: 20px;" />
          </div>
          <br>Welcome to my terminal!`;
          break;

        case 'zephyr':
          result = `${asciiArt}\n\nABOUT :: [GitHub](https://github.com/NIKHIL-SHREY), [LinkedIn](https://linkedin.com/in/nikhil-shrey)\nCONTACT :: [Email](mailto:nikhil.shrey.2003@gmail.com), [Phone](tel:+919111900797)`;
          break;
        case 'resume':
          result = 'Downloading resume…';
          const link = document.createElement('a');
          link.href = resumePdf;
          link.download = 'resume.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          break;

        case 'projects':
          result = `Here are a few projects I've worked on:

          - **OnChain Radio**: A decentralized music streaming platform on the Aptos Blockchain that aims to revolutionize artist compensation and music copyright management.
          - **CSL Loss Function**: A research project aimed at improving class-sensitive learning by addressing long-tailed datasets using reinforcement learning.
          - **Blockchain Voting System**: Developed a decentralized voting platform that ensures secure, transparent, and tamper-proof elections.
          `;
          break;

        case 'skills':
          result = 'Programming languages:\n' +
                   '- JavaScript\n' +
                   '- Python\n' +
                   '- Solidity\n\n' +
                   'Blockchain:\n' +
                   '- Ethereum\n' +
                   '- Aptos\n\n' + 
                   'Machine Learning:\n' +
                   '- TensorFlow\n' +
                   '- PyTorch\n';
          break;

        case 'contact':
          result = `**Contact Information**:
          - **Email**: <span onclick="navigator.clipboard.writeText('nikhil.shrey.2003@gmail.com')">nikhil.shrey.2003@gmail.com</span> (Click to copy)
          - **Phone**: <span onclick="navigator.clipboard.writeText('+91 9111900797')">+91 9111900797</span> (Click to copy)`;
          break;

        case 'email':
          result = 'Opening email client…';
          window.open('mailto:nikhil.shrey.2003@gmail.com', '_blank');
          break;

        case 'google':
          result = 'Opening Google…';
          window.open('https://www.google.com', '_blank');
          break;
        case 'donate':
          result = `If you would like to support me, you can donate using the following MetaMask address:\n\n` +
                   `MetaMask Address: 0x15c10085818Da3ba29145080Fb6D4FB875cf904B\n\n` +
                   `Thank you for your support!`;
          break;

        case 'sudo':
          result = `Sorry, I can’t do that; you need to be root. But here's something for you:
          <br><img src="https://media.giphy.com/media/VUwSH0Zcgx7Zm/giphy.gif" alt="Rickroll" style="width: 300px;" />
          <br><a href="https://www.youtube.com/watch?v=xvFZjo5PgG0" target="_blank">Click here if the video doesn’t open automatically</a>.`;
          window.open('https://www.youtube.com/watch?v=xvFZjo5PgG0', '_blank');
          break;

        case 'cd':
          result = `Changing directory to '${args}'... Just kidding, you are already here!`;
          break;
        case 'ls':
          result = `Listing directory contents for '${args}'... Just kidding, nothing to see here!`;
          break;

        case 'vim':
          result = `**vim** is too powerful for this terminal. Maybe try 'nano'.`;
          break;
        case 'nano':
          result = `**nano** is a bit complicated for this terminal. How about 'nvim'?`;
          break;
        case 'nvim':
          result = `**nvim** might be a little too advanced. How about we stick to 'vim'?`;
          break;
        case 'vi':
          result = `**vi** is not recognized. Stick to 'vim' or 'nano'.`;
          break;

        case 'readme':
          result = `No **README** file found. Just dive right into the commands!`;
          break;
        case 'mkdir':
          result = `**mkdir**: Creating directories is too old-school here. Everything's already in place!`;
          break;

        case 'cat':
          const catImageUrl = await fetchCatImage();
          result = `<img src="${catImageUrl}" alt="Random Cat" style="width: auto; height: auto;" />`;
          break;

        case 'clear':
          setCommands([{ input: 'zephyr:~$', currentInput: '', output: '', isProcessed: false }]);
          return;
        default:
          result = `'${cmd}' is not recognized as a command.`;
      }
    }

    

    const updatedCommands = [...commands];
    updatedCommands[index].output = result;
    updatedCommands[index].isProcessed = true;
    updatedCommands.push({ input: 'zephyr:~$', currentInput: '', output: '', isProcessed: false });
    setCommands(updatedCommands);
  };

  const handleChange = (e, index) => {
    const updatedCommands = [...commands];
    updatedCommands[index].currentInput = e.target.value;
    setCommands(updatedCommands);
  };

  return (
    <div id="terminal" ref={terminalRef}>
      {commands.map((cmd, index) => (
        <div key={index} className="command-block">
          <div className="input-container">
            <span className="prompt">{cmd.input}</span>
            {cmd.isProcessed ? (
              <span className="typed-command">{cmd.currentInput}</span>
            ) : (
              <input
                type="text"
                value={cmd.currentInput}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleCommand(e, index)}
                autoFocus
              />
            )}
          </div>
          {cmd.output && (
            <div className="output" dangerouslySetInnerHTML={{ __html: cmd.output }} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Terminal;
