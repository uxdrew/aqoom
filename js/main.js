const postImageButton = document.querySelector("#post-image");

const video = document.getElementById('capture');
var imageCapture;

  const videoConstraints = {
    facingMode: 'environment'
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
  })
  .catch(error => {
    console.error(error);
  });