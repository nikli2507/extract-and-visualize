import json
from helper_functions import find_key_value_pairs

class TitleExtractor():

    MAX_ORIGIN_Y_DIFFERENCE = 50

    def __init__(self):
        pass

    def extract(self, json_obj: json) -> list:
        
        # every title has size 17
        result = find_key_value_pairs(json_obj, 'size', 17.0)

        courses = []

        # go through every size 17 element and build together the course titles
        if result != []:
            current_name = result[0]["text"]
            current_origin_y = result[0]["origin"][1]
            for i in range(1, len(result)):
                # some titles are spread over several lines, check if the next element is still the same title 
                if abs(current_origin_y - result[i]["origin"][1]) < self.MAX_ORIGIN_Y_DIFFERENCE:   # still the same title
                    current_name = current_name + " " + result[i]["text"]
                    current_origin_y = result[i]["origin"][1]
                else:                                                     # new title
                    courses.append(current_name)                          # append previous title
                    current_name = result[i]["text"]
                    current_origin_y = result[i]["origin"][1]
 
            courses.append(current_name)              # append last title

        return courses
    
