import json
from helper_functions import get_text_from_keyword

class TimeExtractor():

    def __init__(self):
        pass

    def extract(self, json_obj: json, n_courses_on_page: int) -> list:

        time = get_text_from_keyword(json_obj, "Uhrzeit")        

        while len(time) < n_courses_on_page:
            time.insert(0, "")

        return time