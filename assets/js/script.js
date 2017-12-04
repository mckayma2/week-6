// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "ready!" ); // Document ready test
	


	$( "#button" ).click(function() {
	var buttonName = $( ".form-control" ).val();  
	buttonName = buttonName.toUpperCase();
	$("#test").append('<button type="button" class="btn btn-default userbutton" value=' + buttonName + '>' + buttonName + '</button>');
	$( ".form-control" ).val("");  	
		
		$(".userbutton").click(function() {
		console.log($(this).text());
		var buttonText = $(this).text();
		$("#searchResult").html("");
			// VARIABLES
			//======================================================
			var userresult;
			//API PARAMETERS
			//======================================================
			$.get("assets/js/readme.json", function(data){
			var whataguaan = atob(data.whataguaan);
		
			
			var url = "https://api.giphy.com/v1/gifs/search";
			url += '?';
			
			console.log(whataguaan);
			url +=  '&q=' + buttonText; //TO ADD THE USER IMPUT SEAR FIELD TO THE REQUEST
			url +=  '&limit=4'; // TO LIMIT RESULTS TO 5
			url +=  '&offset=0';
			url +=  '&rating=G'; // TO SET CONTENT RATING TO G
			url +=  '&lang=en&';
			url +=  whataguaan;	
				
			
			console.log("URL" + url);
			//API SERVER REQUEST
			//======================================================
			$.ajax({
			  url: url,
			  method: 'GET',
			}).done(function(result) {
			  console.log(result);
			userresult=result.data;
			console.log(userresult);
			
			//LOOP TO CREATE APPEND RESULTS TO DIV
			//======================================================
			for (var i = 0; i <5; i++){
			// ORGANIZE QUERRY RESULTSET
			var imgStill = userresult[i].images.original_still.url;
			var imgActive = userresult[i].images.downsized.url;
			var title = userresult[i].title;
			console.log(imgStill);
			
                         // BUTTON CREATION
			//======================================================
			$("#searchResult").append('<div class="card-block" id="' + i +'"><p class="card-text"><h4 style="text-align: center;">'+ title +'<h4><img src='+ imgStill +' class="card-img-top" alt='+ title +'  width="200" height="200"></p></div>');
			
			}
				
				// TO CONVERT IMAGE FROM STILL TO ACTIVE AND VISA VERSA
				//======================================================
				$( ".card-block" ).click(function() {
				console.log
				var clickedId = $(this).attr("id");
				var imgElement = $(this).find("img");
				var currentSrc = imgElement[0].src;
				stillSrc = userresult[clickedId].images.original_still.url;
				activeSrc = userresult[clickedId].images.downsized.url;
				if ( currentSrc === stillSrc ){
				//alert("still source");
				 $(imgElement).attr('src', activeSrc);
				}
				if ( currentSrc === activeSrc ){
				//alert("Active source");
				 $(imgElement).attr('src', stillSrc);
				}
				//console.log(j);
					
				
				});
			}).fail(function(err) {
 			 throw err;
			});
			});
				


		});

	});
			

});



