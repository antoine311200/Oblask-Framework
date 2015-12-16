class ButtonsPack {
  
  private buttons: Button[];
  private actors: Sup.Actor[];
  private callbacks: Function[];

  private actions: any[];
  private methods: string[];

  constructor(buttons?: Button[], actors?: Sup.Actor[], actions?: any[], callbacks?: Function[], methods?: string[]) {
    this.buttons = [];
    this.actors = [];
    this.actions = [];
    this.callbacks = [];
    this.methods = [];
    
    if(buttons != null) {
      for(let button in buttons) {
        this.buttons[this.buttons.length] = buttons[button];
        this.actors[this.actors.length] = buttons[button].getButton();
        this.actions[this.actions.length] = buttons[button].getActions();
        this.callbacks[this.callbacks.length] = buttons[button].getCallback();
        this.methods[this.methods.length] = buttons[button].getMethod();
      }
    }
    else {
      this.actors = actors;
      this.actions = actions;
      this.callbacks = callbacks;
      this.methods = methods;
      for(let i = 0; i < this.actors.length; i++) {
        this.buttons.push(new Button(this.actors[i].getName(), this.actions[i], this.callbacks[i], this.methods[i]));
      }
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

  addList(buttons: Button[]) {
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
