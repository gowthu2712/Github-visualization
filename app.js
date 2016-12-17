$(document).ready(function(){

	$("#search").click(function(){

		// clear out previous results if needed
		clearCanvas();

		// find out the searchterm
		var searchterm = $("#term").val() ? $("#term").val() : "github";

		function getNofFollowers(callback)	{
			$.get("https://api.github.com/users/" + searchterm,
				function(data, status){
					console.log(status);
					success: callback(data, status);
			});
		};

		// get user
		function getUserData(callback) {
			$.get("https://api.github.com/users/" + searchterm,
				function(data, status){
					console.log(status);
					success: callback(data, status);
			});
		};

		// get repos
		function getUserRepos(callback){
			$.get("https://api.github.com/users/" + searchterm + "/repos",
				function(data, status){
					console.log(status);
					success: callback(data,status);
			});
		};

		// get languages
		function getRepoLanguages(callback,repo){
			$.get("https://api.github.com/repos/" + searchterm + "/" + repo + "/languages",
				function(data, status){
						console.log(status);
						success: callback(data,status,repo);
			});
		};

		// callback function to show user
		function showUser(data, status){
		    console.log(status);
		    var username = "<h3> How are my repos? </h3><br>";
		    $("#username").append(username);
		    // debugger;
		};

		function showAllProgrammingLanguages(data, status){
				console.log(status);
				for (var i = 0; i < data.length; i++) {
					$("#ProgrammingDetails").append("<li>" + data[i].name + "</li>");
				};
		}

		// callback function to show repos
		function showRepos(data, status){
			console.log(status);
			$("#repoDetails").append("<h3> List of repositories : </h3>");
			$("#repoDetails").append("<select class='form-control' id='repositoryList'></select>");
			for (var i = 0; i < data.length; i++) {
				$("#repositoryList").append("<option>" + data[i].name + "</option>");
			};
			repoChoice = $("#repositoryList").val();
			console.log(repoChoice);
			getRepoLanguages(showLangs, repoChoice);

			// function when user clicks a repo choice
			$("#repositoryList").change(function()	{
				repoChoice = $("#repositoryList").val();
				$("#chart_placeholder").html("");
				console.log(repoChoice);
				getRepoLanguages(showLangs, repoChoice);
			});
			//$("#repoDetails").children().click(function(){

				// clear out any prior details - no longer required
				// $("#langDetails").children().remove();

				// get the chosen repo id by reference to the id of the element in list that was clicked
				//var repoChoice = $("#"+this.id).html();

				// call the languages function to get data for chosen repo
				//getRepoLanguages(showLangs, repoChoice);

			//});
		};

		// callback function to show languages
		function showLangs(data, status, repo){
			// clear the elements out
			call_EventDrop(searchterm, repo);


		}; // end of the showLangs function


		// call the user and repos functions
		//getUserData(showUser);
		getUserRepos(showRepos);

 }); // end of search click function


	// respond to click on clear button
	$("#clear").click(function(){
		$("#term").val(''); // extra detail to clear out input box
		clearCanvas();
	});

	// clear the elements out
	var clearCanvas = function(){
		$("li").remove(); // clear out list items
		$("h3").remove(); // clear out username heading
		$("h4").remove(); // clear out heading "Repos"
		$("#searchRepo").remove(); // clear out button
		$("#chart_placeholder").html("");
		$("select").remove();
		d3.selectAll("svg").remove(); // clear out chart

	};

});
