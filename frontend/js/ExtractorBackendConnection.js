fetch("http://127.0.0.1:5000/courses")
  .then(response => response.json())
  .then(data => {
    console.log(data);
    printCourses(data);
  })
  .catch(error => console.error(error));