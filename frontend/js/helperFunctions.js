function formatDateTime(date, time) {
    var isoDate = formatDate(date); 
  
    // Default start and end times
    var startTime = '00:00:00';
    var endTime = '23:59:59';
  
    if (time != "") {
      var times = extractTimes(time);
      if (times.start) {
        startTime = times.start;
      }
      if (times.end) {
        endTime = times.end;
      }
    }
  
    var startDateTime = isoDate[0] + 'T' + startTime;
    var endDateTime = isoDate[1] + 'T' + endTime;
  
    return {
      start: startDateTime,
      end: endDateTime
    };
  }
  
  function formatDate(date) {
    var parts = date.split('-');
  
    if (parts.length === 1) {
      var singleDate = parts[0].split('.');
      var year = singleDate[2];
      var month = singleDate[1];
      var day = singleDate[0];
      var formattedDate = year + '-' + month + '-' + day;
      return [formattedDate, formattedDate];
    } else if (parts.length === 2) {
      var startDate = parts[0].split('.');
      var endDate = parts[1].split('.');
  
      var startYear = startDate[2];
      var startMonth = startDate[1];
      var startDay = startDate[0];
      var endYear = endDate[2];
      var endMonth = endDate[1];
      var endDay = endDate[0];
  
      var formattedStartDate = startYear + '-' + startMonth + '-' + startDay;
      var formattedEndDate = endYear + '-' + endMonth + '-' + endDay;
  
      return [formattedStartDate, formattedEndDate];
    }
  }
  
  function extractTimes(time) {
    var times = {
      start: '',
      end: ''
    };
    if (time.includes('bis')) {
      var rangeTimes = time.split('bis');
      times.start = extractTime(rangeTimes[0]);
      times.end = extractTime(rangeTimes[1]);
    } else {
      times.start = extractTime(time);
    }
  
    return times;
  }
  
  function extractTime(time) {
    var extractedTime = time.trim().replace('Uhr', '').trim();
    return extractedTime;
  }