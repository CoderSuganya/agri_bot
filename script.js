const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggle-sidebar');
const chatPanel = document.getElementById('chat-panel');
const expandBtn = document.getElementById('expand');
const toggleModeBtn = document.getElementById('toggle-mode');

toggleBtn.addEventListener('click', () => {
  const expanded = chatPanel.classList.contains('fullscreen');
  if(expanded) chatPanel.classList.remove('fullscreen'); // shrink chat if sidebar expanded
  sidebar.classList.toggle('collapsed');
});

expandBtn.addEventListener('click', () => {
  const collapsed = sidebar.classList.contains('collapsed');
  if(!collapsed) sidebar.classList.add('collapsed'); // shrink sidebar if chat expanded
  chatPanel.classList.toggle('fullscreen');
});

toggleModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  toggleModeBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Dummy chat
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
