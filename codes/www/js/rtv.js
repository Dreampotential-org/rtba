function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}


function populatePage() {
    var query = getQueryParams(document.location.search);
    if (!(query.id)) { 
    	var id = 4 
    }
    else {
    	var id = query.id
    }
	 
    $("#video").html(
        '<video controls autoplay style="width:95%;height:95%">' +
            "<source src='" + SERVER + 'storage/stream_media?id=' + id + "'" +
            ' type="video/mp4">' +
        '</video>')


	getMedia(function(medias) { 
		for(var media of medias) {
			$("#result").append(
				"<div><a href=/?id=" + media.id + ">" +
					media.title +
				"</a> " + media.description + "</div>")
		}
	})
}




window.addEventListener('DOMContentLoaded', populatePage, false);
