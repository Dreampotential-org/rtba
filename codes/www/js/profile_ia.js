function init() {
    configure_events()
}


function configure_events() {
    $("#start").on("click", function(ev) {
        ev.preventDefault();

        var body = {
            name: items[0].value,
            email: items[1].value,
            password: items[2].value,
        };

        $.ajax({
            url: SERVER + "profile/user/register/",
            type: "post",
            data: $(this).serialize(),
            success: function(response) {
                console.log(response);
                loginResponse = response;
                localStorage.setItem("user-token", response.token);

                swal({
                    title: "Welcome " + response.user.name + "!",
                    text: "Your account is created.",
                    icon: "success",
                    buttons: false,
                    timer: 1000,
                });




            },
            error: function(err) {
                swal({
                    title: "Error",
                    text: err.responseJSON.msg,
                    icon: "error",
                });
            },
        });
    });

    $("#loginForm").on("submit", function(ev) {
        ev.preventDefault();
        swal({
            title: "Signing In!",
            icon: "success",
            buttons: false,
        });

        $.ajax({
            url: SERVER + "profile/user/login",
            type: "post",
            async: true,
            crossDomain: true,
            crossOrigin: true,
            data: $(this).serialize(),
            success: function(response) {
                // Whatever you want to do after the form is successfully submitted
                loginResponse = response;
                localStorage.setItem("user-token", response.token);

                swal({
                    title: "Welcome " + response.user.name + "!",
                    text: "You are logged in.",
                    icon: "success",
                    buttons: false,
                    timer: 1000,
                });

                // displayPage("dashboard");
                window.curr_user = response.user;
                //if(response.is_teacher)
                // else
            },
            error: function(e) {
                swal({
                    title: "Error",
                    text: e.responseJSON.msg||"",
                    icon: "error",
                });
            },
        });
    });

}

window.addEventListener('DOMContentLoaded', init, false);
