var CURRENT_POSITION = null;

function init_session() {
    start_gps();

    $("body").delegate("#start_session", "click", function(e) {
        $("#start_session").hide();
        $("#stop_session").show();
        $('#distance').html('');
        $('#livedata').html('');

        var start_session_time = new Date();
        const out = document.getElementById("livedata");

    });

    $("body").delegate("#stop_session", "click", function(e) {
          $("#start_session").show();
          $("#stop_session").hide();
          clearInterval(interval);
    })
}


function geo_success(position) {
    /*
    let acm = new Accelerometer({frequency: 60});
    acm.addEventListener('reading', () => {
        console.log("Acceleration along the X-axis " + acl.x);
        console.log("Acceleration along the Y-axis " + acl.y);
        console.log("Acceleration along the Z-axis " + acl.z);
    });
    console.log("start ", acm);
    acm.start();
    */
}

window.addEventListener("DOMContentLoaded", init_session, false);
