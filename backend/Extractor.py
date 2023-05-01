import fitz
from Course import Course
from TitleExtractor import TitleExtractor
from CategoryExtractor import CategoryExtractor
from TargetGroupExtractor import TargetGroupExtractor
from ContentExtractor import ContentExtractor
from PrerequisiteExtractor import PrerequisiteExtractor
from TrainerExtractor import TrainerExtractor
from DatesLocationExtractor import DatesLocationExtractor
from DurationExtractor import DurationExtractor
from CostExtractor import CostExtractor
from WhatToBringExtractor import WhatToBringExtractor
from MinAgeExtractor import MinAgeExtractor
from TimeExtractor import TimeExtractor
from AdditionalInformationExtractor import AdditionalInformationExtractor
from DescriptionExtractor import DescriptionExtractor
from helper_functions import save_dict_as_file

class Extractor():
    
    def __init__(self, file_path: str):
        self.doc = fitz.open(file_path)

    def extract(self) -> list:
        
        courses: Course = []
        title_extractor = TitleExtractor()
        category_extractor = CategoryExtractor()
        target_group_extractor = TargetGroupExtractor()
        content_extractor = ContentExtractor()
        prerequisite_extractor = PrerequisiteExtractor()
        trainer_extractor = TrainerExtractor()
        dates_location_extractor = DatesLocationExtractor()
        duration_extractor = DurationExtractor()
        cost_extractor = CostExtractor()
        what_to_bring_extractor = WhatToBringExtractor()
        min_age_extractor = MinAgeExtractor()
        time_extractor = TimeExtractor()
        additional_info_extractor = AdditionalInformationExtractor()
        description_extractor = DescriptionExtractor()

        for i in range(0, self.doc.page_count-1):           
            page = self.doc[i].get_text("dict")
            try:
                titles, title_coords = title_extractor.extract(page) 
                n_courses_on_page = len(titles)
                categories = category_extractor.extract(page, n_courses_on_page)  
                target_groups = target_group_extractor.extract(page, n_courses_on_page)
                contents = content_extractor.extract(page, n_courses_on_page)
                prerequisites = prerequisite_extractor.extract(page, n_courses_on_page)
                trainers = trainer_extractor.extract(page, n_courses_on_page)
                dates_locations = dates_location_extractor.extract(page, n_courses_on_page)
                durations = duration_extractor.extract(page, n_courses_on_page)
                costs = cost_extractor.extract(page, n_courses_on_page)
                what_to_bring = what_to_bring_extractor.extract(page, n_courses_on_page)
                min_ages = min_age_extractor.extract(page, n_courses_on_page)
                times = time_extractor.extract(page, n_courses_on_page)
                additional_infos = additional_info_extractor.extract(page, n_courses_on_page)
                descriptions = description_extractor.extract(page, n_courses_on_page, title_coords)

                if titles == [] or categories == []:
                    raise ValueError()
                       
                for j in range(len(titles)):
                    courses.append(Course(titles[j], descriptions[j], target_groups[j], contents[j], prerequisites[j], dates_locations[j], times[j], costs[j], trainers[j], additional_infos[j], what_to_bring[j], categories[j], min_ages[j], durations[j]))

                if i in [0, 1, 2, 3, 4, 5, 6, 7, 8, 28, 29, 30, 43, 44, 45, 46, 56, 57, 63, 64, 65, 72, 73, 74, 85, 86, 87, 94, 95, 98, 99, 108, 109, 113, 114, 115, 117, 120, 121, 124, 125, 128, 129, 130, 131]:
                    print(f"Extracted course on page {i}, but should not!")

            except:
                if not (i in [0, 1, 2, 3, 4, 5, 6, 7, 8, 28, 29, 30, 43, 44, 45, 46, 56, 57, 63, 64, 65, 72, 73, 74, 85, 86, 87, 94, 95, 98, 99, 108, 109, 113, 114, 115, 117, 120, 121, 124, 125, 128, 129, 130, 131]):
                    print(f"Could not extract any course on page {i}!")

        return courses
    
    def __del__(self):
        self.doc.close() 