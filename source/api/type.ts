namespace Oblask {
  export namespace Current {
    export let Byte     : Oblask.Types.Byte[]     = [];
    export let SByte    : Oblask.Types.SByte[]    = [];
    export let Char     : Oblask.Types.Char[]     = [];
    export let Integer  : Oblask.Types.Integer[]  = [];
    export let UInteger : Oblask.Types.UInteger[] = [];
    
  }
  
  export namespace Types {
    export abstract class Type<T> {
      constructor(protected value: T) {}
      abstract destructor();
      
      get get() { return this.value; }
      set setter(newvalue: T) { this.value = newvalue; }
      abstract compareTo(value: Type<T>): boolean;
    
      public static sum<T>(...values: Type<T>[]): number { return values.reduce((a, b) => a + <number><any>b.get, 0) }
      public static sub<T>(...values: Type<T>[]): number { return values.reduce((a, b) => a - <number><any>b.get, 0) }
      public static mul<T>(...values: Type<T>[]): number { return values.reduce((a, b) => a * <number><any>b.get, 0) }
      public static div<T>(...values: Type<T>[]): number { return values.reduce((a, b) => a / <number><any>b.get, 0) }
      public static mod<T>(...values: Type<T>[]): number { return values.reduce((a, b) => a % <number><any>b.get, 0) }
    }
    
    type byte = number | string;
    export class Byte extends Type<byte> {
      constructor(protected value: byte) {
        super(value);
        if(typeof this.value === "string") {
          this.value = (<string>this.value).split('').reduce(function(current, previous) { 
            return (previous.charCodeAt(0) + current.charCodeAt(0)).toString();
          });
        }
        try {
          if(this.value < 0 || this.value > 255) throw new RangeError();
        }
        catch(e) {
          if(e instanceof RangeError) {
            console.error('Range Error : value "'+this.value+'" out of range [0..255]');
          }
        }
        Oblask.Current.Byte.push(this);
      }
      
      destructor() {
        if(Oblask.Current.Byte.indexOf(this) > -1) Oblask.Current.Integer.splice(Oblask.Current.Byte.indexOf(this), 1);
        let _this = this;
        _this = undefined;
        delete this;
        console.log("~~~~Destructor log~~~~");
        console.log(this);
      }
      
      compareTo(value: Byte): boolean {
        return this === value;
      }
    }
    export function toSByte(num: number) {
      return new Byte(num);
    }
    
    export class SByte extends Type<byte> {
      constructor(protected value: byte) {
        super(value);
        if(typeof this.value === "string") {
          this.value = (<string>this.value).split('').reduce(function(current, previous) { 
            return (previous.charCodeAt(0) + current.charCodeAt(0)).toString();
          });
        }
        try {
          if(this.value < -128 || this.value > 127) throw new RangeError();
        }
        catch(e) {
          if(e instanceof RangeError) {
            console.error('Range Error : value "'+this.value+'" out of range [0..255]');
          }
        }
        Oblask.Current.SByte.push(this);
      }
      
      destructor() {
        if(Oblask.Current.SByte.indexOf(this) > -1) Oblask.Current.Integer.splice(Oblask.Current.SByte.indexOf(this), 1);
        let _this = this;
        _this = undefined;
        delete this;
        console.log("~~~~Destructor log~~~~");
        console.log(this);
      }
      
      compareTo(value: SByte): boolean {
        return this === value;
      }
    }
    export function toByte(num: number) {
      return new Byte(num);
    }
    
    type char = string | number;
    export class Char extends Type<char>{
      constructor(protected value: char) {
        super(value);
        if(typeof this.value === "number") this.value = String.fromCharCode(<number>this.value);  
        try {
          if((<string>this.value).length > 1) throw new Oblask.System.Error((<string>this.value).length+' instead of 1', "LenghtError");
        }
        catch(e) {
          if(e instanceof Error) {
           return;
          }
        }
        Oblask.Current.Char.push(this);
      }
      
      destructor() {
        if(Oblask.Current.Char.indexOf(this) > -1) Oblask.Current.Integer.splice(Oblask.Current.Char.indexOf(this), 1);
        let _this = this;
        _this = undefined;  
        delete this;
        console.log("~~~~Destructor log~~~~");
        console.log(this);
      }
      
      compareTo(value: Char): boolean {
        return this === value;
      }
    }
    
    export class Integer extends Type<number> {
      constructor(public value: number) {
        super(value);
        this.value = Math.floor(this.value);
        try {
          if(this.value < -2147483648 || this.value > 2147483647) throw new RangeError();
        }
        catch(e) {
          if(e instanceof RangeError) {
            console.error('Range Error : value "'+this.value+'" out of range [-2147483648..2147483647]');
          }
        }
        this["watch"]("value", function(id, oldval, newval) {
          return Math.floor(newval);
        });
        Oblask.Current.Integer.push(this);
      }
      destructor() {
        if(Oblask.Current.Integer.indexOf(this) > -1) Oblask.Current.Integer.splice(Oblask.Current.Integer.indexOf(this), 1);
        let _this = this;
        _this = undefined;  
        delete this;
        console.log("~~~~Destructor log~~~~");
        console.log(this);
      }
      
      compareTo(value: Integer): boolean {
        return this === value;
      }
      
      val(nv: number) {this.value = nv;}
    }
    
    export class UInteger extends Type<number> {
      constructor(protected value: number) {
        super(value);
        this.value = Math.floor(this.value);
        try {
          if(this.value < 0 || this.value > 4294967295) throw new RangeError();
        }
        catch(e) {
          if(e instanceof RangeError) {
            console.error('Range Error : value "'+this.value+'" out of range [0..4294967295]');
          }
        }
        this["watch"]("value", function(id, oldval, newval) {
          return Math.floor(newval);
        });
        Oblask.Current.UInteger.push(this);
      }
      
      destructor() {
        if(Oblask.Current.UInteger.indexOf(this) > -1) Oblask.Current.UInteger.splice(Oblask.Current.UInteger.indexOf(this), 1);
        let _this = this;
        _this = undefined;
        delete this;
        console.log("~~~~Destructor log~~~~");
        console.log(this);
      }
      
      compareTo(value: UInteger): boolean {
        return this === value;
      }
    }
  }
}
