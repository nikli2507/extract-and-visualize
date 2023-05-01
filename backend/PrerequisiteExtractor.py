import json
from helper_functions import get_text_from_keyword

class PrerequisiteExtractor():

    def __init__(self):
        pass

    def extract(self, json_obj: json, n_courses_on_page: int) -> list:

        prerequisites = get_text_from_keyword(json_obj, "Voraussetzung")        

        while len(prerequisites) < n_courses_on_page:
            prerequisites.insert(0, "")

        return prerequisites