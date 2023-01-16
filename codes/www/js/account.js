window.addEventListener('DOMContentLoaded', configure_account_events, false);

function configure_account_events() {
    $("#new_account_create").on("click", function(ev) {
        ev.preventDefault();
        signup_api({
            name: $('#account_name').val(),
            email: $("#new_account_email").val(),
            password: $("#new_account_password").val(),
        });
    })

    $("#account_login").on("click", function(ev) {
        ev.preventDefault();
        login_api({
            email: $("#account_email").val(),
            password: $("#account_password").val(),
        });
    })



}




function signup_api(params) {
    var form = new FormData();
    form.append("name", params.name);
    form.append("email", params.email);
    form.append("password", params.password);
    form.append("source", window.location.host);

    var path = window.location.pathname;
    var page = path.split("/").pop();
    form.append("page", page.toLowerCase());

    var settings = {
        async: true,
        crossDomain: true,
        url: SERVER + "configs/create-user",
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
            swal({
                title: "Good job!",
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


function login_api(params) {
    var form = new FormData();
    form.append("email", params.email);
    form.append("password", params.password);
    form.append("source", window.location.host);

    var path = window.location.pathname;
    var page = path.split("/").pop();
    form.append("page", page.toLowerCase());

    var settings = {
        async: true,
        crossDomain: true,
        url: SERVER + "configs/login-user",
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
            swal({
                title: "Good job!",
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
