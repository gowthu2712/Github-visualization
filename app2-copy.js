$(document).ready(function(){

	$("#search").click(function(){

    clearCanvas();

		var langterm = $("#lang").val() ? $("#lang").val() : "github";
		var criteria = $("#criteria").val();

		function getInterestingRepos(criteria, callback) 	{
			if (criteria == "Watchers"){
				criteria_val = "watchers";

			}
			else if (criteria == "Forks") {
				criteria_val = "forks";

			}
			else if (criteria == "Size") {
				criteria_val = "size";
			}
			else {
				criteria_val = "open_issues";
			}
			$.get("https://api.github.com/search/repositories?q="+langterm+"+language:"+langterm+"&sort="+criteria_val+"&order=desc",
				function(data, status){
					console.log(status);
					success: callback(criteria, data, status);
			});
		};


		// call the user and repos functions
		getInterestingRepos(criteria, createBubbleChart);




	}); // end of search click function

	function createBubbleChart(criteria, dataValue)	{
		$("#repoSuggestions").append("<br><br><h3> Top 10 Suggested Repositories to work on: <br><br>");
		$("#repoSuggestions").append("<div class='bubbleChart'/>");
		$("#repoSuggestions").append("<br><br><div><table class='table' id='repoSuggestionsTable'><tr class='info'><th>#</th><th>Repo Name (with link)</th><th>Nof watchers</th><th>Nof forks</th><th>Size (in Kb)</th><th>Open issues</th></tr></table></div>")
		var ChartData = new Array();

		for (i=0; i<=9; i++)	{
			if (criteria == "Watchers"){
				ChartData.push({
													text : dataValue.items[i].name,
													count : dataValue.items[i].watchers
												});
				$('#repoSuggestionsTable').append("<tr><td>"+(i+1)+"</td><td><a href='"+dataValue.items[i].svn_url+"'>"+dataValue.items[i].name+"</a></td><td>"+dataValue.items[i].watchers_count+"</td><td>"+dataValue.items[i].forks+"</td><td>"+dataValue.items[i].size+"</td><td>"+dataValue.items[i].open_issues+"</tr>");
				console.log(ChartData[i].count);

			}
			else if (criteria == "Forks") {
				ChartData.push({
													text : dataValue.items[i].name,
													count : dataValue.items[i].forks
												});
				$('#repoSuggestionsTable').append("<tr><td>"+(i+1)+"</td><td><a href='"+dataValue.items[i].svn_url+"'>"+dataValue.items[i].name+"</a></td><td>"+dataValue.items[i].watchers_count+"</td><td>"+dataValue.items[i].forks+"</td><td>"+dataValue.items[i].size+"</td><td>"+dataValue.items[i].open_issues+"</tr>");
				console.log(ChartData[i].count);

			}
			else if (criteria == "Size") {
				ChartData.push({
													text : dataValue.items[i].name,
													count : dataValue.items[i].size
												});
				$('#repoSuggestionsTable').append("<tr><td>"+(i+1)+"</td><td><a href='"+dataValue.items[i].svn_url+"'>"+dataValue.items[i].name+"</a></td><td>"+dataValue.items[i].watchers_count+"</td><td>"+dataValue.items[i].forks+"</td><td>"+dataValue.items[i].size+"</td><td>"+dataValue.items[i].open_issues+"</tr>");
				console.log(ChartData[i].count);
			}
			else {
				ChartData.push({
													text : dataValue.items[i].name,
													count : dataValue.items[i].open_issues
												});
				$('#repoSuggestionsTable').append("<tr><td>"+(i+1)+"</td><td><a href='"+dataValue.items[i].svn_url+"'>"+dataValue.items[i].name+"</a></td><td>"+dataValue.items[i].watchers_count+"</td><td>"+dataValue.items[i].forks+"</td><td>"+dataValue.items[i].size+"</td><td>"+dataValue.items[i].open_issues+"</tr>");
				console.log(ChartData[i].count);
			}

		}



		var bubbleChart = new d3.svg.BubbleChart({
	    supportResponsive: true,
	    //container: => use @default
	    size: 600,
			width: 1200,
	    //viewBoxSize: => use @default
	    innerRadius: 600 / 3.5,
	    //outerRadius: => use @default
	    radiusMin: 50,
	    //radiusMax: use @default
	    //intersectDelta: use @default
	    //intersectInc: use @default
	    //circleColor: use @default
	    data: {
				items: ChartData,
	      eval: function (item) {return item.count;},
	      classed: function (item) {return item.text.split(" ").join("");}
	    },
	    plugins: [
	      {
	        name: "central-click",
	        options: {
	          text: "",
	          style: {
	            "font-size": "12px",
	            "font-style": "italic",
	            "font-family": "Source Sans Pro, sans-serif",
	            //"font-weight": "700",
	            "text-anchor": "middle",
	            "fill": "white"
	          },
	          attr: {dy: "65px"},
	          centralClick: function() {

	          }
	        }
	      },
	      {
	        name: "lines",
	        options: {
	          format: [
	            {// Line #0
	              textField: "count",
	              classed: {count: true},
	              style: {
	                "font-size": "28px",
	                "font-family": "Source Sans Pro, sans-serif",
	                "text-anchor": "middle",
	                fill: "white"
	              },
	              attr: {
	                dy: "0px",
	                x: function (d) {return d.cx;},
	                y: function (d) {return d.cy;}
	              }
	            },
	            {// Line #1
	              textField: "text",
	              classed: {text: true},
	              style: {
	                "font-size": "14px",
	                "font-family": "Source Sans Pro, sans-serif",
	                "text-anchor": "middle",
	                fill: "white"
	              },
	              attr: {
	                dy: "20px",
	                x: function (d) {return d.cx;},
	                y: function (d) {return d.cy;}
	              }
	            }
	          ],
	          centralFormat: [
	            {// Line #0
	              style: {"font-size": "50px"},
	              attr: {}
	            },
	            {// Line #1
	              style: {"font-size": "30px"},
	              attr: {dy: "40px"}
	            }
	          ]
	        }
	      }]
	  });



		//$("#repoSuggestions").append("<div class='bubbleChart'/>");
	}

  var clearCanvas = function(){
		$("h3").remove(); // clear out username heading
		$("#searchRepo").remove(); // clear out button
		$("#repoSuggestionsTable").remove();
    $("#repoSuggestions").html("");
		d3.selectAll("svg").remove(); // clear out chart

	};

});
