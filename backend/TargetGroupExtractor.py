import json

class TargetGroupExtractor():

    def __init__(self):
        pass

    def extract(self, json_obj: json) -> list:
        
        # every category has size 12
        result = find_key_value_pairs(json_obj, 'size', 12.0)

        categories = []

        # go through every size 12 element and build together the category names
        if result != []:
            # categories are spread over two lines
            for i in range(0, len(result), 2):
                current_name = f"{result[i]['text']} {result[i+1]['text']}"
                categories.append(current_name)              

        return categories