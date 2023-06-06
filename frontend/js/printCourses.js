function printCourses(courses) {
    
    try {
        let oldAccordion = document.getElementById("coursesAccordion");
        document.body.removeChild(oldAccordion)
    } catch (error) {}

    const accordion = document.createElement("div");
    accordion.classList.add("accordion")
    accordion.setAttribute("id", "coursesAccordion")

    for (let i=0; i<courses.length; i++) {
        
        const accordionItem = document.createElement("div");
        accordionItem.classList.add("accordion-item");
        
        const h2 = document.createElement("h2");
        h2.classList.add("accordion-header");

        const button = document.createElement("button");
        button.classList.add("accordion-button");
        button.classList.add("collapsed");
        button.setAttribute("type", "button");
        button.setAttribute("data-bs-toggle", "collapse");
        button.setAttribute("data-bs-target", "#collapse"+i);
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-controls", "collapse"+i);

        const heading = document.createTextNode(courses[i].title);

        const collapse = document.createElement("div");
        collapse.setAttribute("id", "collapse"+i);
        collapse.classList.add("accordion-collapse");
        collapse.classList.add("collapse");
        collapse.setAttribute("data-bs-parent", "#coursesAccordion");

        const accordionBody = document.createElement("div");
        accordionBody.classList.add("accordion-body");

        button.appendChild(heading);
        h2.appendChild(button);
        accordionItem.appendChild(h2);

        body = `${courses[i].category ? courses[i].category : "couldn't be extracted"} <br><br>
                ${courses[i].description ? courses[i].description : "couldn't be extracted"} <br><br>
                <h5>Inhalt</h5>
                ${courses[i].content ? courses[i].content : "couldn't be extracted"} <br><br>
                <h5>Voraussetzungen:</h5>
                ${courses[i].prerequisites ? courses[i].prerequisites : "couldn't be extracted"} <br><br>
                <h5>Zielgruppe:</h5>
                ${courses[i].target_group ? courses[i].target_group : "couldn't be extracted"} <br><br>
                <h5>Kosten:</h5>
                ${courses[i].cost ? courses[i].cost : "couldn't be extracted"} <br><br>
                <h5>Trainer:</h5>
                ${courses[i].trainer ? courses[i].trainer : "couldn't be extracted"} <br><br>
                <h5>Mitzubringen:</h5>
                ${courses[i].what_to_bring ? courses[i].what_to_bring : "couldn't be extracted"} <br><br>
                <h5>Datum und Ort:</h5>
                ${courses[i].dates_location ? courses[i].dates_location : "couldn't be extracted"} <br><br>
                <h5>Dauer:</h5>
                ${courses[i].duration ? courses[i].duration : "couldn't be extracted"} <br><br>
                <h5>Mindestalter:</h5>
                ${courses[i].min_age ? courses[i].min_age : "couldn't be extracted"} <br><br>
                <h5>Zeit:</h5>
                ${courses[i].time ? courses[i].time : "couldn't be extracted"} <br><br>`;


        accordionBody.innerHTML = body;

        collapse.appendChild(accordionBody);
        accordionItem.appendChild(collapse);
        accordion.appendChild(accordionItem);

    }

    document.body.appendChild(accordion)
    
}
