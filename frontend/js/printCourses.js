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

        let body = `${course.category ? course.category : "not present in document"}   -   <i>Extracted from page ${course.page}</i><br><br>
                    ${course.description ? course.description : "not present in document"} <br><br>
                    <h5>Inhalt</h5>
                    ${course.content ? course.content : "not present in document"} <br><br>
                    <h5>Voraussetzungen:</h5>
                    ${course.prerequisites ? course.prerequisites : "not present in document"} <br><br>
                    <h5>Zielgruppe:</h5>
                    ${course.target_group ? course.target_group : "not present in document"} <br><br>
                    <h5>Kosten:</h5>
                    ${course.cost ? course.cost : "not present in document"} <br><br>
                    <h5>Trainer:</h5>
                    ${course.trainer ? course.trainer : "not present in document"} <br><br>
                    <h5>Mitzubringen:</h5>
                    ${course.what_to_bring ? course.what_to_bring : "not present in document"} <br><br>
                    <h5>Datum und Ort:</h5>
                    ${course.dates_location ? course.dates_location : "not present in document"} <br><br>
                    <h5>Dauer:</h5>
                    ${course.duration ? course.duration : "not present in document"} <br><br>
                    <h5>Mindestalter:</h5>
                    ${course.min_age ? course.min_age : "not present in document"} <br><br>
                    <h5>Zeit:</h5>
                    ${course.time ? course.time : "not present in document"} <br><br>`;

        accordionBody.innerHTML = body;

        collapse.appendChild(accordionBody);
        accordionItem.appendChild(collapse);

        if (courses[i].selected) {
            selectedCourses.push(accordionItem);
        } else {
            deselectedCourses.push(accordionItem);
        }

    }

    selectedCourses.forEach((accordionItem) => {
        accordion.appendChild(accordionItem);
    });

    deselectedCourses.forEach((accordionItem) => {
        accordionItem.style.backgroundColor = "#f2f2f2"; 
        accordionItem.querySelector(".accordion-button").style.backgroundColor = "#f2f2f2";
        accordion.appendChild(accordionItem);
    });

}
