from TitleExtractor import *
import fitz
import json

# convert document to json
doc = fitz.open("courses.pdf")

doc_dict = []

for i in range(0, doc.page_count):
    doc_dict.append(doc[i].get_text("dict"))

# extract titles from pdf
title_extractor = TitleExtractor()
courses = title_extractor.extract(doc_dict)

# remove leading whitespaces and double whitespaces
helper_list = []
for title in courses:   
    helper_list.append(" ".join(title.split()).strip())

courses = helper_list

print(courses)
print(len(courses))

doc.close() 