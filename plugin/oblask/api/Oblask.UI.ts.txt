namespace Oblask {
  export namespace Interface {
    export class Button {

      private isHover: boolean;
      private method: string;

      private actions: any[];
      private callback: Function;

      private ray: Sup.Math.Ray;
      private button: Sup.Actor;
      private renderer: Sup.SpriteRenderer;

      constructor(actor: string, actions: any[], callback?: Function, method?: string) {
        this.button = Sup.getActor(actor);
        this.renderer = this.button.spriteRenderer;
        this.callback = callback;
        this.actions = actions;
        this.method = method;

        this.isHover = false;

        this.ray = new Sup.Math.Ray();
        this.ray.setOrigin(0, 1, 2);
        this.ray.setDirection(0, 0, 1);

        this.action(2);
      }

      update(camera: Sup.Camera){
        this.ray.setFromCamera(camera, Sup.Input.getMousePosition());

        if(this.ray.intersectActor(this.button, false).length > 0) {
          if(!this.isHover) {
            this.isHover = true;
            this.action(0);
          }
          if(this.method != null) {
            if(+this.method != null) {
              this.mouse(+this.method);
            }
            else {
              this.key(this.method);
            }
          }
          else {
            this.mouse(0);
          }
        }
        else {
          if(this.isHover) {
            this.isHover = false;
            this.action(2);
          }
        }
      }

      private key(key: string) {
        if(Sup.Input.wasKeyJustPressed(key)) {
          this.action(1);
          this.callback();
        }
        else if(Sup.Input.wasKeyJustReleased(key)) {
          this.action(0);
        }
      }

      private mouse(index: number) {
        if(Sup.Input.wasMouseButtonJustPressed(index)) {
          this.action(1);
          this.callback();
        }
        else if(Sup.Input.wasMouseButtonJustReleased(index)) {
          this.action(0);
        }
      }

      private action(index: number) {
        if(this.actions[index] instanceof Sup.Sprite) {
          this.button.spriteRenderer.setSprite(this.actions[index]);
        }
        else if(typeof this.actions[index] == "number") {
          this.button.spriteRenderer.setOpacity(this.actions[index]);
        }
      }

      setText(text: string) {
        this.button.getChild("Text").textRenderer.setText(text);
      }

      getHover() {
        return this.isHover;
      }

      setRay(ray: Sup.Math.Ray) {
        this.ray = ray;
      }

      getRay() {
        return this.ray;
      }

      setCallback(callback: Function) {
        this.callback = callback;
      }

      getCallback() {
        return this.callback;
      }

      setMethod(method: string) {
        this.method = method;
      }

      getMethod() {
        return this.method;
      }

      setButton(name: string) {
        this.button = Sup.getActor(name);
      }

      getButton() {
        return this.button;
      }

      setActions(actions: any[]) {
        this.actions = actions;
      }

      getActions() {
        return this.actions;
      }
    }
  
    export class ButtonPackage {
  
      private buttons: Button[];
      private actors: Sup.Actor[];
      private callbacks: Function[];

      private actions: any[];
      private methods: string[];

      constructor(buttons: Button[]) {
        this.buttons = [];
        this.actors = [];
        this.actions = [];
        this.callbacks = [];
        this.methods = [];
        
        for(let button in buttons) {
          this.buttons[this.buttons.length] = buttons[button];
          this.actors[this.actors.length] = buttons[button].getButton();
          this.actions[this.actions.length] = buttons[button].getActions();
          this.callbacks[this.callbacks.length] = buttons[button].getCallback();
          this.methods[this.methods.length] = buttons[button].getMethod();
        }
      }

      update(camera: Sup.Camera) {
        for(let i = 0; i < this.actors.length; i++) {
          this.buttons[i].update(camera); 
        }
      }

      add(button: Button) {
        this.buttons.push(button);
        this.actors.push(button.getButton());
        this.actions.push(button.getActions());
        this.callbacks.push(button.getCallback());
        this.methods.push(button.getMethod());
      }

      addMultiples(buttons: Button[]) {
        for(let button in buttons) {
          this.buttons.push(buttons[button]);
          this.actors.push(buttons[button].getButton());
          this.actions.push(buttons[button].getActions());
          this.callbacks.push(buttons[button].getCallback());
          this.methods.push(buttons[button].getMethod());
        }
      }

      remove(index: number) {
        delete this.buttons[index], this.actors[index], this.actions[index], this.callbacks[index], this.methods[index];
      }

      removeAll() {
        for(let button in this.buttons) {
          delete this.buttons[button], this.actors[button], this.actions[button], this.callbacks[button], this.methods[button];
        }
      }
    }
  }
}
