from firebase_functions import https_fn
from firebase_admin import initialize_app
import smtplib
from email.message import EmailMessage
import json
import os

from dotenv import load_dotenv

load_dotenv() # This forces Python to read your secret passwords

initialize_app()

@https_fn.on_request()
def send_email(req: https_fn.Request) -> https_fn.Response:
  # Handle CORS (Required for local React to talk to local Firebase)
  if req.method == "OPTIONS":
    headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "3600"
    }
    return https_fn.Response("", status=204, headers=headers)

  headers = {"Access-Control-Allow-Origin": "*"}

  try:
    # Extract data from React
    data = req.get_json(silent=True, force=True)

    # Defensive check if data is still None
    if not data:
      return https_fn.Response(json.dumps({"error": "No JSON data received"}), status=400, headers=headers)

    user_name = data.get("user_name")
    user_email = data.get("user_email")
    message = data.get("message")

    # Fetch your secure credentials from the .env file
    login_email = os.environ.get("GMAIL_LOGIN")
    sender_alias = os.environ.get("GMAIL_ALIAS")
    app_password = os.environ.get("GMAIL_APP_PASSWORD")

    # Format the email
    msg = EmailMessage()
    msg.set_content(f"New message from: {user_name}\nEmail: {user_email}\n\nMessage:\n{message}")
    msg["Subject"] = f"Portfolio Contact: {user_name}"
    msg["From"] = sender_alias
    msg["To"] = sender_alias

    # Connect to Gmail and send it
    server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
    server.login(login_email, app_password)
    server.send_message(msg)
    server.quit()

    return https_fn.Response(json.dumps({"success": True}), status=200, headers=headers)

  except Exception as e:
    print(f"Error sending email: {e}")
    return https_fn.Response(json.dumps({"error": str(e)}), status=500, headers=headers)
