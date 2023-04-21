from pymongo import MongoClient

class  CoursesDatabase():

    def __init__(self):
        self.__client = MongoClient("mongodb+srv://admin:nrFwOGC8T62BeKfC@cluster0.qmlllmt.mongodb.net/?retryWrites=true&w=majority")
        self.__database = self.__client['courses_db']
        self.__courses_collection = self.__database["courses"]

    def write(self, content: dict):
        self.__courses_collection.insert_one(content)

    def query_all_courses(self) -> list:
        return self.__courses_collection.find()
    
    def clean(self):
        self.__courses_collection.delete_many({})