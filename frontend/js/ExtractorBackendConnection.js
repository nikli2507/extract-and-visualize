if (localStorage.getItem("courses") === null) {
  fetch("http://127.0.0.1:5000/courses")
  .then(response => response.json())
  .then(courses => {
    courses.forEach(function(course) {
      course.selected = true;
    });
    localStorage.setItem("courses", JSON.stringify(courses));
    printCourses(courses);
  })
  .catch(error => console.error(error));
} else {
  var courses = JSON.parse(localStorage.getItem("courses"));
  var filters = [];

  var accordion = document.createElement("div");
  accordion.classList.add("accordion");
  accordion.setAttribute("id", "coursesAccordion");
  document.body.appendChild(accordion);

  printCourses(courses)
}





