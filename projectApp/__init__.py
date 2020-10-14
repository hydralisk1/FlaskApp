from flask import Flask, render_template
from read_data import get_planet_data

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False

@app.route("/")
def hello():
    data = get_planet_data()
    return render_template("index.html", data=data)

if __name__ == "__main__":
    app.run()