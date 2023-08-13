var hoursPerMonthData = []
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

for(let month=0; month<=months.length; month++) {
  hoursPerMonthData.push([months[month], 0.0])
} 

for (const course of JSON.parse(localStorage.getItem("courses"))) {
  if(course.selected) {
    for(let location_i=0; location_i<course.dates_locations_list[1].length; location_i++) {
      for(let date_i=0; date_i<course.dates_locations_list[0][location_i].length; date_i++) {
        start_end = formatDateTime(course.dates_locations_list[0][location_i][date_i], course.time);
        
        const startTime = new Date(start_end.start);
        const endTime = new Date(start_end.end);

        const hoursPerMonth = calculateHours(startTime, endTime);

        for (let i = 0; i < hoursPerMonthData.length; i++) {
          hoursPerMonthData[i][1] += hoursPerMonth[i];
        }

      }
    }
  }
}

Highcharts.chart('hoursChartContainer', {
  chart: { type: 'column' },
  title: { text: 'Total Course Hours per Month' },
  xAxis: { type: 'category', title: { text: 'Month' }},
  yAxis: { title: { text: 'Hours' }},
  series: [{
    name: 'Hours per Month',
    data: hoursPerMonthData
  }]
});

function calculateHours(startDate, endDate) {
  const startHour = startDate.getHours();
  const startMinute = startDate.getMinutes();
  const endHour = endDate.getHours();
  const endMinute = endDate.getMinutes();

  const isFullDayRange = startHour === 0 && endHour === 23 && startMinute === 0 && endMinute === 59;
  const hoursPerDay = isFullDayRange ? 8 : calculatePartialHours(startHour, startMinute, endHour, endMinute);

  const startMonth = startDate.getMonth();
  const endMonth = endDate.getMonth();
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();

  const hoursPerMonth = Array(12).fill(0);

  let currentDate = new Date(startYear, startMonth, 1, startHour, startMinute);

  while (currentDate <= endDate) {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    if (currentMonth === startMonth && currentYear === startYear) {
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      const startDay = startDate.getDate();
      const endDay = endDate.getDate();
      const daysInRange = endDay - startDay + 1;

      if (daysInRange === 1 && startHour !== endHour) {
        const remainingHours = (24 - startHour) + (60 - startMinute) / 60;
        const hoursInRange = Math.min(remainingHours, hoursPerDay);
        hoursPerMonth[currentMonth] += hoursInRange;
      } else if (daysInRange === 1 && startHour === endHour) {
        const hoursInRange = (endMinute - startMinute) / 60;
        hoursPerMonth[currentMonth] += hoursInRange;
      } else {
        const hoursInRange = daysInRange * hoursPerDay;
        hoursPerMonth[currentMonth] += hoursInRange;
      }
    } else if (currentMonth === endMonth && currentYear === endYear) {
      const daysInRange = endDate.getDate();
      const hoursInRange = daysInRange * hoursPerDay;
      hoursPerMonth[currentMonth] += hoursInRange;

      if (currentDate.getMonth() === endMonth && currentDate.getFullYear() === endYear && currentDate.getDate() === endDate.getDate()) {
        const partialHours = calculatePartialHours(startHour, startMinute, endHour, endMinute);
        hoursPerMonth[currentMonth] -= hoursPerDay;
        hoursPerMonth[currentMonth] += partialHours;
      }
    } else {
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      const hoursInMonth = daysInMonth * hoursPerDay;
      hoursPerMonth[currentMonth] += hoursInMonth;
    }

    currentDate.setMonth(currentDate.getMonth() + 1);
    currentDate.setDate(1);
    currentDate.setHours(startHour, startMinute);
  }

  return hoursPerMonth;
}

function calculatePartialHours(startHour, startMinute, endHour, endMinute) {
  const partialHours = (endHour - startHour) + (endMinute - startMinute) / 60;
  return partialHours;
}