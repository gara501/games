export default class Sound {
  constructor (src, loop = false) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.isLoop = loop;
    console.log(src, loop);

    document.body.appendChild(this.sound);

    this.play = () => {
        this.sound.play();
    }
    
    this.stop = () => {
        this.sound.pause();
    }
    
    this.reset = () => {
      this.sound.pause();
			this.sound.currentTime = 0;
    }
    let scope = this;
    this.sound.addEventListener('ended', (ev) => {
      console.log('ENDED', this.isLoop);
      this.reset();
      if (this.isLoop) {
        this.sound.play();
      }
    });

  }
}