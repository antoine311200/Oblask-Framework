var playlist: Oblask.Audio.Playlist;

class SetupBehavior extends Sup.Behavior {
  
  //Awake method call on load
  awake() {
    
    //Create a playlist with tree sounds
    playlist = new Oblask.Audio.Playlist([
      "Audio/Theme 1", 
      "Audio/Theme 2", 
      "Audio/Theme 3"
    ]);
  }
  
  //Update method call 60 times per second (default)
  update() {
    if(Sup.Input.wasKeyJustPressed("A")) {
      //Play the first sound "Audio/Theme 1"
      playlist.play(0);
    }
    
    if(Sup.Input.wasKeyJustPressed("Z")) {
      //Stop the first sound and play "Audio/Theme 2" and "Audio/Theme 3"
      playlist.stop(0);
      playlist.play([1, 2], true));
    }
  }
  
}
