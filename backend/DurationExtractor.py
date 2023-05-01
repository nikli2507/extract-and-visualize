import json
from helper_functions import get_text_from_keyword

class DurationExtractor():

    def __init__(self):
        pass

    def extract(self, json_obj: json, n_courses_on_page: int) -> list:

        durations = get_text_from_keyword(json_obj, "Dauer")        

        while len(durations) < n_courses_on_page:
            durations.insert(0, "")

        return durations