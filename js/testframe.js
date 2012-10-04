var testnum = null;
var starttime = null;

function initTestCase(n,building,room,fullroom) {
	testnum = n;
        gData.buld = building;
        gData.room = parseInt(room);
        gData.fullroom = fullroom;
        $("#iThinkYouAreIn").html("I think you are in room " + gData.buld + "-" + gData.room);
        $("#iStillThinkText").html("I still think you're in building "+ gData.buld);
        getRoomContents()
	for (i=1; i < 5 ; i+=1) {
		if (i==testnum) {
			$("#case"+i+"instructions").fadeIn("slow");
		} else {
			$("#case"+i+"instructions").fadeOut("slow");
		}
	}
	$("#starttest").fadeIn("slow");
	$("#starttest").click(function() {
		starttime=new Date();
		$("#firstPage").fadeOut("slow");
		$("#phonePage").fadeIn("slow");
	});
	
}

function endTest(s) {
	var finish = new Date();
	var timetaken = finish.getTime() - starttime.getTime();
	console.log("Time (ms): "+ timetaken + " Success:"+s);
	$.ajax({
		url: "/py/getBeaconLocation.py/addTiming?time="+timetaken+"&success="+s+"&test="+testnum,
		dataType: "json",
		type: "GET",
		success: function(data) {
			$("#phonePage").fadeOut("slow");
			$("#case1instructions").fadeOut("slow");
			$("#case2instructions").fadeOut("slow");
			$("#case3instructions").fadeOut("slow");
			$("#case4instructions").fadeOut("slow");
			$("#starttest").fadeOut("slow");
			$("#firstPage").fadeIn("slow");
		},
		error: function(a,b) {
			alert("Failed to upload timing data");
		}
	});
}
