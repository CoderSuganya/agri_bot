const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");
const toggleMode = document.getElementById("toggle-mode");
const expandBtn = document.getElementById("expand");
const chatPanel = document.querySelector(".chat-panel");
const newChatBtn = document.getElementById("new-chat");
const historyDiv = document.getElementById("history");

const DIALOGFLOW_ENDPOINT = "YOUR_DIALOGFLOW_ENDPOINT";

// Dark/Light mode
toggleMode.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Expand chat
expandBtn.addEventListener("click", () => {
  chatPanel.classList.toggle("fullscreen");
});

// New chat
newChatBtn.addEventListener("click", () => {
  chatBox.innerHTML = "";
});

// Send message
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

function addMessage(user, bot) {
  const div = document.createElement("div");
  div.classList.add("chat-message");
  div.innerHTML = `<p><strong>You:</strong> ${user}</p><p><strong>Bot:</strong> ${bot}</p>`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;

  // Add to sidebar history
  const hist = document.createElement("div");
  hist.textContent = user;
  hist.classList.add("history-item");
  historyDiv.appendChild(hist);
}

// Send message to Dialogflow
async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;
  addMessage(message, "...");
  userInput.value = "";

  try {
    const res = await fetch(DIALOGFLOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    const botReply = data.reply || "No response from bot.";
    addMessage(message, botReply);
  } catch (err) {
    addMessage(message, "Error connecting to Dialogflow.");
  }
}
