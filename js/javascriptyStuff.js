var gTime = new Date()
var gData = null
var classData = null
var gDebugTime = null
//var gData = null

$(document).ready(function()
{

	$("#phonePage").hide();
	$("#wrongRoomMenuPanel").hide()
	$("#changeRoomPanel").hide();
	$("#manualBuildingEntry").hide();
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
			getRoomContents()

			},
		error: function(a,b) {
			console.log(a)
			console.log(b)
		}
	});

	$("#continueButton").click(function() {
		$("#firstPage").fadeOut("slow");
		$("#phonePage").fadeIn("slow");
	})


	$("#amIWrongText").click(function() {
		$("#beaconFoundFirstGuessPanel").fadeOut('slow');
		//need to change the header image to crying platypus.
		$("#header").css('background-image','url("images/header_sad.png")');
		$("#wrongRoomMenuPanel").fadeIn("slow");
		
	});


	//Wrong room page
	$("#sureLetsFindRightRoom").click(function() {
		$("#buildingImage").html("");
		$("#buildingImage").append("<img src=\"http://emilevictor.com/py/getBeaconLocation.py/getImage?buld="+gData.buld+"\" width=\"109\">");
		$("#roomNumber").html(gData.room);
		$("#wrongRoomMenuPanel").fadeOut('slow');
		$("#changeRoomPanel").fadeIn('slow');
		$("#changeRoomPanel").show();
		$("#wrongRoomMenuPanel").hide();
		console.log("This bloody thing should be showing up.");
	});

	$("#nopeEnterManually").click(function() {
		$("#wrongRoomMenuPanel").fadeOut('slow');
		$("#manualBuildingEntry").fadeIn('slow');
	});

	$("#manualEnterButton").click(function() {
		$("#changeRoomPanel").fadeOut('slow')
		getRoomContents()
		$("#iThinkYouAreIn").html("");
		$("#iThinkYouAreIn").append("You chose " + gData.buld + "-" + gData.room);
		$("#header").css('background-image','url("images/header_happy.png")');
		$("#beaconFoundFirstGuessPanel").fadeIn('slow');

	});

	$("#changeRoomButton").click(function() {
		gData.room = parseInt($("#roomNo").val())
		gData.buld = parseInt($("#buldNo").val())
		$("#manualBuildingEntry").fadeOut('slow');
		getRoomContents()
		$("#iThinkYouAreIn").html("");
		$("#iThinkYouAreIn").append("You chose " + gData.buld + "-" + gData.room);
		$("#header").css('background-image','url("images/header_happy.png")');
		$("#beaconFoundFirstGuessPanel").fadeIn('slow');
	});

	$("#upArrow").click(function() {
		if (gData.room < 600)
		{
			gData.room += 100
		}
		
		$("#roomNumber").html(gData.room);
	});

	$("#downArrow").click(function() {
		if (gData.room >= 200)
		{
			gData.room -= 100
		}
		$("#roomNumber").html(gData.room);
	});

	$("#rightArrow").click(function() {
		gData.room += 1
		$("#roomNumber").html(gData.room);
	});

	$("#leftArrow").click(function() {
		if (!(gData.room % 100) == 0)
		{
			gData.room -= 1
		}
		$("#roomNumber").html(gData.room);

	});



});

function getRoomContents()
{
	$.ajax({
			url: "/py/getBeaconLocation.py/getClasses?buld="+gData.buld+"&room="+gData.room,
			dataType: "json",
			type: "GET",
			success: function(data) {
				classData = data;
				addClasses(data)

			},
			error: function(a,b) {
				console.log(a)
				console.log(b)
			}
		});
}

function parseDate(dateString)
{
	//2012-09-21 12:00:00

	return new Date(Date.parse(dateString));
}

function addClasses(data)
{
	$("#calendarDivForClasses").html("");
	if (data.length > 0)
	{
		for (var i = 0; i < data.length; i++)
		{
			var startTime = parseDate(data[i].start)
			var finishTime = parseDate(data[i].finish)
			var lengthOfClass = (((finishTime.getHours() - startTime.getHours()) + 1)*24)-10
			var distanceFromTop = 20+((startTime.getHours()-8)*24)
			$("#calendarDivForClasses").append("<div class=\"individualClasses\" style=\"border-radius:4px;border-width:2px;border-color:black;border-style:solid;width: 166px; height:"+lengthOfClass+"px;position:absolute;padding:4px;background-color:white;color:black;top:"+distanceFromTop+"px;\">"+data[i].class+"</div>");
		}
	}
	
}

