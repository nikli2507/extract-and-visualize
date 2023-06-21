from flask import Flask, jsonify
from CoursesDatabase import *
from Extractor import Extractor

app = Flask(__name__)
print("Extracting all courses from PDF...")
extractor = Extractor("courses.pdf")
courses = extractor.extract()

# connection to mongodb
print("Connecting to MongoDB...")
database = CoursesDatabase()
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
        'duration_as_days': course.duration_as_days
    })

print("Querying all courses...")
courses = database.query_all_courses() 

# convert object id to string
for course in courses:
    course["_id"] = str(course["_id"])

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
    
    response = jsonify({"Error": "Index out of bounds!"})
    response.status_code = 400
    return response

if __name__ == '__main__':
    app.run()
    