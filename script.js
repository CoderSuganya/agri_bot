const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggle-sidebar');
const chatPanel = document.getElementById('chat-panel');
const expandBtn = document.getElementById('expand');
const toggleModeBtn = document.getElementById('toggle-mode');

const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');

// Sidebar toggle
toggleBtn.addEventListener('click', () => {
  chatPanel.classList.contains('fullscreen') && chatPanel.classList.remove('fullscreen');
  sidebar.classList.toggle('collapsed');
});

// Chat expand
expandBtn.addEventListener('click', () => {
  !sidebar.classList.contains('collapsed') && sidebar.classList.add('collapsed');
  chatPanel.classList.toggle('fullscreen');
});

// Dark mode toggle
toggleModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  toggleModeBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Send button & Enter key
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
  const msg = userInput.value.trim();
  if (!msg) return;

  // Optional: show user message in input box (if not using iframe)
  console.log("User message:", msg);

  userInput.value = '';

  // Directly send message to Dialogflow iframe
  const iframe = document.getElementById('dialogflow-frame');
  iframe.contentWindow.postMessage(msg, '*'); // Works if iframe supports postMessage
}
