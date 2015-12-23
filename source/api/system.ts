namespace Oblask {
  export namespace System {
    
    export function log(message?: any, ...optionalParams: any[]) {
      Sup.log(message, ...optionalParams);
    }
    
    export function print(message?: any, color?: string, backgroundColor?: string) {
      let css = "";
      if(color) css+="color: "+color+";";
      if(backgroundColor) css+=" background: "+backgroundColor+";";
      Sup.log(css);
      Sup.log("%c"+message, css);
    }
    
    export function error(message?: any, err?: boolean) {
      if(err) {
        throw(new SyntaxError(message));
      }
      else {
        Sup.log("%c"+message, "color: red; background: rgb(255, 210, 210)");
      }
    }
    
    export function warn(message?: any) {
      Sup.log("%c"+message, "color: rgb(238, 173, 14); background: rgb(255, 255, 200)");
    }
    
    export function info(message?: any) {
      Sup.log("  %c"+message, "color: rgb(0, 0, 205); background: rgb(235, 255, 255)");
    }
    
    export class Log {
      
    }
    
    export class Error {
      
      message: string;
      type: string;
      
      constructor(message: string, type?: string, allowInfo?: boolean) {
        this.message = message;
        this.type = type;
        
        Oblask.System.error(this.type+" : "+this.message);
        if(allowInfo) Oblask.System.Info.setErrorInfo(this.type);
      }
    }
  
    export enum ErrorType {
      Action,
      Type,
      Syntax
    }
  
    export var ErrorDescription = [
      "→ check you have input a existing action in your method Oblask.Audio.Playlist.setTimer",
      "type",
      "syntax"
    ];
    
    export class Warn {
      
    }
    
    export class Info {
      message: string;
      
      constructor(message: string) {
        this.message = message;
        
        Oblask.System.info(this.message);
      }
  
      static setErrorInfo(type: string) {
        let ty = type.substring(0, type.indexOf(" Error"));
        for(let i in ErrorType) {
          if(ErrorType[i] == ty) {
            new Oblask.System.Info(ErrorDescription[i])
          }
        }
      }
    }

    export enum CharacterCode {
      "&#8592;","&#8593;","&#8594;","&#8595;","&#8596;","&#8597;","&#8598;","&#8599;","&#8600;","&#8601;","&#8602;","&#8603;","&#8604;","&#8605;","&#8606;","&#8607;","&#8608;","&#8609;","&#8610;","&#8611;","&#8612;","&#8613;","&#8614;"
    }

    export enum CharacterString {
      "←", "↑", "→", "↓", "↔", "↕", "↖", "↗", "↘", "↙"
    }

    export module Symbol {
      export function get(sym: string) {
        if(sym.charAt(0) == "&") {
          for(let i in CharacterCode) {
              Sup.log(CharacterCode[i]+" : "+sym);
            if(CharacterCode[i] == sym) {
              return CharacterString[i];
            }
          }
        }
        else {
          for(let i in CharacterString) {
            if(CharacterString[i] == sym) {
              return CharacterCode[i];
            }
          }
        }
      }
    }
  }
}
