from TitleExtractor import *
from CoursesDatabase import *
from helper_functions import *
import fitz

# courses start at page 10 and end at page 128
COURSE_LISTING_BEGIN_PAGE = 9
COURSE_LISTING_END_PAGE = 127

# convert document to json
doc = fitz.open("courses.pdf")

courses = []
title_extractor = TitleExtractor()

# extract titles from pdf
for i in range(COURSE_LISTING_BEGIN_PAGE, COURSE_LISTING_END_PAGE):              
    courses.append(title_extractor.extract(doc[i].get_text("dict"))) 

# flatten list and remove leading/following whitespaces and double whitespaces
courses = post_process(courses)

doc.close() 

# connection to mongodb
database = CoursesDatabase()
database.clean()

for title in courses:
    database.write({
    "title" : title,
    })



