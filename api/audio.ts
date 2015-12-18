namespace Oblask {
  export namespace Audio {
    export class Playlist {
  
      private sounds: Sup.Audio.SoundPlayer[];

      constructor(sounds: Sup.Audio.SoundPlayer[]) {
        this.sounds = sounds;

        Sup.log(this.sounds);
      }

      play(index: any, replay?: boolean) {
        if(typeof index == "number") {
          for(let sound in this.sounds) {
            if(!replay) {
              if(sound != index) {
                if(this.sounds[sound] != null) this.sounds[sound].stop();
                else Sup.log("Index error: index is empty");
              }
            }
            else {
              if(this.sounds[sound] != null) this.sounds[sound].stop();
              else Sup.log("Index error: index is empty");
            }
          }
          if(this.sounds[index] != null) this.sounds[index].play();
          else Sup.log("Index error: index is empty");
        }
        else {
          for(let sound in this.sounds) {
            for(let i in index) {
              if(!replay) {
                if(sound != index[i]) {
                  if(this.sounds[index[i]] != null) this.sounds[index[i]].stop();
                  else Sup.log("Index error: index is empty");
                }
              }
              else {
                if(this.sounds[index[i]] != null) this.sounds[index[i]].stop();
                else Sup.log("Index error: index is empty");
              }
            }
          }
          for(let i in index) {
            Sup.log(index[i]);
            if(this.sounds[index[i]] != null) this.sounds[index[i]].play();
            else Sup.log("Index error: index is empty");
          }
        }
      }
    
      playAll() {
        let list = [];
        for(let sound in this.sounds) list.push(sound);
        this.play(list, true);
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

      pause(index?: number) {
        let i = index;
        if(i != null) {
          if(this.sounds[i] != null) this.sounds[index].pause();
          else Sup.log("Index error: index is empty");
        }
        else {
          for(let sound in this.sounds) {
            if(this.sounds[sound] != null) this.sounds[sound].pause();
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

      isPlaying(index?: number) {
        if(index != null) {
          if(this.sounds[index].isPlaying()) return true;
          else return false;
        }
        else {
          for(let sound in this.sounds) {
            if(this.sounds[sound].isPlaying()) return true;
          }
          return false;
        }
      }
    }
  }
}
