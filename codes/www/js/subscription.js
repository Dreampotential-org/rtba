function init_subscription() {

    console.log("Sanity check!");
    var subscription_data = null;
    var stripe = null;
    settings = get_settings_checkout("config/", "GET");
    $.ajax(settings).done(function(response) {
        data = JSON.parse(response);
        stripe = Stripe(data.publicKey);

        settings = get_settings_checkout(
            "retrieve-device-subscription/" + get_finger_print(), "GET")
        $.ajax(settings).done(function(response) {
            subscription_data = JSON.parse(response);
            console.log("HEre is my subscription status:" + subscription_data)
        }).then((res) => {
            return res
        });

    });
    $(".agentstat-login").click(function() {
    // if person is not active in their accout ask them to signup
        if (subscription_data) {
            settings = get_settings_checkout("create-checkout-session/", "GET")
            $.ajax(settings).done(function(response) {
                console.log("Data", data)
                data_session = JSON.parse(response);

                // Redirect to Stripe Chaeckout
                stripe = Stripe(data.publicKey);
                console.log("stripe", stripe)
                return stripe.redirectToCheckout({
                    sessionId: data_session.sessionId
                })
            }).then((res) => {
                console.log(res);
            });
        }
    })
}
