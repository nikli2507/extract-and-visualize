import json
from helper_functions import find_key_value_pairs
from helper_functions import remove_whitespaces

class DescriptionExtractor():

    MAX_ORIGIN_Y_DIFFERENCE = 80

    def __init__(self):
        pass

    def extract(self, json_obj: json, n_courses_on_page: int, title_coords: list) -> str:
        
        descriptions = []

        for title_x, title_y in title_coords:
            description = ""
            for block in json_obj['blocks']:
                block_x = int(block['bbox'][0])
                block_y = int(block['bbox'][1])
                if block_y == 503:
                    pass
                if abs(block_x-title_x) < 5 and abs(block_y - title_y) < self.MAX_ORIGIN_Y_DIFFERENCE and abs(block_y - title_y) >= 30:
                    for line in block['lines']:
                        for span in line['spans']:
                            description = description + span['text']
            descriptions.append(description)

        descriptions = remove_whitespaces(descriptions)

        while len(descriptions) != n_courses_on_page:
            descriptions.insert(0, "")

        return descriptions
    
