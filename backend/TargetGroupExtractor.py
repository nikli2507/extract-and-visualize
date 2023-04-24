import json
from helper_functions import get_text_from_keyword

class TargetGroupExtractor():

    def __init__(self):
        pass

    def extract(self, json_obj: json, n_courses_on_page: int) -> list:

        target_groups =  get_text_from_keyword(json_obj, "Zielgruppe")        

        if len(target_groups) != n_courses_on_page:
            target_groups.insert(0, "")

        return target_groups