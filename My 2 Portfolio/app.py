from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from model import analyze_project

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()

    if not data or 'text' not in data:
        return jsonify({"error": "No text provided"}), 400

    text = data['text']
    result = analyze_project(text)

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)