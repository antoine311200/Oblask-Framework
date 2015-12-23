declare namespace Oblask {
  namespace Interface {
    class Button{
      constructor(actor: string, actions: any[], callback?: Function, method?: string);
      
      update(camera: Sup.Camera);
      
      private key(key: string);
      private mouse(index: string);
      private action(index: number);
      
      setText(text: string); //If your actor has a child named "Text" and which is a textRenderer.
      getHover();
      setRay(ray:Sup.Math.Ray);
      getRay(): Sup.Math.Ray;
      setCallback(callback: Function);
      getCallback(): Function;
      setMethod(method: string);
      getMethod(): string;
      setButton(name: string);
      getButton(): Sup.Actor;
      setActions(actions: any[]);
      getActions(): any[];
    }
    
    class ButtonPackage {
      constructor(buttons?: Button[]);
      constructor(actors?: Sup.Actor[], actions?: any[], callbacks?: Function[], methods?: string[]);
      
      update(camera: Sup.Camera);
      
      add(button: Button);
      addList(buttons: Button[]);
      remove(index: number);
      removeAll();
    }
  }
}
