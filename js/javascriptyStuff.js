var gTime = new Date()
var gData = null
//var gData = null

$(document).ready(function()
{
	$("#wrongRoomMenuPanel").hide()
	var currentPanel = "beaconFoundFirstGuessPanel"

	if (currentPanel == "beaconFoundFirstGuessPanel")
	{
		var distanceForIndicator = 0;
		multiplier = gTime.getHours()
		if (multiplier > 15)
		{
			multiplier = 15;
		} else if (multiplier < 8) {
			multiplier = 8;
		} 
		distanceForIndicator = 24*(multiplier-8)
		$("#timeIndicator").animate({
			top: '+='+distanceForIndicator
		},3000, function() {
			//This is called when I am complete.
		})
	}

	$.ajax({
		url: "/py/getBeaconLocation.py/getRoom",
		dataType: "json",
		type: "GET",
		success: function(data) {
			gData = data;
			$("#iThinkYouAreIn").append("I think you are in room " + gData.buld + "-" + gData.room);	
			$("#iStillThinkText").append("I still think you're in building "+ gData.buld);
			},
		error: function(a,b) {
			console.log(a)
			console.log(b)
		}
	});


	$("#amIWrongText").click(function() {
		$("#beaconFoundFirstGuessPanel").fadeOut('slow');
		$("#wrongRoomMenuPanel").fadeIn("slow");
		
	});

	$("#sureLetsFindRightRoom").click(function() {
		$("#wrongRoomMenuPanel").fadeOut('slow');
		$("#changeRoomPanel").fadeIn('slow');
	});


});

function doStuffWithJSONData()
{
	console.log("Huh")
}
