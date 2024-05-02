function populatePage() {
    var id=4
    $("#video").html(
        '<video controls autoplay style="width:95%;height:95%">' +
            "<source src='" + SERVER + 'storage/stream?id=' + id + "'" +
            ' type="video/mp4">' +
        '</video>')
}

window.addEventListener('DOMContentLoaded', populatePage, false);
