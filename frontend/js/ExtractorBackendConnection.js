if (localStorage.getItem("courses") === null) {
  fetch("http://127.0.0.1:5000/courses")
  .then(response => response.json())
  .then(courses => {
    localStorage.setItem("courses", JSON.stringify(courses));
    printCourses(courses);
  })
  .catch(error => console.error(error));
} else {
  var courses = JSON.parse(localStorage.getItem("courses"));
  var filters = [];
  printCourses(courses)
}





