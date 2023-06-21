import fitz
import re

def remove_whitespaces(str_list: list) -> list:
    
    edited_str_list = []

    # remove leading/following whitespaces and double whitespaces 
    for str in str_list:
        edited_str_list.append(" ".join(str.split()).strip().lstrip("<br>"))

    return edited_str_list

def save_dict_as_file(dictionary: dict, page_n: int):
    with open(f'page{page_n}.json', 'w') as file:
        file.write(str(dictionary))

def save_page_as_file(page_n: int):
    doc = fitz.open("courses.pdf")
    dict = doc[page_n].get_text("dict")
    save_dict_as_file(dict, page_n)

def durations_as_days(durations: list) -> list:
    durations_days = []
    days_conversion = {
        'Tag': 8,
        'Tage': 8,
        'Stunden': 1,
        'Minuten': 1/60
    }
    for duration in durations:
        if duration != "":
            duration = re.sub(r'\(.*?\)|oder.*', '', duration)
            periods = re.findall(r'(\d+(?:,\d+)?)\s*(\w+)', duration)
            
            for period in periods:
                duration = float(period[0].replace(',', '.'))
                unit = period[1]
                
                if unit in days_conversion:
                    hours = duration * days_conversion[unit]
                    days = hours / 8
                    durations_days.append(days)
        else:
            durations_days.append(0.0)

        if len(durations_days) == 0:
            durations_days = [0.0 for _ in range(len(durations))]

    return durations_days        


    


