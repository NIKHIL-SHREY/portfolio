import React from 'react';
import './CommandHistory.css';

const CommandHistory = ({ commands }) => {
  return (
    <div>
      {commands.map((cmd, index) => (
        <div key={index} className="command-block">
          <div className="input-container">
            <span className="prompt">{cmd.input}</span>
            <span className="typed-command">{cmd.currentInput}</span>
          </div>
          <div className="output">
            <pre>{cmd.output}</pre>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommandHistory;
