const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");
const toggleMode = document.getElementById("toggle-mode");
const expandBtn = document.getElementById("expand");
const chatPanel = document.querySelector(".chat-panel");
const newChatBtn = document.getElementById("new-chat");
const historyDiv = document.getElementById("history");

// Placeholder for your Dialogflow endpoint
const DIALOGFLOW_ENDPOINT = "YOUR_DIALOGFLOW_ENDPOINT_HERE";

// Dark/Light Mode Toggle
toggleMode.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Expand Chat
expandBtn.addEventListener("click", () => {
  chatPanel.classList.toggle("fullscreen");
});

// New Chat
newChatBtn.addEventListener("click", () => {
  chatBox.innerHTML = "";
});

// Send message
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", (e) => {
  if(e.key === "Enter") sendMessage();
});

function addMessage(user, bot) {
  const div = document.createElement("div");
  div.classList.add("chat-message");
  div.innerHTML = `<p><strong>You:</strong> ${user}</p><p><strong>Bot:</strong> ${bot}</p>`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;

  // Add to history
  const hist = document.createElement("div");
  hist.textContent = user;
  hist.classList.add("history-item");
  historyDiv.appendChild(hist);
}

async function sendMessage() {
  const message = userInput.value.trim();
  if(!message) return;
  addMessage(message, "...");
  userInput.value = "";

  try {
    const res = await fetch(DIALOGFLOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });
    const data = await res.json();
    const botReply = data.reply || "No response from bot.";
    addMessage(message, botReply);
  } catch(err) {
    addMessage(message, "Error connecting to Dialogflow.");
  }
}
