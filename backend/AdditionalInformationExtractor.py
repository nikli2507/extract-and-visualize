import json
from helper_functions import get_text_from_keyword

class AdditionalInformationExtractor():

    def __init__(self):
        pass

    def extract(self, json_obj: json, n_courses_on_page: int) -> list:

        additional_info = get_text_from_keyword(json_obj, "Zusatzinformation")        

        # TODO: more than one additional info on page 18
        while len(additional_info) < n_courses_on_page:
            additional_info.insert(0, "")

        return additional_info