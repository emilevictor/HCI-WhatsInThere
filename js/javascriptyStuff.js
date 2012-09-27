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

	$.getJSON('/py/getBeaconLocation.py/getRoom', function(data)
	{

		console.log(data);
		gData = data

	});



	$("#amIWrongText").click(function() {
		$("#beaconFoundFirstGuessPanel").fadeOut('slow');

		$("#wrongRoomMenuPanel").fadeIn("slow");
		
	});


});

function doStuffWithJSONData()
{
	console.log("Huh")
}