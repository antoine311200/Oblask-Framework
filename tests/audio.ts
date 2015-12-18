var playlist: Oblask.Audio.Playlist;

class SetupBehavior extends Sup.Behavior {
  
  awake() {
    playlist = new Oblask.Audio.Playlist([
      new Sup.Audio.SoundPlayer("Audio/Theme 1"), 
      new Sup.Audio.SoundPlayer("Audio/Theme 2"), 
      new Sup.Audio.SoundPlayer("Audio/Theme 3")
    ]);
  }
  
  update() {
    if(Sup.Input.wasKeyJustPressed("A")) {
      playlist.play(0);
    }
  }
  
}
