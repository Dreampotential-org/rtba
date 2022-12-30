function setup_media(media) {
    $("#player0").html(
        '<video preload="auto" controls="" autoplay="true" name="media"' +
            'id="video" width="100%" height="500">' +
            '<source src="' + SERVER +
            'configs/stream_media?id=' + media.id + '"' +
                 'type="video/mp4">' +
        '</video>'
    );
    play()
}



function set_volume(percentage) {
   $("#video").prop("volume", percentage);
}

function play(percentage) {
    document.getElementById("video").play()
}

function pause(percentage) {
    document.getElementById("video").pause()
}
