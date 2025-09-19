const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

// Replace this with your Dialogflow fulfillment webhook URL
const DIALOGFLOW_ENDPOINT = "YOUR_DIALOGFLOW_ENDPOINT";

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
}

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
