function setup_media(media) {

    // XXX we need to make button change the music
    $("#music").append(
        "<button id=" + media.id + ">" + media.name + "</button>"
    )

    $("#player0").html(
        '<div>List of Media...</div>' +
        '<video preload="auto" controls="" autoplay="true" name="media"' +
            'id="video" width="100%" height="500">' +
            '<source src="' + SERVER +
            'configs/stream_media?id=' + media.id + '"' +
                 'type="video/mp4">' +
        '</video>'
    );
    play()

}


function init_music_events() {

    $("#music button").on("click", function(ev) {
        alert($(this).id)

    })

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
