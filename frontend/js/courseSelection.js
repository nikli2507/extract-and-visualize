
  function populateCourses() {

    var form = document.getElementById("courseForm");
    while (form.firstChild) {
      form.removeChild(form.firstChild);
    }
    
    var courses = applyFilters();

    courses.forEach(function(course) {
      var div = document.createElement("div");
      div.classList.add("form-check");
      div.setAttribute("id", "modalCourses");

      var input = document.createElement("input");
      input.classList.add("form-check-input");
      input.type = "checkbox";
      if(course.selected) {
        input.checked = true;
      }
      
      var label = document.createElement("label");
      label.classList.add("form-check-label");
      label.textContent = course.title;

      div.appendChild(input);
      div.appendChild(label);

      form.appendChild(div);
    });
  }