import fitz as fitz
import json

def find_key_value_pairs(json_object, key, value):
    """
    Returns a list of all occurrences of the specified key-value pair
    within the provided JSON object.
    """
    results = []
    
    def search_json_object(obj, key, value):
        """
        Helper function to recursively search the provided JSON object
        for the specified key-value pair.
        """
        if isinstance(obj, dict):
            for k, v in obj.items():
                if k == key and v == value:
                    results.append(obj)
                elif isinstance(v, dict):
                    search_json_object(v, key, value)
                elif isinstance(v, list):
                    search_json_object(v, key, value)
        elif isinstance(obj, list):
            for item in obj:
                if isinstance(item, dict):
                    search_json_object(item, key, value)
    
    search_json_object(json_object, key, value)
    return results

def get_course_names(page_number):
    # open the PDF file
    pdf_file = "courses_new.pdf"
    doc = fitz.open(pdf_file)

    # iterate through the pages and extract the text
    #for page in doc:
    #    text = page.get_text()
    #    print(text)
    #    break

    with open("content.json", "w") as file:
        text_dict = doc[page_number].get_text("dict")
        text_json = json.dumps(text_dict, ensure_ascii=False)
        file.write(str(text_json))


    # Load JSON data from file
    with open('content.json') as f:
        data = json.load(f)

    result = find_key_value_pairs(data, 'size', 17.0)

    courses = []



    first = True
    current_name = ""
    current_origin_y = 0


    for dict in result:
        if first == True:
            current_name = dict["text"]
            current_origin_y = dict["origin"][1]
            first = False
        elif abs(current_origin_y - dict["origin"][1]) < 20:
            current_name = current_name + dict["text"]
            current_origin_y = dict["origin"][1]
        else:
            courses.append(current_name)
            current_name = dict["text"]
            current_origin_y = dict["origin"][1]

    courses.append(current_name)
        # close the PDF file
    doc.close() 
    return courses
    #result_json = json.dumps(result, ensure_ascii=False)
    #with open('result.json', "w") as f:
    #    f.write(str(result_json))


courses = []
for i in range(15, 23):
   courses.append(get_course_names(i))

flat_list = [item for sublist in courses for item in sublist]

print(flat_list)
