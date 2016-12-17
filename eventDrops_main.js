function call_EventDrop(username, repo) {
  var names = [];
  var chartData = [];
  //var names = ["Lorem", "Ipsum", "Dolor", "Sit", "Amet", "Consectetur", "Adipisicing", "elit", "Eiusmod tempor", "Incididunt"];

  var endTime = Date.now();
  var month = 30 * 24 * 60 * 60 * 1000;
  var startTime = endTime - 36 * month;

  //var endTime = Date.now();
  //var oneMonth = 30 * 24 * 60 * 60 * 1000;
  //var startTime = endTime - oneMonth;
  //var middleTime = startTime + ((endTime - startTime) / 2);



  $.ajax({
    url: "https://api.github.com/repos/"+username+"/"+repo+"/commits",
    success: function(data){

      var date = [];
      var dates = [];
      var label = [];
      var labels = [];
      for (var i=0; i<data.length; i++)  {
        if (names.indexOf(data[i].commit.committer.name)==-1){
          names.push(data[i].commit.committer.name);
          date = [new Date(data[i].commit.committer.date)];
          label = ["Hello"];
          dates.push(date);
          labels.push(label);
        }
        else {
          dates[names.indexOf(data[i].commit.committer.name)].push(new Date(data[i].commit.committer.date));
          labels[names.indexOf(data[i].commit.committer.name)].push("Labels");
        }
      }

      console.log(names);

      function createEvent (name, date, label) {
          //maxNbEvents = 20;
          var event = {
              name: name,
              dates: date,
              label: label
          };
          // add up to 200 events

          //var max =  Math.floor(Math.random() * maxNbEvents);
          //for (var j = 0; j < max; j++) {
          //    var time = (Math.random() * (endTime - startTime)) + startTime;
          //    event.dates.push(new Date(time));
          //}
          return event;
      }
      for (var i = 0; i < names.length; i++) {
          console.log(names[i]);
          console.log(dates[i]);
          chartData.push(createEvent(names[i],dates[i], labels[i]));
      }
      console.log(JSON.stringify(chartData));

      //chartData = [
  //{ name: "http requests", dates: [{date: new Date('2014/09/15 13:24:54'), foo: 'bar1'}, {date: new Date('2015/09/15 13:25:03'), foo: 'bar2'}, {date: new Date('2016/09/15 13:25:05'), foo: 'bar1'}] },
  //{ name: "SQL queries", dates: [{date: new Date('2014/09/15 13:24:57'), foo: 'bar4'}, {date: new Date('2015/09/15 13:25:04'), foo: 'bar6'}, {date: new Date('2016/09/15 13:25:04'), foo: 'bar2'}] }
//];
      var chartPlaceholder = document.getElementById('chart_placeholder');


      var color = d3.scale.category20();

      var locale = d3.locale({
          "decimal": ",",
          "thousands": " ",
          "grouping": [3],
          "dateTime": "%A %e %B %Y, %X",
          "date": "%d/%m/%Y",
          "time": "%H:%M:%S",
          "periods": ["AM", "PM"],
          "days": ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
          "shortDays": ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
          "months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
          "shortMonths": ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Oct", "Sept", "Oct", "Nov", "Dec"]
      });



      var graph = d3.chart.eventDrops()
          .minScale(0.5)
          .maxScale(100)
          .start(new Date(startTime))
          .end(new Date(endTime))
          .locale(locale)
          .eventColor(function (datum, index) {
                var color = "#000000";
                //return color(index);
                return color;
            })
          .width(800)
          .margin({ top: 100, left: 200, bottom: 0, right: 0 })
          .axisFormat(function(xAxis) {
              xAxis.ticks(5);
          })
          .eventHover(function(el) {
              var series = el.parentNode.firstChild.innerHTML;
              var timestamp = d3.select(el).data()[0];
              //alert(d3.select(el).data()[0].date);
              document.getElementById('legend').innerHTML =' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Commits by ' + series + ' on ' + timestamp;
          })

      var element = d3.select(chartPlaceholder).datum(chartData);
      graph(element);

      var updateDelimiter = function (value) {
          graph.hasDelimiter(!graph.hasDelimiter())(element);
      };

      var addLine = function () {
                var data = element.datum();
                var i = data.length;
                data.push(createEvent(names[i]));
                elements = element.datum(data);
                graph(element);
            };

            var removeLine = function () {
                var data = element.datum();
                data.pop();
                element = element.datum(data);
                graph(element);
            };




    }
  });
}
