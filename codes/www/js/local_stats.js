var POINTS = []
function session_point(position)  {
    point = {'latitude':  position.coords.latitude,
             'longitude': position.coords.longitude}

    POINTS.push(point)

    if (POINTS.length == 1) {
        init_map(POINTS[0])
    } else {
        add_point(point)
    }
}

function get_distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = (Math.sin(radlat1) * Math.sin(radlat2) +
                    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta));
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        return dist;
    }
}


function get_local_stats() {
    var distance = 0;
    for (var i = 0; i < POINTS.length -1; i++) {
        distance += get_distance(
            POINTS[i].latitude, POINTS[i].longitude,
            POINTS[i + 1 ].latitude, POINTS[i +1].longitude
        )
    }
    console.log({distance});
    console.log({POINTS});
}

