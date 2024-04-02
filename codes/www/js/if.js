function displayfile(file) {
    console.log(file)
    $("#result").append(
        "<a href='" + SERVER + "storage/stream?id=" +
            file.id + "'>" + file.filename + "</a>"
    )
}

function init() {
    start_session_api(function(sessionid) {
        getfiles(function(files) {
            console.log("Files");
            for(var file of files) {
                displayfile(file)
            }
        })
    })

  $("#upload").on("change", function (e) {
    e.preventDefault();

    // XXX TODO make working with mu
    var file = e.target.files[0];
    GLOBAL_FILE = file;
    $("#upload_vid_form").submit();
    console.log({
      title: "0%",
      text: "Video uploading please wait.",
      icon: "info",
      buttons: false,
      closeOnEsc: false,
      closeOnClickOutside: false,
    });
  });


  $("#submit").click(function (e) {
    e.preventDefault();
    var data = new FormData();
    data.append("file", GLOBAL_FILE, GLOBAL_FILE.name);
    data.append("source", window.location.host);

    var xhr = new XMLHttpRequest();

    // make working with mutiple
    function updateProgress(e) {
      if (e.lengthComputable) {
        console.log(e.loaded);
        console.log(e.loaded + " / " + e.total);
      }
    }

    console.log({
      title: "0%",
      text: "Video uploading please wait.",
      icon: "info",
      buttons: false,
      closeOnEsc: false,
      closeOnClickOutside: false,
    });

    xhr.upload.addEventListener("progress", updateProgress, false);
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this)
        if (this.status == 200) {
            var uploadid = JSON.parse(this.response)['id']
            $("#result").append(SERVER + "storage/stream?id=" + uploadid)
          console.log({
            title: "Good job!",
            text: "Video submitted successfully!",
            icon: "success",
          });
        } else {
          console.log({
            title: "Error Try Again",
            text: "Sorry, there is an error please try again later.",
            icon: "error",
            buttons: [true, "Retry"],
          }).then((retry) => {
            if (retry) {
              $("#upload").submit();
            }
          });
        }
      }
    });
    xhr.open("POST", SERVER + "storage/fileupload/");
    xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
    xhr.send(data);
  });
}

window.addEventListener('DOMContentLoaded', init, false);
