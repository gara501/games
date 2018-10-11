import Sound from './sound.js';

export default class Sounds {
  constructor () {
    this.sounds = {
      back: './assets/sounds/back.mp3',
      hit: './assets/sounds/hit.wav',
      win: './assets/sounds/win.wav',
      fail: './assets/sounds/fail.mp3',
      intro: './assets/sounds/intro.wav'
    };
  }

  createSound(name, loop = false) {
    let backSound;
    switch (name) {
      case 'intro':
        backSound = new Sound(this.sounds.intro, loop);
        break;
      case 'back':
        backSound = new Sound(this.sounds.back, loop);
        break;
      case 'hit':
        backSound = new Sound(this.sounds.hit, loop);
        break;
      case 'fail':
        backSound = new Sound(this.sounds.fail, loop);
        break;
      case 'win':
        backSound = new Sound(this.sounds.win, loop);
        break;
      default:
        break;
    }

    return backSound;
  }
}