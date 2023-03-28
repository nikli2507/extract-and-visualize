import json

def find_key_value_pairs(json: json, key: any, value: any) -> list:
    """
    Returns a list of all occurrences of the specified key-value pair
    within the provided JSON.
    """
    result = []
    
    def search_json_object(sub_json: json, key: any, value: any):
        """
        Helper function to recursively search the provided JSON object
        for the specified key-value pair.
        """
        if isinstance(sub_json, dict):
            for k, v in sub_json.items():
                if k == key and v == value:
                    result.append(sub_json)
                elif isinstance(v, dict):
                    search_json_object(v, key, value)
                elif isinstance(v, list):
                    search_json_object(v, key, value)
        elif isinstance(sub_json, list):
            for item in sub_json:
                if isinstance(item, dict):
                    search_json_object(item, key, value)
    
    search_json_object(json, key, value)
    return result

def print_size_17_content(json_list: list):
    with open("content.json", "w") as content:
        for json_obj in json_list:
            content.write(str(find_key_value_pairs(json_obj, 'size', 17.0)))