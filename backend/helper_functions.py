import fitz

def remove_whitespaces(str_list: list) -> list:
    
    edited_str_list = []

    # remove leading/following whitespaces and double whitespaces 
    for str in str_list:
        edited_str_list.append(" ".join(str.split()).strip().lstrip("\\n"))

    return edited_str_list

def save_dict_as_file(dictionary: dict, page_n: int):
    with open(f'page{page_n}.json', 'w') as file:
        file.write(str(dictionary))

def save_page_as_file(page_n: int):
    doc = fitz.open("courses.pdf")
    dict = doc[page_n].get_text("dict")
    save_dict_as_file(dict, page_n)