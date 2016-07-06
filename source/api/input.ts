namespace Oblask{
  export namespace Input {
    
    export enum Mouse {
      Left,
      Middle,
      Right,
      ScrollUp = 5,
      ScrollDown
    }
    
    export enum GamepadButtons {
      A,
      B,
      X,
      Y,
      LeftShoulder,
      RightShoulder,
      LeftTrigger,
      RightTrigger,
      Back,
      Start,
      LeftAxis,
      RightAxis,
      Up,
      Down,
      Left,
      Right,
      Xbox
    }
    
    export enum GamepadAxis {
      LeftAxisX,
      LeftAxisY,
      RightAxisX,
      RigthAxisY
    }
    
    export enum Keys {
      ZERO, ONE, TWO, THREE, FOUR, FIVE, SEVEN, HEIGHT, NINE, 
      A,Z,E,R,T,Y,U,I,O,P,Q,S,D,F,G,H,J,K,L,M,W,X,C,V,B,N,
      CANCEL, HELP, BACK_SPACE, TAB, CLEAR, RETURN, SHIFT, CONTROL, ALT,
      PAUSE, CAPS_LOCK, ESCAPE, SPACE, PAGE_UP, PAGE_DOWN, END, HOME,
      LEFT, UP, RIGHT, DOWN, PRINTSCREEN, INSERT, DELETE,
      SEMICOLON, EQUALS,     
      CONTEXT_MENU, NUMPAD0, NUMPAD1, NUMPAD2, NUMPAD3, NUMPAD4, NUMPAD5, NUMPAD6, NUMPAD7, NUMPAD8 ,NUMPAD9,
      MULTIPLY, ADD, SEPARATOR, SUBTRACT, DECIMAL, DIVIDE,
      F1, F2 ,F3 ,F4 ,F5 ,F6 ,F7 ,F8 ,F9 ,F10, F11 ,F12 ,F13 ,F14 ,F15 ,F16 ,F17 ,F18 ,F19 ,F20 ,F21 ,F22 ,F23, F24, NUM_LOCK, SCROLL_LOCK, COMMA, PERIOD, SLASH, BACK_QUOTE,
      OPEN_BRACKET, BACK_SLASH, CLOSE_BRACKET, QUOTE, META
    }
    
    export function keysDown(...keys: any[]): boolean {
      const values: boolean[] = [];
      if(typeof keys[0][0] == "number") {
        for(let i = 0; i < keys[0].length; i++) {
          values[i] = Sup.Input.isKeyDown(Keys[keys[0][i]]);
        }
      }
      else {
        for(let i = 0; i < keys.length; i++) {
          values[i] = Sup.Input.isKeyDown(Keys[keys[i]]);
        }
      }
      return values.every(elem => elem === true);
    }
    
    export function keysPressed(...keys: any[]): boolean {
      const values: boolean[] = [];
      if(typeof keys[0][0] == "number") {
        for(let i = 0; i < keys[0].length; i++) {
          values[i] = Sup.Input.wasKeyJustPressed(Keys[keys[0][i]]);
        }
      }
      else {
        for(let i = 0; i < keys.length; i++) {
          values[i] = Sup.Input.wasKeyJustPressed(Keys[keys[i]]);
        }
      }
      return values.every(elem => elem === true);
    }
    
    export function keysReleased(...keys: any[]): boolean {
      const values: boolean[] = [];
      if(typeof keys[0][0] == "number") {
        for(let i = 0; i < keys[0].length; i++) {
          values[i] = Sup.Input.wasKeyJustReleased(Keys[keys[0][i]]);
        }
      }
      else {
        for(let i = 0; i < keys.length; i++) {
          values[i] = Sup.Input.wasKeyJustReleased(Keys[keys[i]]);
        }
      }
      return values.every(elem => elem === true);
    }
    
    export function isMouseButtonDown(index: Mouse) {
      return Sup.Input.isMouseButtonDown(index);
    }
    
    export function wasMouseButtonJustPressed(index: Mouse) {
      return Sup.Input.wasMouseButtonJustPressed(index);
    }
    
    export function wasMouseButtonJustReleased(index: Mouse) {
      return Sup.Input.wasMouseButtonJustReleased(index);
    }
    
    export function isGamepadButtonDown(gamepad: number, index: GamepadButtons) {
      return Sup.Input.isGamepadButtonDown(gamepad, index);
    }
    
    export function wasGamepadButtonJustPressed(gamepad: number, index: GamepadButtons) {
      return Sup.Input.wasGamepadButtonJustPressed(gamepad, index);
    }
    
    export function getGamepadButtonValue(gamepad: number, index: GamepadButtons) {
      return Sup.Input.getGamepadButtonValue(gamepad, index);
    }
    export function getGamepadAxisValue(gamepad: number, index: GamepadAxis) {
      return Sup.Input.getGamepadAxisValue(gamepad, index);
    }
    
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
