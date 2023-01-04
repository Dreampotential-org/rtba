var geocoder;
var map;
var lastCoordinates = [];
var count = 0;
var polyline = new google.maps.Polyline({
   // set desired options for color width
   strokeColor:"#0000FF",  // blue (RRGGBB, R=red, G=green, B=blue)
   strokeOpacity: 0.4      // opacity of line
}); // create the polyline (global)
var path = []; // global variable to hold all the past locations

function initialize() {
    map = new google.maps.Map(


    get_user_stats(function(results) {
        for(var result of results) {

        }

    })
    document.getElementById("map_canvas"), {
        center: new google.maps.LatLng(37.4419, -122.1419),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    setInterval(gotdata, 1000);

}
google.maps.event.addDomListener(window, "load", initialize);

function gotdata() {

    // if (xmlhttp.readyState == 4){
    count++;
    // var d = xmlhttp.responseXML.documentElement
    //innerHTML shouldn't work for XML-Nodes
    y = count * 0.01; // d.getElementsByTagName("y")[0].textContent,
    x = count * 0.01; //d.getElementsByTagName("x")[0].textContent,
    h = [x, y].join('_');
    if (lastCoordinates[h]) {
        return;
    }

    lastCoordinates[h] = new google.maps.Marker({
        position: new google.maps.LatLng(x, y),
        map: map,
        title: 'YAY'
    });
    map.panTo(lastCoordinates[h].getPosition());
    path.push(lastCoordinates[h].getPosition());
    if (path.length >= 2) {
        // display the polyline once it has more than one point
        polyline.setMap(map);
        polyline.setPath(path);
    }
    // }
}
