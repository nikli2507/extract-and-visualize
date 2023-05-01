import json
from helper_functions import get_text_from_keyword

class ContentExtractor():

    def __init__(self):
        pass

    def extract(self, json_obj: json, n_courses_on_page: int) -> list:

        contents = get_text_from_keyword(json_obj, "Inhalte")        

        # TODO: more than one content on page 48
        while len(contents) < n_courses_on_page:
            contents.insert(0, "")

        return contents