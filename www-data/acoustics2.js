var stateTimer;
var templates = {};
var jsonSource = 'json.pl';

$(document).ready(function() {
	$("#queue-list").sortable({placeholder: "ui-state-highlight", axis: "y", handle: ".queue-song-handle"});
	var queueList = $("li.queue-song");
	templates.queueSong = queueList.first().clone();
	playerStateRequest();
	handlePlayerStateRequest({playlist:[
		{
			title: "bacon is delicious",
			artist: "the redditors"
		},
		{
			title: "bacon is deliciousasdf",
			artist: "the redditors"
		},
		{
			title: "lol",
			artist: "this is fun"
		}
		]});
//	if (stateTimer) clearInterval(stateTimer);
//	stateTimer = setInterval(function() {playerStateRequest();}, 15000)
});

function playerStateRequest() {
	$.getJSON(
		jsonSource,
		function (json) {handlePlayerStateRequest(json);}
	);
}

function handlePlayerStateRequest(json) {
	$("#queue-list").empty();
	for (var i in json.playlist) {
		var song = json.playlist[i];
		var entry = templates.queueSong.clone();
		$(".queue-song-title", entry).html(song.title);
		$(".queue-song-artist", entry).html(song.artist);
		entry.appendTo("#queue-list");
	}
}
