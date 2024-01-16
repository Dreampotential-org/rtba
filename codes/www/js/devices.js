function init_devices() {
    get_session_stats(function(devices) {
        for(var device of devices) {
            console.log(device)
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
