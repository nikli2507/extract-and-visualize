import json
import sys
from helper_functions import find_key_value_pairs
from helper_functions import remove_whitespaces

class TitleExtractor():

    MAX_ORIGIN_Y_DIFFERENCE = 50

    def __init__(self):
        pass

    def extract(self, json_obj: json) -> list:

        # every title has size 17
        result = find_key_value_pairs(json_obj, 'size', 17.0)

        titles = []

        title_coords = []
        title_x = int(result[0]["origin"][0])

        # go through every size 17 element and build together the course titles
        if result != []:
            current_name = result[0]["text"]
            current_origin_y = result[0]["origin"][1]
            title_coords.append((title_x, int(current_origin_y)))
            for i in range(1, len(result)):
                # some titles are spread over several lines, check if the next element is still the same title 
                if abs(current_origin_y - result[i]["origin"][1]) < self.MAX_ORIGIN_Y_DIFFERENCE:   # still the same title
                    current_name = current_name + " " + result[i]["text"]
                    current_origin_y = result[i]["origin"][1]
                else:                                                     # new title
                    titles.append(current_name)                          # append previous title
                    current_name = result[i]["text"]
                    current_origin_y = result[i]["origin"][1]
                    title_coords.append((title_x, int(current_origin_y)))
 
            titles.append(current_name)              # append last title

        titles = remove_whitespaces(titles)

        return titles, title_coords
    
