function start(data) {
    $.ajax({
        url: SERVER + "sa/api/start",
        async: true,
        crossDomain: true,
        type: "POST",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        processData: false,
        headers: {
            Authorization: localStorage.getItem('token'),
        },
        success: function (response) {
            console.log("start session response: ", response);
        },
        error: function (err) {
            console.log("start error", err)
        },
    });
}

function session_point(data) {
    $.ajax({
        url: SERVER + "sa/api/session_point",
        async: true,
        crossDomain: true,
        type: "POST",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        processData: false,
        headers: {
            Authorization: localStorage.getItem('token'),
        },
        success: function (response) {
            console.log("start response: ", response);
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
