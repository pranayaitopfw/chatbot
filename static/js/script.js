const sendBtn = document.getElementById("send-btn");
const messageInput = document.getElementById("message");
const chatBox = document.getElementById("chat-box");

async function sendMessage() {

    const message = messageInput.value.trim();

    if (!message) return;

    // User Message
    const userDiv = document.createElement("div");
    userDiv.className = "user-message";
    userDiv.textContent = "👤 " + message;

    chatBox.appendChild(userDiv);

    chatBox.scrollTop = chatBox.scrollHeight;

    messageInput.value = "";

    // Typing Message
    const typingDiv = document.createElement("div");
    typingDiv.className = "ai-message";
    typingDiv.innerHTML = "🤖 <i>Typing...</i>";

    chatBox.appendChild(typingDiv);

    chatBox.scrollTop = chatBox.scrollHeight;

    try {

        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        // Remove Typing...
        typingDiv.remove();

        // AI Message
        const aiDiv = document.createElement("div");
        aiDiv.className = "ai-message";

        aiDiv.innerHTML = `
            <div class="bot-icon">🤖</div>
            <div class="bot-text">
                ${marked.parse(data.reply)}
            </div>
        `;

        chatBox.appendChild(aiDiv);

        // Highlight all code blocks
        document.querySelectorAll("pre code").forEach((el) => {
            hljs.highlightElement(el);
        });

        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {

        typingDiv.remove();

        const errorDiv = document.createElement("div");
        errorDiv.className = "ai-message";
        errorDiv.innerHTML = "❌ Server Error";

        chatBox.appendChild(errorDiv);

    }

}

sendBtn.addEventListener("click", sendMessage);

messageInput.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {
        sendMessage();
    }

});
