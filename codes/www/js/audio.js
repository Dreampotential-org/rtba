function set_volume(percentage) {
   $("#video").prop("volume", percentage);
}

function play(percentage) {
    document.getElementById("video").play()
}

function pause(percentage) {
    document.getElementById("video").pause()
}
