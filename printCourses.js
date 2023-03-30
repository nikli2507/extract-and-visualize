function printCourses(courses) {

    const divContainer = document.createElement("div");
    divContainer.classList.add("container")
    divContainer.classList.add("text-center")

    for (let i=0; i<courses.length; i++) {
        
        const divRow = document.createElement("div");
        divRow.classList.add("row");
        
        const divCol = document.createElement("div");
        divCol.classList.add("col");

        const text = document.createTextNode(courses[i]);
        
        divCol.appendChild(text);
        divRow.appendChild(divCol);
        divContainer.appendChild(divRow);

    }

    document.body.appendChild(divContainer)
    
}
