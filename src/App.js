import React, { useState, useEffect, useRef } from 'react';
import './styles/App.css';
import InputField from './components/InputField/InputField';
import OutputDisplay from './components/OutputDisplay/OutputDisplay';
import { processCommand } from './utils/commands';
import { tabCompletion } from './utils/tabCompletion';
import { commandList } from './utils/commands'; 

const App = () => {
  const [commands, setCommands] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTabCompleted, setIsTabCompleted] = useState(false); // Track if tab completion occurred
  const terminalRef = useRef(null);

  useEffect(() => {
    // Define an async function inside useEffect
    const initializeCommands = async () => {
      const welcomeOutput = await processCommand('welcome', () => {});
      const initCommands = [
        {
          input: 'zephyr:~$',
          output: welcomeOutput,
          currentInput: 'welcome',
          isProcessed: true
        },
        {
          input: 'zephyr:~$',
          output: '',
          currentInput: '',
          isProcessed: false
        }
      ];
      setCommands(initCommands);
    };

    initializeCommands();
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands]);

  const handleCommand = async (e, index) => {
    if (e.key === 'Enter') {
      const cmd = commands[index].currentInput.trim();
      await processUserCommand(cmd, index);
    } else if (e.key === 'ArrowUp') {
      navigateHistory(index, 'up');
    } else if (e.key === 'ArrowDown') {
      navigateHistory(index, 'down');
    } else if (e.key === 'Tab') {
      e.preventDefault(); // Prevent the default tab behavior
      const cmd = commands[index].currentInput.trim();
      const completedCmd = tabCompletion(cmd, commandList); // Use tabCompletion function
      if (completedCmd !== cmd) {
        const updatedCommands = [...commands];
        updatedCommands[index].currentInput = completedCmd;
        setCommands(updatedCommands);
        setIsTabCompleted(true); // Set tab completion flag
      }
    }
  };

  const navigateHistory = (index, direction) => {
    const newIndex = direction === 'up'
      ? Math.min(historyIndex + 1, commandHistory.length - 1)
      : Math.max(historyIndex - 1, -1);

    setHistoryIndex(newIndex);

    const updatedCommands = [...commands];
    updatedCommands[index].currentInput = commandHistory[commandHistory.length - 1 - newIndex] || '';
    setCommands(updatedCommands);
  };

  const processUserCommand = async (cmd, index) => {
    const result = await processCommand(cmd, setCommands);
    setCommandHistory([...commandHistory, cmd]);
    setHistoryIndex(-1);

    if (cmd === 'clear') {
      // Clear both the input field and the previous commands
      setCommands([{ input: 'zephyr:~$', currentInput: '', output: '', isProcessed: false }]);
    } else {
      // Add command output and a new prompt
      const updatedCommands = [...commands];
      updatedCommands[index].output = result;
      updatedCommands[index].isProcessed = true;
      updatedCommands.push({ input: 'zephyr:~$', currentInput: '', output: '', isProcessed: false });
      setCommands(updatedCommands);
    }
  };

  const handleChange = (e, index) => {
    const updatedCommands = [...commands];
    updatedCommands[index].currentInput = e.target.value;
    setCommands(updatedCommands);
    setIsTabCompleted(false); // Reset tab completion flag
  };

  return (
    <div id="terminal" ref={terminalRef}>
      {commands.map((cmd, index) => (
        <div key={index}>
          <InputField
            value={cmd.currentInput}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleCommand(e, index)}
          />
          <OutputDisplay output={cmd.output} />
        </div>
      ))}
    </div>
  );
};

export default App;
