import fitz
from Course import Course
from TitleExtractor import TitleExtractor
from CategoryExtractor import CategoryExtractor
from typing import Final
from helper_functions import save_dict_as_file

class Extractor():
    
    def __init__(self, file_path: str):
        self.doc = fitz.open(file_path)

    def extract(self) -> list:
        
        courses: Course = []
        title_extractor = TitleExtractor()
        category_extractor = CategoryExtractor()

        # extract titles from pdf
        for i in range(0, self.doc.page_count-1):           
            
            page = self.doc[i].get_text("dict")
            try:
                titles = title_extractor.extract(page) 
                categories = category_extractor.extract(page)   
                
                if titles == [] or categories == []:
                    raise ValueError()
                       
                for j in range(len(titles)):
                    courses.append(Course(titles[j], "", "", [], [], [], "", -1, [], "", "", categories[j], -1))
            except:
                print(f"Could not extract any course on page {i}!")

        return courses
    
    def __del__(self):
        self.doc.close() 