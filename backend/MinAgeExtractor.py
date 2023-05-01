import json
from helper_functions import get_text_from_keyword

class MinAgeExtractor():

    def __init__(self):
        pass

    def extract(self, json_obj: json, n_courses_on_page: int) -> list:

        min_ages = get_text_from_keyword(json_obj, "Mindestalter")        

        while len(min_ages) < n_courses_on_page:
            min_ages.insert(0, "")

        return min_ages