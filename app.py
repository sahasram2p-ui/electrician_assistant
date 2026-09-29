from flask import Flask, render_template, request, jsonify
from google import genai
from config import GEMINI_API_KEY, GEMINI_MODEL, SYSTEM_PROMPT

app = Flask(__name__)
client = genai.Client(api_key=GEMINI_API_KEY)
conversation_history = []

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        message = (data.get("message") or "").strip()
        if not message:
            return jsonify({"success": False, "error": "Please enter a message."}), 400

        conversation_history.append({"role": "user", "parts": [{"text": message}]})
        contents = [{"role": "user", "parts": [{"text": SYSTEM_PROMPT}]}] + conversation_history

        response = client.models.generate_content(model=GEMINI_MODEL, contents=contents)
        reply = response.text or "Sorry, I could not generate a response."

        conversation_history.append({"role": "model", "parts": [{"text": reply}]})
        if len(conversation_history) > 20:
            del conversation_history[:-20]

        return jsonify({"success": True, "reply": reply})
    except Exception as e:
        print("Error:", e)
        return jsonify({"success": False, "error": "Something went wrong. Please check your API key and try again."}), 500

if __name__ == "__main__":
    app.run(debug=True)
