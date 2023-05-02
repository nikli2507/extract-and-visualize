import json
from helper_functions import find_key_value_pairs

class CategoryExtractor():

    def __init__(self):
        pass

    def extract(self, json_obj: json, n_courses_on_page: int) -> tuple:
        
        # every category has size 12
        result = find_key_value_pairs(json_obj, 'size', 12.0)

        categories = []
        category_ys = []

        # go through every size 12 element and build together the category names
        if result != []:
            # categories are spread over two lines
            for i in range(0, len(result), 2):
                if i > n_courses_on_page:
                    break
                current_name = f"{result[i]['text']} {result[i+1]['text']}"
                category_ys.append(result[i]['bbox'][1])
                categories.append(current_name)              

        return categories, category_ys
    
