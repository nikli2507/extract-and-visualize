

if (localStorage.getItem("courses") === null) {
  fetch("https://extract-visualize-back-end-p4pfvqh5nq-uc.a.run.app/courses")
  .then(response => response.json())
  .then(courses => {
    courses.forEach(function(course) {
      course.selected = true;
    });
    localStorage.setItem("courses", JSON.stringify(courses));
    printCourses(courses);
  })
  .catch(error => console.error(error));
    alert("An error when fetching the courses occured. Try reloading the page.")
} else {
  var courses = JSON.parse(localStorage.getItem("courses"));
  var filters = [];

  var accordion = document.createElement("div");
  accordion.classList.add("accordion");
  accordion.setAttribute("id", "coursesAccordion");
  document.body.appendChild(accordion);

  printCourses(courses)
}


document.addEventListener("DOMContentLoaded", function () {
  var modalShown = localStorage.getItem("modalShown");
  if (!modalShown) {
      var modalElement = document.getElementById("myModal");
      modalElement.classList.add("show");
      modalElement.style.display = "block";
      document.body.classList.add("modal-open");
      localStorage.setItem("modalShown", true);
  }
});

function closeModal() {
  var modalElement = document.getElementById("myModal");
  modalElement.style.display = "none";
  modalElement.classList.remove("show");
  document.body.classList.remove("modal-open");
}




