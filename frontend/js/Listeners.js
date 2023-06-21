document.addEventListener("DOMContentLoaded", function() {    
    var searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", function(event) {
        let searchText = searchInput.value;

        for (let i = filters.length - 1; i >= 0; i--) {
            const filter = filters[i];
            if (filter.property === "title") {
                filters.splice(i, 1);
            }
        }
        filters.push({property: "title",
                      value: searchText.toLowerCase()});
        applyFilters();
    });
    var applyFilterButton = document.getElementById("applyFilter");
    applyFilterButton.addEventListener("click", function(event) {
        event.preventDefault(); // prevent submission
        let filterTextForm = document.getElementById("filterText");
        let filterText = filterTextForm.value;
        
        let checkedOption = document.querySelector('input[name="options"]:checked');
        let buttonId = checkedOption.id;
        let property = buttonPropertyMap[buttonId];

        filters.push({property: property,
                      value: filterText.toLowerCase(),
                      active: false});

        applyFilters();

        checkedOption.checked = false;
        filterTextForm.value = "";
        var expandedContent = document.getElementById("expandedContent");
        expandedContent.classList.remove("show");
    });
    var filterPresenceButton = document.getElementById("filterPresence");
    filterPresenceButton.addEventListener("click", function(event) {
        event.preventDefault(); // prevent submission
        
        let checkedOption = document.querySelector('input[name="options"]:checked');
        let buttonId = checkedOption.id;
        let property = buttonPropertyMap[buttonId];

        filters.push({property: property,
                      value: "Presence",
                      active: false});

        applyFilters();

        checkedOption.checked = false;
        var expandedContent = document.getElementById("expandedContent");
        expandedContent.classList.remove("show");
    }); 
    var filterAbsenceButton = document.getElementById("filterAbsence");
    filterAbsenceButton.addEventListener("click", function(event) {
        event.preventDefault(); // prevent submission
        
        let checkedOption = document.querySelector('input[name="options"]:checked');
        let buttonId = checkedOption.id;
        let property = buttonPropertyMap[buttonId];

        filters.push({property: property,
                      value: "Absence",
                      active: false});

        applyFilters();

        checkedOption.checked = false;
        var expandedContent = document.getElementById("expandedContent");
        expandedContent.classList.remove("show");
    }); 
    accordion.addEventListener("click", function(event) {
        if (event.target.classList.contains("deselectButton")) {
          let accordionItem = event.target.closest('.accordion-item');
          let index = accordionItem.getAttribute("index");
        
          if(event.target.innerHTML === "Deselect") {
            courses[index].selected = false;
          } else {
            courses[index].selected = true;
          }
  
          localStorage.setItem("courses", JSON.stringify(courses));
          printCourses(courses);


        }
      });
});
