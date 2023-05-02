import json
import fitz

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

    result = sorted(result, key=lambda x: x["bbox"][1])

    return result

def remove_whitespaces(str_list: list) -> list:
    
    edited_str_list = []

    # remove leading/following whitespaces and double whitespaces 
    for str in str_list:
        edited_str_list.append(" ".join(str.split()).strip().lstrip("\\n"))

    return edited_str_list

def print_size_17_content(json_list: list):
    with open("content.json", "w") as content:
        for json_obj in json_list:
            content.write(str(find_key_value_pairs(json_obj, 'size', 17.0)))

def save_dict_as_file(dictionary: dict, page_n: int):
    with open(f'page{page_n}.json', 'w') as file:
        file.write(str(dictionary))

def save_page_as_file(page_n: int):
    doc = fitz.open("courses.pdf")
    dict = doc[page_n].get_text("dict")
    save_dict_as_file(dict, page_n)