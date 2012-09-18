var gTime = new Date()

$(document).ready(function()
{
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
	distanceForIndicator = 24*(gTime.getHours()-8)
	$("#timeIndicator").animate({
		top: "+="+distanceForIndicator
	},3000, function() {
		//This is called when I am complete.
	})
}
});