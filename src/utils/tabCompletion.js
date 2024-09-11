export const tabCompletion = (input, commandList) => {
  const matchingCommands = commandList.filter(cmd => cmd.startsWith(input));
  if (matchingCommands.length === 1) {
    return matchingCommands[0];
  }
  return input;
};
