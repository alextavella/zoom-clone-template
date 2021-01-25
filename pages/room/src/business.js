class Business {
  constructor({ media, room, view, socketBuilder }) {
    this.media = media;
    this.room = room;
    this.view = view;

    this.socketBuilder = socketBuilder
      .setUserConnected(this.onUserConnected())
      .setUserDisconnected(this.onUserDisconnected())
      .build();

    this.socketBuilder.emit("join-room", this.room, "teste-01");

    this.currentStream = {};
  }

  static initialize(deps) {
    const instance = new Business(deps);
    return instance._init();
  }

  async _init() {
    this.currentStream = await this.media.getCamera();
    this.addVideoStream("test-01");
  }

  addVideoStream(userId, stream = this.currentStream) {
    const isCurrentId = false;
    this.view.renderVideo({
      userId,
      stream,
      isCurrentId,
    });
  }

  onUserConnected = () => {
    return (userId) => {
      console.log("user connected", userId);
    };
  };

  onUserDisconnected = () => {
    return (userId) => {
      console.log("user disconnected", userId);
    };
  };
}
