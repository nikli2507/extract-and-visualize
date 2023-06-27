
var categoryData = []

for (const course of JSON.parse(localStorage.getItem("courses"))) {
  if(course.selected) {
    const category = course.category.match(/^[^\d]+|^.+$/)[0].trim();
    const categoryIndex = categoryData.findIndex(tuple => tuple[0].startsWith(category.substring(0, 3)));
    if (categoryData.some(tuple => tuple[0].startsWith(category.substring(0, 3)))) {
       if (categoryIndex !== -1) {
          categoryData[categoryIndex][1] += 1;
      }
    } else {
      categoryData.push([category, 1]);
    }
  }
}

Highcharts.chart('categoryChartContainer', {
chart: {
    type: 'column'
    },
    title: {
    text: 'Courses per Category'
    },
    xAxis: {
    type: 'category',
    title: {
        text: 'Category'
    }
    },
    yAxis: {
    title: {
        text: 'n Courses'
    }
    },
    series: [{
    name: 'n Categories',
    data: categoryData
    }]
});
