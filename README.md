# Oblask-API-for-Superpowers
This is my API to develop projects on Superpowers with many classes which allow to have a better code (create a good UI, playlist management...)

 # Audio
This namespace allows to do some actions related to the **Audio**.
## Playlist
It's a class to create and manage playlist, you can use it very easily.
###constructor(sounds: Sup.Audio.SoundPlayer[])
The class constructor takes one parameter which is a list of SoundPlayer in Superpowers Audio API.

```typescript
let mySounds = [
   new Sup.Audio.SoundPlayer("your sound 1"), 
   new Sup.Audio.SoundPlayer("your sound 2")
];
let myPlaylist = new Oblask.Audio.Playlist(mySounds);
```

###play(index: number | number[], loop?: boolean)
This method has two parameters including one optional. The index parameter allows to play the index of the sound register in the variable or a list of index which will be played and the second one, to loop the sound and restart it at each new play method of this index.

```typescript
//Variable mysounds refers to the variable above
let myPlaylist = new Oblask.Audio.Playlist(mySounds); 

//Play the first sound in the list ("your sound 1")
myPlaylist.play(0);

//Play the second one with the loop boolean to reset it at each call.
myPlaylist.play(1, true);

//Play the two sounds in the same time.
myPlaylist.play([0, 1]);
```

###pause(index?: number)
There is one optional parameter which allows to stop one sound in particular in the playlist but if it is null all the sound played are paused.

```typescript
//[...] Initialization of the variable above
myPlaylist.play(0);

//If left click is pressed the sound at index 0 is paused
if(Sup.Input.wasMouseButtonJustPressed(0)) {
   myPlaylist.paused(0);
}
```

###stop(index?: number)
Such as the pause method but, in this case, will be stop the sound(s).

```typescript
//[...] Initialization of the variable above

//Play the two sounds at index 0 and 1
myPlaylist.play([0, 1], true);

//Stop only the index 1 so the 0 will be continue to be played
myPlaylist.stop(1);
```

###playAll()
A method which allows to play all the sounds of a playlist in the same time. More practicle than put each index of each sounds in an array and put this array in a play method.

```typescript
/*Imagine you have a playlist "myPlaylist" which contains 50 sounds
instead of put all of the =m in a list with a for loop you can use the playAll method*/

//The 50 sounds will be played together
myPlaylist.playAll();
```

###add(sound: Sup.Audio.SoundPlayer)
Add a sound at the end of the list of sound of your playlist.

```typescript
//[...] Initialization...

myPlaylist.add(new Sup.Audio.SoundPlayer("sound special"));

let sound = new Sup.Audio.SoundPlayer("one more sound")
myPlaylist.add(sound);
```

###remove(index: number)
For the delete one sound. 
**WARNING :** If you delete one index be careful to not use it again. (Do yet fix)
