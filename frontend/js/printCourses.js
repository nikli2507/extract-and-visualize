function printCourses(courses) {
    
    var accordionItems = document.querySelectorAll('#coursesAccordion .accordion-item');
        accordionItems.forEach(function(item) {
        item.remove();
    });

    const selectedCourses = [];
    const deselectedCourses = [];

    for (let i = 0; i < courses.length; i++) {
        const course = courses[i];

        const accordionItem = document.createElement("div");
        accordionItem.classList.add("accordion-item");
        accordionItem.setAttribute("index", i);

        const h2 = document.createElement("h2");
        h2.classList.add("accordion-header");

        const button = document.createElement("button");
        button.classList.add("accordion-button");
        button.classList.add("collapsed");
        button.setAttribute("type", "button");
        button.setAttribute("data-bs-toggle", "collapse");
        button.setAttribute("data-bs-target", "#collapse" + i);
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-controls", "collapse" + i);

        const heading = document.createTextNode(course.title);

        const collapse = document.createElement("div");
        collapse.setAttribute("id", "collapse" + i);
        collapse.classList.add("accordion-collapse");
        collapse.classList.add("collapse");
        collapse.setAttribute("data-bs-parent", "#coursesAccordion");

        const accordionBody = document.createElement("div");
        accordionBody.classList.add("accordion-body");

        button.appendChild(heading);
        h2.appendChild(button);
        accordionItem.appendChild(h2);

        let body = `${course.category ? course.category : "couldn't be extracted"} <br><br>
                    ${course.description ? course.description : "couldn't be extracted"} <br><br>
                    <h5>Inhalt</h5>
                    ${course.content ? course.content : "couldn't be extracted"} <br><br>
                    <h5>Voraussetzungen:</h5>
                    ${course.prerequisites ? course.prerequisites : "couldn't be extracted"} <br><br>
                    <h5>Zielgruppe:</h5>
                    ${course.target_group ? course.target_group : "couldn't be extracted"} <br><br>
                    <h5>Kosten:</h5>
                    ${course.cost ? course.cost : "couldn't be extracted"} <br><br>
                    <h5>Trainer:</h5>
                    ${course.trainer ? course.trainer : "couldn't be extracted"} <br><br>
                    <h5>Mitzubringen:</h5>
                    ${course.what_to_bring ? course.what_to_bring : "couldn't be extracted"} <br><br>
                    <h5>Datum und Ort:</h5>
                    ${course.dates_location ? course.dates_location : "couldn't be extracted"} <br><br>
                    <h5>Dauer:</h5>
                    ${course.duration ? course.duration : "couldn't be extracted"} <br><br>
                    <h5>Mindestalter:</h5>
                    ${course.min_age ? course.min_age : "couldn't be extracted"} <br><br>
                    <h5>Zeit:</h5>
                    ${course.time ? course.time : "couldn't be extracted"} <br><br>`;

        accordionBody.innerHTML = body;

        collapse.appendChild(accordionBody);
        accordionItem.appendChild(collapse);

        // deselect button
        accordionBody.style.position = "relative";
        const deselectButton = document.createElement("button");
        deselectButton.classList.add("btn", "btn-primary", "close-button", "deselectButton");
        deselectButton.style.position = "absolute"; 
        deselectButton.style.top = "10px"; 
        deselectButton.style.right = "10px"; 
        accordionBody.appendChild(deselectButton);

        if (courses[i].selected) {
            selectedCourses.push(accordionItem);
            deselectButton.innerHTML = "Deselect";
        } else {
            deselectedCourses.push(accordionItem);
            deselectButton.innerHTML = "Select";
        }

    }

    // Append selected courses first
    selectedCourses.forEach((accordionItem) => {
        accordion.appendChild(accordionItem);
    });

    // Append deselected courses with grey background
    deselectedCourses.forEach((accordionItem) => {
        accordionItem.style.backgroundColor = "#f2f2f2"; 
        accordionItem.querySelector(".accordion-button").style.backgroundColor = "#f2f2f2";
        accordion.appendChild(accordionItem);
    });

}
