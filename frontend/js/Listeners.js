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
      var selButton = document.getElementById("selButton");
      selButton.addEventListener("click", function(event) {
        populateCourses();
      }); 
      var modalSaveBtn = document.getElementById("modalSaveBtn");
      modalSaveBtn.addEventListener("click", function(event) {

        var checkboxContainer = document.getElementById("courseForm");
        var checkboxes = checkboxContainer.querySelectorAll("input");
        var labels = checkboxContainer.querySelectorAll("label");
        var courses = JSON.parse(localStorage.getItem("courses"));

        for(var i = 0; i < checkboxes.length; i++) {
          var checkbox = checkboxes[i];
          var label = labels[i];

          for (var j = 0; j < courses.length; j++) {
            if (courses[j].title === label.textContent) {
              if(checkbox.checked) {
                courses[j].selected = true;
              } else {
                courses[j].selected = false;
              }
            }
          }

        }

        localStorage.setItem("courses", JSON.stringify(courses));
        printCourses(applyFilters());

      }); 
      var selAllButton = document.getElementById("selectAll");
      selAllButton.addEventListener("click", function(event) {

        var checkboxContainer = document.getElementById("courseForm");
        var checkboxes = checkboxContainer.querySelectorAll("input");

        var selected = checkboxes[0].checked;
        for(var i = 0; i < checkboxes.length; i++) {
          if(selected) {
            checkboxes[i].checked = false;
          } else {
            checkboxes[i].checked = true;
          }
        }

      }); 
});
