namespace Oblask {
  export namespace Generation {
    
    export module DiamondSquare {
      
      export function heightmapDiamondSquare(mapSize: number, wrap: boolean, roughness: number ): number[][] {

        var map = [];
        var nw = (wrap ? 0 : 1);

        for (var i = 0; i < mapSize; i++) {
          map[i] = [];
        }

        map[0][0] = Math.round(Math.random() * 255);
        map[0][mapSize - 1] = Math.round(Math.random()* 255);
        map[mapSize - 1][0] = Math.round(Math.random() * 255);
        map[mapSize - 1][mapSize - 1] = Math.round(Math.random() * 255);

        var h = 128;

        for (var sideLength = mapSize - 1; sideLength >= 2; sideLength /= 2, h /= 2.0) {
          
          if(sideLength%2!=0)sideLength = Math.floor(sideLength);
          var halfSide = sideLength / 2;
          if(halfSide%2!=0)halfSide = Math.floor(halfSide);

          for (var x = 0; x < mapSize - 1; x += sideLength) {
            for (var y = 0; y < mapSize - 1; y += sideLength) {
              var avg = map[x][y] + map[x + sideLength][y] + map[x][y + sideLength] + map[x + sideLength][y + sideLength];
              avg /= 4.0;

              map[x + halfSide][y + halfSide] = normalize(avg + offset(h, roughness));
            }
          }

          for (var x = 0; x < mapSize - 1 + nw; x += halfSide) {
            for (var y = (x + halfSide) % sideLength; y < mapSize - 1 + nw; y += sideLength) {
              var avg = map[(x - halfSide + mapSize - 1) % (mapSize - 1)][y] + map[(x + halfSide) % (mapSize - 1)][y] + map[x][(y + halfSide) % (mapSize - 1)] + map[x][(y - halfSide + mapSize - 1) % (mapSize - 1)];

              avg /= 4.0;
              avg = normalize(avg + offset(h, roughness));
              map[x][y] = avg;

              if (wrap) {
                if (x == 0) map[mapSize - 1][y] = avg;
                if (y == 0) map[x][mapSize - 1] = avg;
              }
            }
          }
        }

        return map;
      }
      
      export function boxBlur(map:number[][], radius: number): number[][] {
        var dimX = map.length;
        var dimY = map[0].length;
        var result: number[][] = [];
        var line: number[];
        var val: number;

        for (var i = 0; i < dimX; i++) {
          line = [];
          for (var j = 0; j < dimY; j++) {
            val = 0;
            for (var iy = j - radius; iy < j + radius + 1; iy++) {
              for (var ix = i - radius; ix < i + radius + 1; ix++) {
                var x = Math.min(dimX - 1, Math.max(0, ix));
                var y = Math.min(dimY - 1, Math.max(0, iy));
                val += map[x][y];
              }
            }
            line.push(val / ((radius + radius + 1) * (radius + radius + 1)));
          }
          result.push(line);
        }

        return result;
      }
      
      export function offset(height, roughness) {
        return (Math.random() * 2 - 1) * height * roughness;
      }

      export function normalize(value) {
        return Math.round(Math.max(Math.min(value, 255), 0));
      }
    }
  }
}
