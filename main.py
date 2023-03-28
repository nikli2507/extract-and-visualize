from TitleExtractor import *
from CoursesDatabase import *
from helper_functions import *
import fitz

# convert document to json
doc = fitz.open("courses.pdf")

doc_dict = []

for i in range(0, doc.page_count):
    doc_dict.append(doc[i].get_text("dict"))

# extract titles from pdf
title_extractor = TitleExtractor()
courses = title_extractor.extract(doc_dict)
print_size_17_content(doc_dict)

# remove leading whitespaces and double whitespaces
helper_list = []
for title in courses:   
    helper_list.append(" ".join(title.split()).strip())

courses = helper_list

doc.close() 

# connection to mongodb
database = CoursesDatabase()
database.clean()

for title in courses:
    database.write({
    "title" : title,
    })

for item in database.query_all_dicts():
    print(item)

