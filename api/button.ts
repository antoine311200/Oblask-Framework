class Button {
  
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
