
function applyFilters() {
    let filteredCourses = [];
    var courses = JSON.parse(localStorage.getItem("courses"));
    for (let i = 0; i < courses.length; i++) {
        let inFilters = true;
        for(let j = 0; j < filters.length; j++) {
            if(filters[j].value === "Presence") {
                if(courses[i][filters[j].property] === "") {
                    inFilters = false;
                    break;
                }
            } else if(filters[j].value === "Absence") {
                if(!(courses[i][filters[j].property] === "")) {
                    inFilters = false;
                    break;
                }
            } else if(!(courses[i][filters[j].property].toLowerCase().includes(filters[j].value))) {
                inFilters = false;
                break;
            } 
        }
        if(inFilters) {
            filteredCourses.push(courses[i]);
        }
    }
    let listContainer = document.getElementById("filterListContainer");

    let col = document.getElementById("filterCol");
    let containsFilters = false;
    for(let i=0; i<filters.length; i++) {
        if(filters[i].property != "title") {
            containsFilters = true;
            if(!filters[i].active) {
                let button = document.createElement("button");
                button.classList.add("btn");
                button.classList.add("btn-primary");
                button.setAttribute("style", "margin-left: 10px;");
                let text = document.createTextNode(filters[i].property + "=" + filters[i].value + " ☒");
                button.appendChild(text);
                col.appendChild(button);
                filters[i].active = true;

                button.addEventListener("click", function() {
                    button.remove();
                    propVal = button.textContent.split("=");
                    property = propVal[0];
                    value = propVal[1].split(" ")[0];
                    for(let i=0; i<filters.length; i++) {
                        if(filters[i].property === property && filters[i].value === value) {
                            filters.splice(i, 1);
                            break;
                        }
                    }
                    applyFilters();
                });
            }  
        }
    }
    if(containsFilters) {
        listContainer.style.display = "block";
    } else {
        listContainer.style.display = "none";
    }
    printCourses(filteredCourses);
    return filteredCourses;
}

var buttonPropertyMap = {
    optionTitle: 'title',
    optionDescription: 'description',
    optionTargetGroup: 'target_group',
    optionContent: 'content',
    optionPrerequisites: 'prerequisites',
    optionDatesLocation: 'dates_location',
    optionTime: 'time',
    optionCost: 'cost',
    optionTrainer: 'trainer',
    optionAdditionalInformation: 'additional_info',
    optionWhatToBring: 'what_to_bring',
    optionCategory: 'category',
    optionMinAge: 'min_age',
    optionDuration: 'duration'
  };