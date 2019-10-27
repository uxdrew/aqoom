(function() {
  // The width and height of the captured photo. We will set the
  // width to the value defined here, but the height will be
  // calculated based on the aspect ratio of the input stream.

  var width = 1024; // We will scale the photo width to this
  var height = 0; // This will be computed based on the input stream

  // |streaming| indicates whether or not we're currently streaming
  // video from the camera. Obviously, we start at false.

  var streaming = false;

  var video = null;
  var canvas = null;
  var photo = null;
  var imageCapture = null;
  var previewbutton = null;
  var postbutton = null;

  function startup() {
    video = document.getElementById("capture");
    canvas = document.getElementById("canvas");
    photo = document.getElementById("photo");
    previewbutton = document.getElementById("previewbutton");
    postbutton = document.getElementById("postimage");

    const videoConstraints = {
      facingMode: "environment"
    };
    const constraints = {
      video: videoConstraints,
      audio: false
    };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(stream => {
        video.srcObject = stream;
        let mediaStreamTrack = stream.getVideoTracks()[0];
        imageCapture = new ImageCapture(mediaStreamTrack);
        video.play();
      })
      .catch(error => {
        console.error(error);
      });

    // video.addEventListener(
    //   "canplay",
    //   function(ev) {
    //     if (!streaming) {
    //       height = video.videoHeight / (video.videoWidth / width);

    //       // Firefox currently has a bug where the height can't be read from
    //       // the video, so we will make assumptions if this happens.

    //       if (isNaN(height)) {
    //         height = width / (4 / 3);
    //       }

    //       video.setAttribute("width", width);
    //       video.setAttribute("height", height);
    //       canvas.setAttribute("width", width);
    //       canvas.setAttribute("height", height);
    //       streaming = true;
    //     }
    //   },
    //   false
    // );

    // previewbutton.addEventListener(
    //   "click",
    //   function(ev) {
    //     takepicture();
    //     ev.preventDefault();
    //     window.location.href = "scan-results.html";
    //   },
    //   false
    // );

    postbutton.addEventListener(
      "click",
      function(ev) {
        var img = takepicture();
        ev.preventDefault();
        postpicture(img);
        //ev.preventDefault();
        setTimeout(function() {
          window.location.href = "scan-results.html";
        }, 2000);

        //return false;
      },
      false
    );
  }

  // Fill the photo with an indication that none has been
  // captured.

  function clearphoto() {
    var context = canvas.getContext("2d");
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL("image/png");
    photo.setAttribute("src", data);
  }

  // Capture a photo by fetching the current contents of the video
  // and drawing it into a canvas, then converting that to a PNG
  // format data URL. By drawing it on an offscreen canvas and then
  // drawing that to the screen, we can change its size and/or apply
  // other changes before drawing it.

  function takepicture() {
    var context = canvas.getContext("2d");
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);

      var data = canvas.toDataURL("image/png");
      photo.setAttribute("src", data);

      return data;
    } else {
      clearphoto();
    }
  }

  function postpicture(img) {
    var request = new XMLHttpRequest();
    //request.open("POST", "http://localhost:9000/submitreceipt", true);
     request.open("POST", "/.netlify/functions/submitreceipt", true);
    var data = new FormData();
    data.append("image", img);
    request.send(data);
    request.onload = function() {
      if (request.readyState == XMLHttpRequest.DONE) {
        //alert(request.responseText);
        return false;
      }
    };
  }

  window.addEventListener("load", startup, false);
})();
