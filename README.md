# Electrician Assistant

A Flask + Google Gemini chatbot restricted to electrical/electrician topics.

## Structure
```text
electrician_assistant/
├── app.py
├── config.py
├── requirements.txt
├── .env
├── .gitignore
├── README.md
├── templates/
│   └── index.html
└── static/
    ├── style.css
    └── script.js
```

## Windows PowerShell Setup
```powershell
cd electrician_assistant
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Add your Gemini API key to `.env`, then:
```powershell
python app.py
```

Open: http://127.0.0.1:5000

## Example questions
- What is an MCB?
- Explain AC and DC.
- What is earthing?
- How does a transformer work?
- How do I calculate electrical power?
- What is the difference between series and parallel circuits?

General software questions such as "Write a Python calculator" are refused.

## Safety
This is educational assistance. Never work on live mains circuits. Isolate power, verify
de-energization, follow local codes, and use a qualified electrician when required.
