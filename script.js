// Sidebar toggle
const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggle-sidebar');

toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
});

// Chat panel expand
const chatPanel = document.getElementById('chat-panel');
const expandBtn = document.getElementById('expand');

expandBtn.addEventListener('click', () => {
  chatPanel.classList.toggle('fullscreen');
});

// Dark/light mode toggle
const toggleModeBtn = document.getElementById('toggle-mode');
toggleModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  if(document.body.classList.contains('dark-mode')){
    toggleModeBtn.textContent = '☀️';
  } else {
    toggleModeBtn.textContent = '🌙';
  }
});

// Dummy chat input (for UI demo)
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

sendBtn.addEventListener('click', () => {
  const msg = userInput.value.trim();
  if(msg){
    const p = document.createElement('p');
    p.textContent = "You: " + msg;
    chatBox.appendChild(p);
    userInput.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;
  }
});
