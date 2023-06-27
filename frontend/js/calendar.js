var calendar = new tui.Calendar('#calendar', {
  defaultView: 'month', 
  useCreationPopup: false, 
  useDetailPopup: true, 
  disableDblClick: true,
  isReadOnly: true
});

var events = [];
current_id = 0;

for (const course of JSON.parse(localStorage.getItem("courses"))) {
  if(course.selected) {
    for(let location_i=0; location_i<course.dates_locations_list[1].length; location_i++) {
      for(let date_i=0; date_i<course.dates_locations_list[0][location_i].length; date_i++) {
        start_end = formatDateTime(course.dates_locations_list[0][location_i][date_i], course.time);
        events.push({id: current_id, calendarId: '1', title: course.title, category: 'time', location: course.dates_locations_list[1][location_i], start: start_end.start, end: start_end.end});
        current_id++;
      }
    }
  }
}

calendar.createSchedules(events);

var currentMonthLabel = document.getElementById('currentMonthLabel');

function updateCurrentMonthLabel() {
  var currentDate = calendar.getDate();
  var currentMonth = currentDate.getMonth();

  currentMonthLabel.textContent = getMonthName(currentMonth);
} 

function getMonthName(monthIndex) {
  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return monthNames[monthIndex];
}

updateCurrentMonthLabel();

calendar.render();

var prevButton = document.getElementById('prev-button');
var nextButton = document.getElementById('next-button');

prevButton.addEventListener('click', function () {
  calendar.prev();
  updateCurrentMonthLabel();
});

nextButton.addEventListener('click', function () {
  calendar.next();
  updateCurrentMonthLabel();
});


