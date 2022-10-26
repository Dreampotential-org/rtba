function init() {
    configure_events()

    const t0 = performance.now();
    const fingerprint = getBrowserFingerprint({
        enableWebgl: true, debug: true });
    const t1 = performance.now();
    console.log(fingerprint)

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

window.addEventListener('DOMContentLoaded', init, false);
