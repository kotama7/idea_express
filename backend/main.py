from flask import *
from pathlib import Path


base_dir = Path(__file__).parents[1]
static_dir = base_dir / "frontend" / "static"



app = Flask(__name__, template_folder=static_dir)

@app.route("/", methods=["GET"])
def index():
    return render_template("html/index.html")

@app.route("/", methods=["POST"])
def start():
    base_text = request.form.get("base_text")
    return redirect("/associate")

@app.route("/associate", methods=["GET"])
def associate():
    return render_template("html/associate.html")

if __name__ == "__main__":
    app.run(debug=True)