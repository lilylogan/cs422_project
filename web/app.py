from flask import Flask, render_template, abort
import os

app = Flask(__name__)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def hello(path):
# return a simple template
    # Checking that file path is not forbidden
    if (".." in path) or ("//" in path) or ("~" in path):
        abort(403) # Forbidden error
    # Ony proceeding if file has correct extension
    ext = os.path.splitext(path)[1] # getting the file e
    if (ext == ".html") or (ext == ".css"):
        # Checking that the file exists
        if os.path.exists("templates/" + path):
            return render_template(path), 200
        else:
            abort(404) # Not found error
    else:
        abort(404) # Not found error
    

@app.errorhandler(404)
def error_404(e):
    #return a template with error code
    return render_template('404.html'), 404

@app.errorhandler(403)
def error_403(e):
    #return a template with error code
    return render_template('403.html'), 403

if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0')
