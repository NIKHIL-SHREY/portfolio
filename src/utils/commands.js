import { asciiArt } from './zephyr';
import profileImg from '../assets/profile.jpg';
import resumePdf from '../assets/resume.pdf';
import { fetchCatImage } from './apiCommands';
import { summaryInfo } from './zephyr';

export const commandList = [
  "welcome", "help", "about", "banner", "github", "linkedin", "twitter", "instagram",
  "projects", "skills", "contact", "resume", "donate", "cat",
  "clear", "sudo", "mkdir", "vim", "vi", "nano", "nvim", "readme"
];

export const processCommand = async (cmd, setCommands) => {
  let result = ''; // Define the result variable
  const commandPattern = /^(\w+)(?:\s+(.*))?$/; // Matches "command" or "command arg1 arg2"
  const matches = cmd.match(commandPattern);

  if (!matches) {
    return `'${cmd}' is not recognized as a command.`;
  }

  const command = matches[1].toLowerCase();
  const args = matches[2] || '';

  switch (command) {
    case 'welcome':
      result = `
        <div class="ascii-image-container">
          <pre class="ascii-art">${asciiArt}</pre>
          <img src="${profileImg}" alt="Profile" class="profile-image" />
        </div>
        Welcome to my terminal! 
        Type <strong>'help'</strong> to see available commands. Type <strong>'zephyr'</strong> for a summary of my profile.`;
      break;
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
      result = `
        👨‍💻 <strong>Who I am?</strong><br>
        I'm <strong>Nikhil Kumar Shrey</strong>, a dedicated developer with a knack for creating decentralized applications and tackling complex machine learning challenges.
    
        <strong>🚀 Current Interests:</strong>
        - Blockchain development, focusing on decentralization and transparency.
        - Machine learning, particularly class-sensitive loss functions and reinforcement learning.
    
        <strong>🏆 Achievements:</strong>
        - Developed <strong>OnChain Radio</strong> on the Aptos Blockchain to revolutionize artist compensation.
        - Conducted research on reinforcement learning to improve class imbalance in datasets.
        - Built a secure, decentralized <strong>voting system</strong> for fair and transparent elections.
    
        <strong>🔗 Connect with me:</strong>
        - <a href="https://github.com/NIKHIL-SHREY" target="_blank">GitHub</a>
        - <a href="https://linkedin.com/in/nikhil-shrey" target="_blank">LinkedIn</a>
        - <a href="https://instagram.com/nikhilshrey" target="_blank">Instagram</a>
    
        Always excited to collaborate and explore new innovations at the intersection of AI and blockchain.
      `;
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
      window.open('https://twitter.com/nikhil_shrey', '_blank');
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
      result = `
        <div style="display: flex; align-items: stretch; height: 400px;">
          <img src="${profileImg}" alt="Profile" style="width: 50%; height: 100%; object-fit: cover; margin-right: 20px;" />
          <div style="flex: 1; display: flex; align-items: center; justify-content: center; padding: 10px;">
            <pre style="white-space: pre-wrap; overflow: hidden; word-wrap: break-word; width: 100%; text-align: left;">
              ${summaryInfo}
            </pre>
          </div>
        </div>
      `;
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

    case 'google':
      result = 'Opening Google…';
      window.open('https://www.google.com', '_blank');
      break;

    case 'bing':
      result = 'Opening Bing…';
      window.open('https://www.bing.com', '_blank');
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

    case 'mkdir':
      result = `Creating directory '${args}'... Unfortunately we dont have disk-space!`;
      break;

    case 'vim':
      result = `Opening Vim... Actually, it looks like you’d be better off with 'vi'.`; 
      break;

    case 'vi':
      result = `Opening Vi... But have you tried 'nvim'? It's like Vi, but cooler.`;
      break;
    
    case 'nano':
      result = `Opening Nano... Have you considered 'nvim'? It's the next step up!`;
      break;
    
    case 'nvim':
      result = `Opening Neovim... Wait, did you mean 'vim'? It's just as powerful, promise!`;
      break;
    
    case 'readme':
      result = `Opening README.md... Just kidding, there's no documentation here!`;
      break;

    case 'ls':
      result = `Listing files in the current directory... Actually, there’s nothing here to list!`;
      break;

    case 'pwd':
      result = `Showing current directory... But since we're in a virtual terminal, it’s a mystery!`;
      break;

    case 'cat':
      const catImageUrl = await fetchCatImage();
      result = `
        <div style="text-align: start;">
          <img src="${catImageUrl}" alt="Random Cat" 
            style="max-width: 300px; height: auto;" />
        </div>`;
      break;

    case 'clear':
      setCommands([{ input: 'zephyr:~$', currentInput: '', output: '', isProcessed: false }]);
      return '';

    default:
      result = `'${cmd}' is not recognized as a command.`;
  }

  return result;
};