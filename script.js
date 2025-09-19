// Sidebar toggle
const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggle-sidebar");
toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("expanded");
});

// Dark/Light mode
const toggleMode = document.getElementById("toggle-mode");
toggleMode.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Chat panel expand
const chatPanel = document.getElementById("chat-panel");
const expandBtn = document.getElementById("expand");
expandBtn.addEventListener("click", () => {
  chatPanel.classList.toggle("fullscreen");
});

// Chat functionality
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");
const historyDiv = document.getElementById("history");

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", (e) => {
  if(e.key === "Enter") sendMessage();
});

function addMessage(user, bot) {
  const msgDiv = document.createElement("div");
  msgDiv.innerHTML = `<p><strong>You:</strong> ${user}</p><p><strong>Bot:</strong> ${bot}</p>`;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  // Add to sidebar history
  const histItem = document.createElement("div");
  histItem.textContent = user;
  histItem.classList.add("history-item");
  historyDiv.appendChild(histItem);
}

function sendMessage() {
  const message = userInput.value.trim();
  if(!message) return;
  addMessage(message, "...");
  userInput.value = "";

  // Placeholder bot response
  setTimeout(() => {
    addMessage(message, "This is a placeholder response.");
  }, 500);
}

