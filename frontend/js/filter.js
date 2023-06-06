
function applyFilters() {
    let filteredCourses = [];
    for (let i = 0; i < courses.length; i++) {
        let inFilters = true;
        for(let j = 0; j < filters.length; j++) {
            if(!(courses[i][filters[j].property].toLowerCase().includes(filters[j].value))) {
                inFilters = false;
                break;
            } 
        }
        if(inFilters) {
            filteredCourses.push(courses[i]);
        }
    }
    let listContainer = document.getElementById("filterListContainer");
    let row = document.getElementById("filterRow");

    listContainer.appendChild(row);

    let containsFilters = false;
    for(let i=0; i<filters.length; i++) {
        if(filters[i].property != "title") {
            containsFilters = true;
            if(!filters[i].active) {
                let col = document.createElement("div");
                col.classList.add("col-sm-2");
                let button = document.createElement("button");
                button.classList.add("btn");
                button.classList.add("btn-primary");
                let text = document.createTextNode(filters[i].property + "=" + filters[i].value);
                button.appendChild(text);
                col.appendChild(button);
                row.appendChild(col);
                filters[i].active = true;

                button.addEventListener("click", function() {
                    button.remove();
                    col.remove();
                    filters.splice(i, 1);
                    console.log(filters);
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