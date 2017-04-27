// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

class Entry {

    constructor() {
        this._videoPlayer = document.querySelector("#videoPlayer");
        this._statusBar = document.querySelector("#statusBar");

        this.windowResizeHandler();

        this.addListeners();
    }

    addListeners() {
        window.onresize = this.windowResizeHandler.bind(this);

        document.body.ondragover = e => e.preventDefault();
        document.body.ondrop = e => {
            e.preventDefault();
            let file = e.dataTransfer.files[0];

            switch (file.type) {
                case "video/webm":
                case "video/mp4":
                    this.playVideo(file);
                    break;
            }
        };

        this._videoPlayer.onloadedmetadata = () => {
            console.log(this._videoPlayer.duration);
        };
    }

    windowResizeHandler() {
        this._videoPlayer.width = window.innerWidth;
        this._videoPlayer.height = window.innerHeight;
    }

    playVideo(file) {
        document.title = file.name;
        this._videoPlayer.src = "file://" + file.path;
    }
}

new Entry();