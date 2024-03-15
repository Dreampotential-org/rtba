   var selected_music = 1;

   function selectMedia(id){
   let mediaToPlay = 

      $("#player0").html(
        '<div class="priti"><div class="media-list">List of Media...' +items+ '</div> ' + 
       '<div id="music"><div>' +
        '<video preload="auto" controls="" autoplay="true" name="media"' +
            'id="video" width="100%" height="500">' +
            '<source src="' + SERVER +
            'configs/stream_media?id=' + medias[0].id + '"' +
                 'type="video/mp4">' +
        '</video></div>'
    );
    play()
   }

function setup_media(medias) {
        console.log(medias);

   let items = ''
   for(media of medias) {
    // items += '<div><ul><li class="media-li">'+media.name+'</li></ul></div>'
    items += '<div class="media-img-div" onClick="selectMedia('+media.id+')"><div class="img-div"></div><div class="media-name"><h4 class="media-h4">' +media.name+ '</h4><p class="media-p">Discover life changing careers and...</p></div></div>'
   }
console.log(items);
    $("#player0").html(
        '<div class="priti"><div class="media-list">List of Media...' +items+ '</div> ' + 
       '<div id="music"><div>' +
        '<video preload="auto" controls="" autoplay="true" name="media"' +
            'id="video" width="100%" height="500">' +
            '<source src="' + SERVER +
            'configs/stream_media?id=' + medias[0].id + '"' +
                 'type="video/mp4">' +
        '</video></div>'
    );
    play()
 

}



function init_music_events() {

    $("#music button").on("click", function(ev) {
        alert($(this).id)

    })

}


function set_volume(percentage) {
   $("#video").prop("volume", percentage);
}

function play(percentage) {
    document.getElementById("video").play()
}

function pause(percentage) {
    document.getElementById("video").pause()
}





//new added


const songs = ["http://media.w3.org/2010/05/sintel/trailer.mp4", "https://samplelib.com/lib/preview/mp4/sample-15s.mp4"];
  let currentSongIndex = 0;
  const video = document.getElementById("myAudio");

  video.addEventListener("ended", playNextSong);

  function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    video.src = songs[currentSongIndex];



    video.play();
  }

  // Initial play
  video.src = songs[currentSongIndex];
  video.play();


//----


// function setup_media(media) {

   

//     $("#player0").html(
//         '<div class="list-media">List of Media and you...</div>' +
//        '<div id="music"><div>' +
//         '<video preload="auto" controls="" autoplay="true" name="media"' +
//             'id="video" width="100%" height="500">' +
//             '<source src="' + SERVER +
//             'configs/stream_media?id=' + media.id + '"' +
//                  'type="video/mp4">' +
//         '</video>'
//     );
//     play()
//  // XXX we need to make button change the music
//     $("#music").append(
//         "<button id=" + media.id + ">" + media.name + "</button>"
//     )

// }



// function init_music_events() {

//     $("#music button").on("click", function(ev) {
//         alert($(this).id)

//     })

// }


// function set_volume(percentage) {
//    $("#video").prop("volume", percentage);
// }

// function play(percentage) {
//     document.getElementById("video").play()
// }

// function pause(percentage) {
//     document.getElementById("video").pause()
// }
