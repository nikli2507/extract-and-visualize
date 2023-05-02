import json
import sys
from helper_functions import find_key_value_pairs
from helper_functions import remove_whitespaces

class TitleExtractor():

    MAX_ORIGIN_Y_DIFFERENCE = 50

    def __init__(self):
        pass

    def extract(self, json_obj: json) -> tuple:
        """
        Returns all titles of a given JSON object.

        Parameters:
        json_obj (json): The JSON object where the titles should be extracted.

        Returns:
        tuple: A tuple containing a list of strings of all extracted titles and a list of the upper left coordinates of every title. 
        """

        titles = []
        title_coords = []

        # every title has size 17
        result = find_key_value_pairs(json_obj, 'size', 17.0)

        # go through every size 17 element and build together the course titles
        if result != []:
            current_name = result[0]["text"]
            title_x = result[0]["origin"][0]        # the property origin contains the coordinates of the PDF element
            current_y = result[0]["origin"][1]
            title_coords.append((title_x, current_y))
            for i in range(1, len(result)):
                # some titles are spread over several lines, check if the next element is still the same title 
                if abs(current_y - result[i]["origin"][1]) < self.MAX_ORIGIN_Y_DIFFERENCE:   # still the same title
                    current_name = current_name + " " + result[i]["text"]
                    current_y = result[i]["origin"][1]
                else:                                                     # new title
                    titles.append(current_name)                          # append previous title
                    current_name = result[i]["text"]
                    current_y = result[i]["origin"][1]
                    title_coords.append((title_x, current_y))
 
            titles.append(current_name)              # append last title

        titles = remove_whitespaces(titles)

        return titles, title_coords
    
