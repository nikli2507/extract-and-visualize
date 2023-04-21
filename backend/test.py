from helper_functions import *

doc = fitz.open("courses.pdf")
dict = doc[59].get_text("dict")

target_groups = get_text_from_keyword(dict, "Zielgruppe")
print(target_groups)