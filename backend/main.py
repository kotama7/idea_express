from flask import *
from pathlib import Path
import os


base_dir = os.path.dirname(__file__)




app = Flask(__name__)

@app.route("/", methods="GET")
def index():
    return render_template("index.html")

@app.route("/", methods="POST")
def start():
    base_text = request.form.get("base_text")
    return redirect("/associate")

@app.route("/associate", methods="GET")
def associate():
    return render_template("associate.html")

if __name__ == "__main__":
    app.run(debug=True)