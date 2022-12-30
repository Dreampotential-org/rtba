function get_finger_print() {
    const t0 = performance.now();
    const fingerprint = getBrowserFingerprint()
    const t1 = performance.now();
    console.log(fingerprint)
    return fingerprint;
}


function start_session_api(callback) {

    var form = new FormData();
    form.append("device_id", get_finger_print())
    form.append("source", window.location.host);

    $.ajax({
        url: SERVER + "sa/api/start",
        async: true,
        crossDomain: true,
        method: "POST",
        processData: false,
        contentType: false,
        mimeType: "multipart/form-data",
        data: form,
        headers: {
            Authorization: localStorage.getItem('token'),
        },
        success: function (response) {
            console.log("start session response: ", response);
            GLOBAL_SESSION_ID = JSON.parse(response)['session_id']
            callback(JSON.parse(response)['session_id'])
        },
        error: function (err) {
            console.log("start error", err)
        },
    });
}

function session_point(position) {

    // alert("Start")
    POINTS.push({'latitude':  position.coords.latitude,
                 'longitude': position.coords.longitude})
    // $("#debug").text(POINTS)
    var form = new FormData();
    form.append("device_id", get_finger_print())
    form.append("source", window.location.host);
    form.append("latitude", position.coords.latitude);
    form.append("longitude", position.coords.longitude);
    form.append("session_id", GLOBAL_SESSION_ID);
    $.ajax({
        url: SERVER + "sa/api/session_point",
        async: true,
        crossDomain: true,
        method: "POST",
        processData: false,
        contentType: false,
        mimeType: "multipart/form-data",
        data: form,

        headers: {
            Authorization: localStorage.getItem('token'),
        },
        success: function (response) {
            console.log("start response: ", response);
            // alert("Started")

            // get updated distances...
            // get_distances()


        },
        error: function (err) {
            console.log("start error", err)
            // alert("Start error")
        },
    });
}


function get_user_stats(callback) {
    var form = new FormData();
    $.ajax({
        url: SERVER + "sa/api/stats?device_id=" + get_finger_print(),
        async: true,
        crossDomain: true,
        method: "GET",
        processData: false,
        contentType: false,
        mimeType: "multipart/form-data",
        data: form,

        headers: {
            Authorization: localStorage.getItem('token'),
        },
        success: function (resp) {
            console.log("user_stats: ", resp);
            callback(JSON.parse(resp))
        },
        error: function (err) {
            console.log("start error", err)
        },
    });
}



function list_medias(callback) {
    var form = new FormData();
    $.ajax({
        url: SERVER + "configs/list_media",
        async: true,
        crossDomain: true,
        method: "GET",
        processData: false,
        contentType: false,
        mimeType: "multipart/form-data",
        data: form,

        headers: {
            Authorization: localStorage.getItem('token'),
        },
        success: function (resp) {
            console.log("list_medias: ", resp);
            callback(JSON.parse(resp))
        },
        error: function (err) {
            console.log("start error", err)
        },
    });
}


function get_distances() {
    var form = new FormData();
    $.ajax({
        url: SERVER + "sa/api/get_distances",
        async: true,
        crossDomain: true,
        method: "POST",
        processData: false,
        contentType: false,
        mimeType: "multipart/form-data",
        data: form,

        headers: {
            Authorization: localStorage.getItem('token'),
        },
        success: function (resp) {
            console.log("start get_distances(): ", resp);
        },
        error: function (err) {
            console.log("start error", err)
        },
    });
}


function start_polling() {

    interval = setInterval(function() {
        var interval_time = new Date();
        var diffInMilliSeconds = Math.round(
            Math.abs(interval_time - start_session_time) / 1000);
        const diff = timeConvCalc(diffInMilliSeconds);
        a = diff.split(": ");
        const total_time = ((parseInt(a[0]))*60*60) + (
            (parseInt(a[1]))*60) + parseInt(a[2]);

        dist_array.push(data['latitude']);
        dist_array.push(data['longitude']);
        var lat1 = dist_array[0];
        var lon1 = dist_array[1];
        var lat2 = data['latitude'];
        var lon2 = data['longitude'];
        const dista = getDistanceFromLatLonInKm(
            lat1, lon1, lat2, lon2);

        avg_speed = (dista *1000) / total_time;

    }, 1000);
}
