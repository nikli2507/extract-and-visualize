function printCourses(courses) {

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

        const heading = document.createTextNode(courses[i]);

        const collapse = document.createElement("div");
        collapse.setAttribute("id", "collapse"+i);
        collapse.classList.add("accordion-collapse");
        collapse.classList.add("collapse");
        collapse.setAttribute("data-bs-parent", "#coursesAccordion");

        const accordionBody = document.createElement("div");
        accordionBody.classList.add("accordion-body");

        const text = document.createTextNode("sample description");
        
        button.appendChild(heading);
        h2.appendChild(button);
        accordionItem.appendChild(h2);

        accordionBody.appendChild(text);
        collapse.appendChild(accordionBody);
        accordionItem.appendChild(collapse);

        accordion.appendChild(accordionItem);

    }

    document.body.appendChild(accordion)
    
}
