import json
from helper_functions import get_text_from_keyword

class DatesLocationExtractor():

    def __init__(self):
        pass

    def extract(self, json_obj: json, n_courses_on_page: int) -> list:

        dates_locations = get_text_from_keyword(json_obj, "Termine")        

        # TODO: more dates and locations than courses
        while len(dates_locations) < n_courses_on_page:
            dates_locations.insert(0, "")

        return dates_locations