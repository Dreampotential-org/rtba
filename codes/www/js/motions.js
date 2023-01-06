var MOTIONS = []
var motions_sync_count = 0;
function init_motions() {
    if (isApp()) {
        navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
    }
}
function onSuccess(acceleration) {
    alert('Acceleration X: ' + acceleration.x + '\n' +
          'Acceleration Y: ' + acceleration.y + '\n' +
          'Acceleration Z: ' + acceleration.z + '\n' +
          'Timestamp: '      + acceleration.timestamp + '\n');


    MOTIONS.append({'x': acceleration.x,
                    'y':  acceleration.y,
                    'z':  acceleration.z,
                    'device_timetamp': acceleration.timestamp})

}


function sync_motions() {

    // copy from MOTIONS from motions_sync_count to some thrushhold

    // update motions_sync_count to max_motions to sync

    // sync_motions_api(motions_syncing)

}


function snyc_motions_api(sync_motions) {
    var form = new FormData();
    form.append("device_id", get_finger_print())
    form.append("source", window.location.host);

    $.ajax({
        url: SERVER + "sa/api/bulk_sync_motions",
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
            console.log("bulk_sync_motions response: ", response);
            callback(JSON.parse(response))
        },
        error: function (err) {
            console.log("start error", err)
        },
    });
}

function onError() {
    alert('onError!');
}
