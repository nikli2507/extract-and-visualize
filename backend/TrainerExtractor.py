import json
from helper_functions import get_text_from_keyword

class TrainerExtractor():

    def __init__(self):
        pass

    def extract(self, json_obj: json, n_courses_on_page: int) -> list:

        trainers = get_text_from_keyword(json_obj, "Trainer")        

        while len(trainers) < n_courses_on_page:
            trainers.insert(0, "")

        return trainers