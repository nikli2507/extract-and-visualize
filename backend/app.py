from flask import Flask, jsonify, request
from flask_cors import CORS
from CoursesDatabase import *
from Extractor import Extractor
import fitz
import os

app = Flask(__name__)
CORS(app)

print("Connecting to MongoDB...")
database = CoursesDatabase()

def extractCoursesAndPushToDB(doc):
    print("Extracting all courses from PDF...")

    extractor = Extractor(doc)
    courses = extractor.extract()

    if len(courses) == 0:
        return []

    print("Cleaning database...")
    database.clean()

    print("Writing to database...")
    for course in courses:
        database.write({
            'title': course.title,
            'description': course.description,
            'target_group': course.target_group,
            'content': course.content,
            'prerequisites': course.prerequisites,
            'dates_location': course.dates_location,
            'time': course.time,
            'cost': course.cost,
            'trainer': course.trainer,
            'additional_info': course.additional_info,
            'what_to_bring': course.what_to_bring,
            'category': course.category,
            'min_age': course.min_age,
            'duration': course.duration,
            'dates_locations_list': course.dates_locations_list,
            'page': course.page
        })

    print("Querying all courses...")
    courses = database.query_all_courses() 

    # convert object id to string
    for course in courses:
        course["_id"] = str(course["_id"])

    return courses

doc = fitz.open("courses.pdf")
courses = extractCoursesAndPushToDB(doc)

@app.route('/testconn', methods=['GET'])
def test_conn():
    return 'Sucessfully connected to API!'

@app.route('/courses', methods=['GET'])
def get_courses():
    return jsonify(courses)

@app.route('/course/<int:index>', methods=['GET'])
def get_course(index: int):
    if index >= 0 and index < len(courses):
        return jsonify(courses[index])
    
    response = jsonify({"error": "Index out of bounds!"})
    response.status_code = 400
    return response

@app.route('/upload', methods=['POST'])
def upload():
    # Check if a file was included in the request
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']

    # Check if the file is a PDF
    if file.filename.endswith('.pdf'):
        doc = fitz.open(stream=file.read(), filetype="pdf")
        courses = extractCoursesAndPushToDB(doc)

        if(len(courses) > 0):
            return jsonify(courses), 200
        else:
            return jsonify({"error": "No courses couldn't be extracted from the file!"}), 400
    else:
        return jsonify({"error": "Invalid file format. Only PDF files are allowed."}), 400

if __name__ == "__main__":
    app.run(port=int(os.environ.get("PORT", 8080)),host='0.0.0.0',debug=True)
    