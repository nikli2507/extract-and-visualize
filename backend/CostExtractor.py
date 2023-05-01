import json
from helper_functions import get_text_from_keyword

class CostExtractor():

    def __init__(self):
        pass

    def extract(self, json_obj: json, n_courses_on_page: int) -> list:

        costs = get_text_from_keyword(json_obj, "Seminarbeitrag")        

        # TODO: more than one cost on page 84
        while len(costs) < n_courses_on_page:
            costs.insert(0, "")

        return costs