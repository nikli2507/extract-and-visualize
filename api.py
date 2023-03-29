from flask import Flask
from CoursesDatabase import *

app = Flask(__name__)
database = CoursesDatabase()
courses_query = list(database.query_all_dicts())
courses = [json_obj["title"] for json_obj in courses_query]

@app.route('/hello', methods=['GET'])
def hello():
    return 'Hello, World!'

@app.route('/courses', methods=['GET'])
def getCourses():
    return courses

if __name__ == '__main__':
    app.run()
    