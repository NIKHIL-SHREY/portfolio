import React from 'react';
import './InputField.css';

const InputField = ({ value, onChange, onKeyDown, prompt }) => {
  return (
    <div className="input-line">
      {/* Display the prompt (zephyr:~$) before the input field */}
      <span className="prompt">{prompt || 'zephyr:~$'}</span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="input-field"
        autoFocus
      />
    </div>
  );
};

export default InputField;
