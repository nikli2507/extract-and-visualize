import json
from helper_functions import get_text_from_keyword
from helper_functions import sort_and_fill

class GenericExtractor():

    def __init__(self):
        pass

    def extract(self, json_obj: json, n_courses_on_page: int, keyword: str) -> list:

        result, y_list = get_text_from_keyword(json_obj, keyword)        
        result = sort_and_fill(result, n_courses_on_page, y_list)

        return result