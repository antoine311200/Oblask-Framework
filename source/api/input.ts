namespace Oblask{
  export namespace Input {
    
    export class Key {
      
      key: string;
      down: Function;
      pressed: Function;
      released: Function;
    
      isDown: boolean;
      isPressed: boolean;
      isReleased: boolean;
    
      isAllow: boolean;
      
      constructor(key: string, down?: Function,  pressed?: Function, released?: Function) {
        this.key = key;
        this.down = down          || function() { return false };
        this.pressed = pressed    || function() { return false };
        this.released = released  || function() { return false };
        
        this.isDown = false;
        this.isPressed = false;
        this.isReleased = false;
        
        this.isAllow = true;
      }
    
      update() {
        if(this.isAllow) {
          this.onKeyDown();
          this.onKeyPressed();
          this.onKeyReleased();
        }
      }
    
      setKeyDown(down: Function) {
        this.down = down;
      }
    
      onKeyDown(condition?: Function) {
        let func = condition;
        if(func === undefined) {
          if(Sup.Input.isKeyDown(this.key)) {
            this.down();
          }
        }
        else {
          if(func()) {
            if(Sup.Input.isKeyDown(this.key)) {
              this.down();
            }
          }
        }
      }
                
      setKeyPressed(pressed: Function) {
        this.pressed = pressed;
      }
    
      onKeyPressed(condition?: Function) {
        let func = condition;
        if(func === undefined) {
          if(Sup.Input.wasKeyJustPressed(this.key)) {
            this.isPressed = true;
            this.pressed();
          }
          else if(Sup.Input.wasKeyJustReleased(this.key)) {
            this.isPressed = false;
          }
        }
        else {
          if(func()) {
            if(Sup.Input.wasKeyJustPressed(this.key)) {
              this.pressed();
            }
          }
        }
      }
                
      setKeyReleased(released: Function) {
        this.released = released;
      }
    
      onKeyReleased(condition?: Function) {
        let func = condition;
        if(func === undefined) {
          if(Sup.Input.wasKeyJustReleased(this.key)) {
            this.released();
          }
        }
        else {
          if(func()) {
            if(Sup.Input.wasKeyJustReleased(this.key)) {
              this.released();
            }
          }
        }
      }
    }
    
    export class KeyPackage {
      
      keys: Key[];
      down: Function[];
      pressed: Function[];
      released: Function[];
    
      isDown: boolean[];
      isPressed: boolean[];
      isReleased: boolean[];
                    
      constructor(keys: Key[]) {
        this.keys = keys;
        this.down = [];
        this.pressed = [];
        this.released = [];
        this.isDown = [];
        this.isPressed = [];
        this.isReleased = [];
        
        for(let key in keys) {
          this.down.push(keys[key].down);
          this.pressed.push(keys[key].pressed);
          this.released.push(keys[key].released);
          this.isDown.push(keys[key].isDown);
          this.isPressed.push(keys[key].isPressed);
          this.isReleased.push(keys[key].isReleased);
        }
      }
    
      update() {
        for(let key in this.keys) {
          this.keys[key].update();
        }
      }
    
      add(key: Key) {
        this.down.push(key.down);
        this.pressed.push(key.pressed);
        this.released.push(key.released);
        this.isDown.push(key.isDown);
        this.isPressed.push(key.isPressed);
        this.isReleased.push(key.isReleased);
      }
    
      addMultiples(keys: Key[]) {
        for(let key in keys) {
          this.down.push(keys[key].down);
          this.pressed.push(keys[key].pressed);
          this.released.push(keys[key].released);
          this.isDown.push(keys[key].isDown);
          this.isPressed.push(keys[key].isPressed);
          this.isReleased.push(keys[key].isReleased);
        }
      }
      
      remove(index: number) {
        delete this.keys[index], this.down[index], this.pressed[index], this.released[index], this.isDown[index], this.isPressed[index], this.isReleased[index];
      }

      removeAll() {
        for(let index in this.keys) {
        delete this.keys[index], this.down[index], this.pressed[index], this.released[index], this.isDown[index], this.isPressed[index], this.isReleased[index];
        }
      }
    }
  }
}
