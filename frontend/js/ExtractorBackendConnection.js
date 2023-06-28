if (localStorage.getItem("courses") === null) {
  fetch("courses.json")
  .then(response => response.json())
  .then(courses => {
    courses.forEach(function(course) {
      course.selected = true;
    });
    localStorage.setItem("courses", JSON.stringify(courses));
    printCourses(courses);
  })
  .catch(error => console.error(error));
  var courses = 
  localStorage.setItem("courses", JSON.stringify(courses));
  printCourses(courses);
} else {
  var courses = JSON.parse(localStorage.getItem("courses"));
  var filters = [];

  var accordion = document.createElement("div");
  accordion.classList.add("accordion");
  accordion.setAttribute("id", "coursesAccordion");
  document.body.appendChild(accordion);

  printCourses(courses)
}





