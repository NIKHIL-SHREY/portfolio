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
          result = `Welcome! Here are all available commands:\n\n` +
                   `about - Who I am, interests, achievements\n` +
                   `banner - ASCII art and image\n` +
                   `github - Opens GitHub profile\n` +
                   `resume - Downloads my resume\n` +
                   `projects - Key projects\n` +
                   `skills - Programming languages, blockchain, ML\n` +
                   `contact - Contact info\n` +
                   `email - Open email client\n` +
                   `linkedin - Opens LinkedIn profile\n` +
                   `instagram - Opens Instagram profile\n` +
                   `cat - reads file\n` +
                   `clear - Clears the terminal\n` +
                   `sudo - sudo access\n` ;
          break;
        case 'about':
          result = `Hi! I’m a passionate developer.\n\n` +
                   `CURRENT INTERESTS:\n` +
                   `- Blockchain\n` +
                   `- Machine Learning\n\n` +
                   `ACHIEVEMENTS:\n` +
                   `- Developed several decentralized applications\n` +
                   `- Published research on ML techniques\n\n` +
                   `CONNECT WITH ME:\n` +
                   `- [GitHub](https://github.com/NIKHIL-SHREY)\n` +
                   `- [LinkedIn](https://linkedin.com/in/nikhil-shrey)\n`;
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
          result = `${asciiArt}<img src="${profileImg}" alt="Profile" style="width:100px;height:100px;"/>`;
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
          result = 'Key projects:\n' +
                   '- ON CHAIN RADIO: A blockchain-based radio platform.\n' +
                   '- CSL LOSS FUNCTION: A novel loss function for machine learning.\n' +
                   '- BLOCKCHAIN VOTING: A decentralized voting system.\n';
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
          result = 'Contact Information:\n' +
                   '- Email: [nikhil.shrey.2003@gmail.com](mailto:nikhil.shrey.2003@gmail.com)\n' +
                   '- Phone: [+91 9111900797](tel:+919111900797)\n';
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
        case 'cd':
          result = `Changing directory to '${args}'... Just kidding, you are already here!`;
          break;
        case 'ls':
          result = `Listing directory contents for '${args}'... Just kidding, nothing to see here!`;
          break;
        case 'vim':
          result = `vim is not recognized as an internal or external command, operable program or batch file.\n` +
                   `If you are trying to edit '${args}', you might want to use a real editor.`;
          break;
        case 'sudo':
          result = `Sorry, I can’t do that; you need to be a root. But here's a Rickroll for you:`;
          window.open('https://www.youtube.com/watch?v=xvFZjo5PgG0', '_blank');
          break;
        case 'vi':
          result = `vi is not implemented.\n` +
                   `If you are trying to open '${args}', you might want to use a real editor.`;
          break;
        case 'readme':
          result = `README is not implemented.\n` +
                   `If you need information about '${args}', please consult the documentation.`;
          break;
        case 'mkdir':
          result = `Making directory '${args}'... Just kidding, we don’t need directories here!`;
          break;
        case 'cat':
          const catImageUrl = await fetchCatImage();
          result = `<img src="${catImageUrl}" alt="Random Cat" style="width:200px;height:200px;"/>`;
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
