from flask import Blueprint, request, jsonify
from services.gemini_service import ask_ai

chat = Blueprint("chat", __name__)

@chat.route("/chat", methods=["POST"])
def chatbot():

    data = request.get_json()

    user_message = data.get("message", "")

    ai_reply = ask_ai(user_message)

    return jsonify({
        "reply": ai_reply
    })