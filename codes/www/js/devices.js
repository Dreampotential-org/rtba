function init_devices() {
    get_session_stats(function(devices) {
        for(var device of devices) {
            console.log(device)

            $("#devices").append(
                "<div><b>Device ID:</b>" + device.key + " <div>" +
                "<div><b>Last Seen:</b>" +
                    device.last_seen_readable + " <div>"
            )

            for(var session of device['sessions']) {
                $("#devices").append(
                    "<div><b>Session ID:</b>" + session.id + " <div>" +
                    "<div><b>Started At:</b>" + session.start + " <div>" +
                    "<div class='mapp' id='mia" + session.id + "'><div>")

                var first = true
                var selector = "mia" + session.id
                for(var dot of session['sps']) {
                    add_point(selector, dot, first)
                    first = false
                }
            }
        }
    })
}


function get_session_stats(callback) {

    var form = new FormData();
    form.append("source", window.location.host);

    $.ajax({
        url: SERVER + "ashe/devices",
        async: true,
        crossDomain: true,
        method: "GET",
        processData: false,
        contentType: false,
        mimeType: "multipart/form-data",
        data: form,
        success: function (response) {
            console.log("getting devices ", response);
            callback(JSON.parse(response))

        },
        error: function (err) {
            console.log("start error", err)
        },
    });
}



window.addEventListener('DOMContentLoaded', init_devices, false);
