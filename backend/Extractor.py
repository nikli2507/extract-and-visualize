import fitz
from Course import Course
from TitleExtractor import TitleExtractor
from CategoryExtractor import CategoryExtractor
from DatesLocationExtractor import DatesLocationExtractor
from GenericExtractor import GenericExtractor
from DescriptionExtractor import DescriptionExtractor
from helper_functions import save_dict_as_file

class Extractor():
    
    def __init__(self, file_path: str):
        self.doc = fitz.open(file_path)

    def extract(self) -> list:
        
        courses: Course = []
        title_extractor = TitleExtractor()
        category_extractor = CategoryExtractor()
        dates_location_extractor = DatesLocationExtractor()
        description_extractor = DescriptionExtractor()
        generic_extractor = GenericExtractor()

        # extract data from every single page
        for i in [10]:#range(0, self.doc.page_count-1):           
            page = self.doc[i].get_text("dict")
            try:
                titles, title_coords = title_extractor.extract(page) 
                n_courses_on_page = len(titles)
                categories, category_ys = category_extractor.extract(page, n_courses_on_page)  
                dates_locations = dates_location_extractor.extract(page, n_courses_on_page, category_ys)
                descriptions = description_extractor.extract(page, title_coords)
                
                target_groups = generic_extractor.extract(page, n_courses_on_page, "Zielgruppe")
                contents = generic_extractor.extract(page, n_courses_on_page, "Inhalt")
                prerequisites = generic_extractor.extract(page, n_courses_on_page, "Voraussetzung")
                trainers = generic_extractor.extract(page, n_courses_on_page, "Trainer")
                durations = generic_extractor.extract(page, n_courses_on_page, "Dauer")
                costs = generic_extractor.extract(page, n_courses_on_page, "Seminarbeitrag")
                what_to_bring = generic_extractor.extract(page, n_courses_on_page, "Mitzubringen")
                min_ages = generic_extractor.extract(page, n_courses_on_page, "Mindestalter")
                times = generic_extractor.extract(page, n_courses_on_page, "Uhrzeit")
                additional_infos = generic_extractor.extract(page, n_courses_on_page, "Zusatzinformation")

                print(f"Titles: {titles}")
                print(f"Descriptions: {descriptions}")
                print(f"Target Groups: {target_groups}")
                print(f"Contents: {contents}")
                print(f"Prerequisites: {prerequisites}")
                print(f"Dates and Locations: {dates_locations}")
                print(f"Times: {times}")
                print(f"Costs: {costs}")
                print(f"Trainers: {trainers}")
                print(f"Additional Infos: {additional_infos}")
                print(f"What to Bring: {what_to_bring}")
                print(f"Categories: {categories}")
                print(f"Minimum Ages: {min_ages}")
                print(f"Durations: {durations}")

                if titles == [] or categories == []:
                    raise ValueError()
                       
                for j in range(len(titles)):
                    courses.append(Course(titles[j], descriptions[j], target_groups[j], contents[j], prerequisites[j], dates_locations[j], times[j], costs[j], trainers[j], additional_infos[j], what_to_bring[j], categories[j], min_ages[j], durations[j]))

                if i in [0, 1, 2, 3, 4, 5, 6, 7, 8, 28, 29, 30, 43, 44, 45, 46, 56, 57, 63, 64, 65, 72, 73, 74, 85, 86, 87, 94, 95, 98, 99, 108, 109, 113, 114, 115, 117, 120, 121, 124, 125, 128, 129, 130, 131]:
                    print(f"Extracted course on page {i}, but should not!")

            except:
                if not (i in [0, 1, 2, 3, 4, 5, 6, 7, 8, 28, 29, 30, 43, 44, 45, 46, 56, 57, 63, 64, 65, 72, 73, 74, 85, 86, 87, 94, 95, 98, 99, 108, 109, 113, 114, 115, 117, 120, 121, 124, 125, 128, 129, 130, 131]):
                    print(f"Could not extract any course on page {i}!")
                    print(f"Titles: {titles}")
                    print(f"Descriptions: {descriptions}")
                    print(f"Target Groups: {target_groups}")
                    print(f"Contents: {contents}")
                    print(f"Prerequisites: {prerequisites}")
                    print(f"Dates and Locations: {dates_locations}")
                    print(f"Times: {times}")
                    print(f"Costs: {costs}")
                    print(f"Trainers: {trainers}")
                    print(f"Additional Infos: {additional_infos}")
                    print(f"What to Bring: {what_to_bring}")
                    print(f"Categories: {categories}")
                    print(f"Minimum Ages: {min_ages}")
                    print(f"Durations: {durations}")

        return courses
    
    def __del__(self):
        self.doc.close() 