from flask import Flask, render_template, request, jsonify, send_from_directory
import os
from datetime import datetime

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

app = Flask(
    __name__,
    template_folder=os.path.join(BASE_DIR, "templates"),
    static_folder=os.path.join(BASE_DIR, "public"),
    static_url_path="/public"
)

STATS = {
    "years_serving": datetime.now().year - 2000,
    "meals_served": "2,00,000+",
    "patients_daily": "80-200",
    "started": "28 April 2000"
}

# Image URLs — using /public/images/ path served by Vercel static
IMAGES = {
    "kaumudi": "/public/images/kaumudi.jpg",
    "vanitha1": "/public/images/vanitha1.jpg",
    "vanitha2": "/public/images/vanitha2.jpg",
    "vanitha3": "/public/images/vanitha3.jpg",
    "vanitha4": "/public/images/vanitha4.jpg",
}

@app.route("/")
def index():
    return render_template("index.html", stats=STATS)

@app.route("/about")
def about():
    return render_template("about.html", stats=STATS)

@app.route("/donate")
def donate():
    return render_template("donate.html")

@app.route("/press")
def press():
    return render_template("press.html", images=IMAGES)

@app.route("/contact")
def contact():
    return render_template("contact.html")

@app.route("/api/contact", methods=["POST"])
def handle_contact():
    data = request.get_json()
    name    = data.get("name", "")
    email   = data.get("email", "")
    message = data.get("message", "")
    print(f"Contact: {name} <{email}> — {message}")
    return jsonify({"success": True, "message": "Thank you! We'll get back to you soon."})
