from flask import *
from pathlib import Path
import word2vector_model


base_dir = Path(__file__).parents[1]
static_dir = base_dir / "frontend" / "static"



app = Flask(__name__,
            static_folder=static_dir,
            template_folder=static_dir)

@app.route("/", methods=["GET"])
def index():
    return render_template("html/index.html")

@app.route("/", methods=["POST"])
def start():
    
    base_text = request.form.get("base_name")
    if word2vector_model.word_is_valid(base_text):
        return redirect(f"/associate?base_name={base_text}")
    else:
        return render_template("html/index.html", error="そのような言葉では連想できません!!")

@app.route("/associate", methods=["GET"])
def associate():
    return render_template("html/associate.html")

@app.route("/associate", methods=["POST"])
def get_associate_array():
    json_array = request.json

    word_list = json_array.get("words")

    whole_words = json_array.get("whole_words")

    top_five = word2vector_model.word_list_up(word_list, whole_words)

    return jsonify({"words":top_five})


if __name__ == "__main__":
    app.run(debug=True)