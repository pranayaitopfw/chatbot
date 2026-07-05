const sendBtn = document.getElementById("send-btn");
const messageInput = document.getElementById("message");
const chatBox = document.getElementById("chat-box");

async function sendMessage() {

    const message = messageInput.value.trim();

    if (!message) return;

    chatBox.innerHTML += `
        <div class="user-message">
            👤 ${message}
        </div>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;

    messageInput.value = "";

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

        chatBox.innerHTML += `
            <div class="ai-message">
                🤖 ${data.reply}
            </div>
        `;

        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {

        chatBox.innerHTML += `
            <div class="ai-message">
                ❌ Server Error
            </div>
        `;

    }

}

sendBtn.addEventListener("click", sendMessage);

messageInput.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {
        sendMessage();
    }

});