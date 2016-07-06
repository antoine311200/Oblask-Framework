namespace Oblask {
  export namespace Physic {
    
    export interface HitBox {
      yt: number, // Size : Y Top
      yb: number, // Size : Y Bottom
      xt: number, // Size : X Top
      xb :number  // Size : X Bottom
    }
    
    export class P2D {
      actor: Sup.Actor;
      hitBox: HitBox;
      position: Sup.Math.Vector2;
      
      properties: {tileMap: Sup.TileMap, tileSet: Sup.TileSet, layer: number, property: string}
      
      constructor(actor: Sup.Actor, hitBox: HitBox, properties?: {tileMap: Sup.TileMap, tileSet: Sup.TileSet, layer: number, property: string}) {
        this.actor = actor;
        this.hitBox = hitBox;
        this.position = this.actor.getPosition().multiplyScalar(10).toVector2();
        
        this.properties = properties;
      }
  
      update() {
        if(this.actor.getX() != this.position.x) {
          if(this.actor.getX() > this.position.x) {
            let move: boolean = this.canMove(1, 0);
            
            if(!move) this.actor.setX(this.position.x)
            else this.position.x = this.actor.getX();
          }
          else if(this.actor.getX() < this.position.x) {
            let move: boolean = this.canMove(-1, 0);
            
            if(!move) this.actor.setX(this.position.x)
            else this.position.x = this.actor.getX();
          }
        }
        if(this.actor.getY() != this.position.y) {
          if(this.actor.getY() > this.position.y) {
            let move: boolean = this.canMove(0, 1);
            
            if(!move) this.actor.setY(this.position.y)
            else this.position.y = this.actor.getY();
          }
          if(this.actor.getY() < this.position.y) {
            let move: boolean = this.canMove(0, -1);
            
            if(!move) this.actor.setY(this.position.y)
            else this.position.y = this.actor.getY();
          }
        }
      }
    
      canMove(moveX: number, moveY: number) {
        let posX: number = this.actor.getX()*10;
        let posY: number = this.actor.getY()*10;
        
        if(moveX > 0)       posX += this.hitBox.xt;
        else if(moveX < 0)  posX -= this.hitBox.xb;
        if(moveY > 0)       posY += this.hitBox.yt;
        else if(moveY < 0)  posY -= this.hitBox.yb;
        
        const tileX: number = Math.floor(posX/10);
        const tileY: number = Math.floor(posY/10);
        const tile: number = this.properties.tileMap.getTileAt(this.properties.layer, tileX,tileY);
        
        if(this.properties.tileSet.getTileProperties(tile)[this.properties.property] == "true") {
          let distance: number = new Sup.Math.Vector2(posX/10, posY/10).distanceTo(new Sup.Math.Vector2(tileX+0.5, tileY+0.5));
          let distanceX: number = Math.abs((tileX+0.5)-(posX/10));
          let distanceY: number = Math.abs((tileY+0.5)-(posY/10));
          
          for(let index in TileSpecification.tiles) {
            if(typeof TileSpecification.tiles[index].pattern === "number") {
              if(<number>TileSpecification.tiles[index].pattern === tile) {
                Sup.log(tile, distanceX, TileSpecification.tiles[index].radius.x, "\n", distanceY, TileSpecification.tiles[index].radius.y );
                if(distanceX > TileSpecification.tiles[index].radius.x && distanceY > TileSpecification.tiles[index].radius.y) {
                  Sup.log("OK");
                  return true;
                }
              }
              
            }
          }
          
          return false;
        }
        
        return true;
      }
    }

    export class TileSpecification {
      
      static tiles: TileSpecification[] = [];
      
      pattern: number |number[] | number[][];
      radius: Sup.Math.Vector2;

      constructor(pattern: number | number[][] | number[][], radius: Sup.Math.Vector2) {
        this.pattern = pattern;
        this.radius = radius;
        
        TileSpecification.tiles.push(this);
      }
      
    }
  }
}
