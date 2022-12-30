var GLOBAL_SESSION_ID = null;
function init() {
//    cordova.plugins.backgroundMode.enable();

    start_session_api(function(session) {
        start_gps();
    })


    display_user_stats()

    configure_events()
    list_medias(function(medias) {
        for(var media of medias) {
            console.log(media)
            setup_media(media)
            break
        }
    })
}



var GLOB = null
function display_user_stats() {
    get_user_stats(function(results) {
        GLOB = results;
        console.log("userstats")
        console.log(results)

        var status_text = ""

        for (var i = 0; i < results['user_status'].length; i++ ) {
            alert(result[i])
            console.log(result[i])
            for (var session_stat of results[i]['sessions_stats']) {
                status_text += (
                    "<div>#" + i + " " + session_stat.distance +
                    " points " + session_stat.points + "</div><br>"
                )
            }
        }
        alert(status_text)
        $("#stats").text(status_text)
        //setTimeout(function() {
        //    display_user_stats();
        //})});
    });
}


function configure_events() {
    $("#start").on("click", function(ev) {
        ev.preventDefault();
        signup_api({
            name: 'StarterName',
            email: $("#account").val(),
            password: $("#password").val(),
            days_sober: null,
        });
    })
}



function signup_api(params) {
    if (params.days_sober == null) {
        params.days_sober = "0";
    }
    var form = new FormData();
    form.append("name", params.name);
    form.append("email", params.email);
    form.append("days_sober", params.days_sober);
    form.append("sober_date", null);
    form.append("password", params.password);
    form.append("source", window.location.host);

    var path = window.location.pathname;
    var page = path.split("/").pop();
    form.append("page", page.toLowerCase());

    var settings = {
        async: true,
        crossDomain: true,
        url: SERVER + "api/create-user/",
        method: "POST",
        processData: false,
        contentType: false,
        mimeType: "multipart/form-data",
        data: form,
    };
    $.ajax(settings).done(function (response) {
        if (Object.keys(JSON.parse(response)).includes('token')) {
            localStorage.setItem("session_id",
                                JSON.parse(response).token);
            swal({title: "Good job!",
                  text: "You're logged in",
                  icon: "success",
                 });
        }
    }).fail(function (err) {
        console.log(err);
        swal({
            title: "warning",
            text: "Invalid email or password",
            icon: "warning",
        });
    });
}

function screenlock() {
/*
if ('wakeLock' in navigator) {
  isSupported = true;
  alert('Screen Wake Lock API supported!')

	try {
	  navigator.wakeLock.request('screen');
	  alert('Wake Lock is active!');
	} catch (err) {
	  // The Wake Lock request has failed - usually system related, such as battery.
	}
} else {
  wakeButton.disabled = true;
  alert('Wake lock is not supported by this browser.')
}
*/
}

window.addEventListener('DOMContentLoaded', init, false);



