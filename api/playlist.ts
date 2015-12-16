class Playlist {
  
  private sounds: Sup.Audio.SoundPlayer[];

  constructor(sounds: Sup.Audio.SoundPlayer[]) {
    this.sounds = sounds;
    
    Sup.log(this.sounds);
  }
  
  play(index: number) {
    let i = index;
    if(typeof i == "number") {
      for(let sound in this.sounds) {
        if(this.sounds[sound] != sound) {
          if(this.sounds[sound] != null) this.sounds[sound].stop();
          else Sup.log("Index error: index is empty");
        }
      }
      if(this.sounds[i] != null) this.sounds[index].play();
      else Sup.log("Index error: index is empty");
    }
  }
  
  stop(index?: number) {
    let i = index;
    if(i != null) {
      if(this.sounds[i] != null) this.sounds[index].stop();
      else Sup.log("Index error: index is empty");
    }
    else {
      for(let sound in this.sounds) {
        if(this.sounds[sound] != null) this.sounds[sound].stop();
        else Sup.log("Index error: index is empty");
      }
    }
  }
       
  add(sound: Sup.Audio.SoundPlayer) {
    this.sounds[this.sounds.length] = sound;
  }

  remove(index: string) {
    delete this.sounds[index];
  }
}
