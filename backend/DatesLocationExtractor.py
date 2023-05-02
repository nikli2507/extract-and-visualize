import json
import sys
from helper_functions import get_text_from_keyword

class DatesLocationExtractor():

    def __init__(self):
        pass

    def extract(self, json_obj: json, n_courses_on_page: int, category_ys: list) -> list:

        category1_y = category_ys[0]
        category2_y = category_ys[1] if n_courses_on_page == 2 else sys.float_info.max

        cat1_blocks = [block for block in json_obj["blocks"] if block["bbox"][1] > category1_y and block["bbox"][1] < category2_y]
        cat2_blocks = [block for block in json_obj["blocks"] if block["bbox"][1] > category2_y]

        dates_locations = []

        for blocks in [cat2_blocks, cat1_blocks]:
            dates_x = 0
            dates_y = 0

            for block in blocks:
                if "termine" in block["lines"][0]["spans"][0]["text"].lower():
                    dates_x = block["bbox"][0]
                    dates_y = block["bbox"][1]
                    break
            
            subresult = []
            for block in blocks:
                keywords = ["dauer", "uhrzeit", "seminarbeitrag", "trainer", "mitzubringen", ]
                text = block["lines"][0]["spans"][0]["text"].lower()
                if (abs(block["bbox"][0] - dates_x) < 5) and (block["bbox"][1] >= dates_y) and not any(keyword in text for keyword in keywords):
                    for line in block["lines"]:
                        for span in line["spans"]:
                            subresult.append(span["text"])
            subresult = "\\n".join(subresult)
            
            if len(dates_locations) < n_courses_on_page:
                dates_locations.append(subresult)

        while len(dates_locations) < n_courses_on_page:
            dates_locations.insert(0, "")

        return dates_locations