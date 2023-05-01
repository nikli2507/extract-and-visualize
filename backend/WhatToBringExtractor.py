import json
from helper_functions import get_text_from_keyword

class WhatToBringExtractor():

    def __init__(self):
        pass

    def extract(self, json_obj: json, n_courses_on_page: int) -> list:

        what_to_bring = get_text_from_keyword(json_obj, "Mitzubringen")        

        while len(what_to_bring) < n_courses_on_page:
            what_to_bring.insert(0, "")

        return what_to_bring