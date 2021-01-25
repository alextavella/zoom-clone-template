const recordClick = function (recorderBtn) {
  this.recordingEnabled = false;
  return () => {
    this.recordingEnabled = !this.recordingEnabled;
    recorderBtn.style.color = this.recordingEnabled ? "red" : "white";
  };
};

const onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const room = urlParams.get("room");
  console.log(
    "this is https://media.giphy.com/media/xjx79TeJd0RKK9rsp7/giphy.gifthe room",
    room
  );

  // const recorderBtn = document.getElementById("record");
  // recorderBtn.addEventListener("click", recordClick(recorderBtn));

  const socketUrl = "http://localhost:3333";
  const socketBuilder = new SocketBuilder({ socketUrl });

  const view = new View();
  const media = new Media();
  const deps = {
    media,
    room,
    view,
    socketBuilder,
  };

  Business.initialize(deps);
};

window.onload = onload;
