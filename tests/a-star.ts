class LevelParser {
  
  map: Sup.TileMap;
  solid: number[];
  empty: number[];
  layer: number;
  
  constructor(map: Sup.TileMap, layer?: number) {
    this.map = map;
    this.layer = layer || 1;
    
    this.solid = [3, 18, 19, 20, 21];
    this.empty = [];
  }

  parse(pathfinding?: boolean, layer?: number) {
    let parse = [];
    let width = this.map.getWidth();
    let height = this.map.getHeight();
    
    let pathBool = pathfinding || true;
        
    let enemies = 0;
    let targets = 0;
    
    for(let x = 0; x < width; x++) {
      parse[x] = [];
      for(let y = 0; y < height; y++) {
        
        if(this.map.getTileAt(this.layer, x, y) == 0) {
          let name = 'Start_'+enemies;
          parse[x][y] = (pathfinding? name : 0);
          enemies++;
        }
        else if(this.map.getTileAt(this.layer, x, y) == 1) {
          let name = 'Goal_'+targets;
          parse[x][y] = (pathfinding? name : 1);
          targets++;
        }
        else if(this.map.getTileAt(this.layer, x, y) == 3) {
          parse[x][y] = (pathfinding? "Obstacle" : 0);
        }
        else if(this.map.getTileAt(this.layer, x, y) == 18) {
          parse[x][y] = (pathfinding? "Obstacle" : 0);
        }
        else if(this.map.getTileAt(this.layer, x, y) == 19) {
          parse[x][y] = (pathfinding? "Obstacle" : 0);
        }
        else if(this.map.getTileAt(this.layer, x, y) == 20) {
          parse[x][y] = (pathfinding? "Obstacle" : 0);
        }
        else if(this.map.getTileAt(this.layer, x, y) == 21) {
          parse[x][y] = (pathfinding? "Obstacle" : 0);
        }
        else {
          parse[x][y] = (pathfinding? "Empty" : 0);
        }
      }
      //Sup.log(parse[x])
    }
    
    return parse;
  }

  set(map: string[][]) {
    for(let x = 0; x < map.length; x++) {
      for(let y = 0; y < map[x].length; y++) {        
        if(map[x][y] == 'Empty') this.map.setTileAt(this.layer, x, y, 2)
        else if(map[x][y].substring(0, 5) == 'Start') this.map.setTileAt(this.layer, x, y, 4);
        else if(map[x][y] == 'Obstacle')this.map.setTileAt(this.layer, x, y, 3);
        else if(map[x][y] == 'Visited') this.map.setTileAt(this.layer, x, y, 11);
        else if(map[x][y].substring(0, 4) == 'Goal') this.map.setTileAt(this.layer, x, y, 5);
      }
    }
  }
}

module TileMath {
  export function toTile(x, y, scale): number[] {
    /*if(tovec) return new Sup.Math.Vector2(Math.abs(Math.floor((x-0.32)/(0.16*Math.abs(scale)))), Math.abs(Math.floor((y-0.32)/(0.16*Math.abs(scale)))));
    else*/ return [Math.abs(Math.floor((x-0.32)/(0.16*Math.abs(scale)))), Math.abs(Math.floor((y-0.32)/(0.16*Math.abs(scale))))];
  }
  
  export function toVector(x, y, scale): Sup.Math.XY | Sup.Math.Vector2 {
    return new Sup.Math.Vector2(Math.abs(Math.floor((x-0.32)/(0.16*Math.abs(scale)))), Math.abs(Math.floor((y-0.32)/(0.16*Math.abs(scale)))));
  }
  
  export function toVector2(x, y, scale) {
    return [Math.abs(Math.floor((x)*(0.16*Math.abs(scale)))), Math.abs(Math.floor((y)*(0.16*Math.abs(scale))))];
  }
  
  export function VecToTile(vec: Sup.Math.Vector3 | Sup.Math.Vector2, scale: number) {
    return [Math.abs(Math.floor((vec.x-0.32)/(0.16*Math.abs(scale)))), Math.abs(Math.floor((vec.y-0.32)/(0.16*Math.abs(scale))))];
  }
  
  export function pointToTile(point: number, scale: number) {
    return Math.abs(Math.floor((point)*(0.16*Math.abs(scale))));
  }
}


var findShortestPath = function(startCoordinates: number[], grid: string[][]) {
  var distanceFromTop = startCoordinates[0];
  var distanceFromLeft = startCoordinates[1];

  // Each "location" will store its coordinates
  // and the shortest path required to arrive there
  var location = {
    distanceFromTop: distanceFromTop,
    distanceFromLeft: distanceFromLeft,
    path: [],
    status: 'Start'
  };

  // Initialize the queue with the start location already inside
  var queue = [location];

  // Loop through the grid searching for the goal
  while (queue.length > 0) {
    // Take the first location off the queue
    var currentLocation = queue.shift();

    // Explore North
    var newLocation = exploreInDirection(currentLocation, 'North', grid);
    if (newLocation.status.substring(0, 4) === 'Goal') {
      return newLocation.path;
    } else if (newLocation.status === 'Valid') {
      queue.push(newLocation);
    }

    // Explore East
    var newLocation = exploreInDirection(currentLocation, 'East', grid);
    if (newLocation.status.substring(0, 4) === 'Goal') {
      return newLocation.path;
    } else if (newLocation.status === 'Valid') {
      queue.push(newLocation);
    }

    // Explore South
    var newLocation = exploreInDirection(currentLocation, 'South', grid);
    if (newLocation.status.substring(0, 4) === 'Goal') {
      return newLocation.path;
    } else if (newLocation.status === 'Valid') {
      queue.push(newLocation);
    }

    // Explore West
    var newLocation = exploreInDirection(currentLocation, 'West', grid);
    if (newLocation.status.substring(0, 4) === 'Goal') {
      return newLocation.path;
    } else if (newLocation.status === 'Valid') {
      queue.push(newLocation);
    }
  }

  // No valid path found
  return false;

};

// This function will check a location's status
// (a location is "valid" if it is on the grid, is not an "obstacle",
// and has not yet been visited by our algorithm)
// Returns "Valid", "Invalid", "Blocked", or "Goal"
var locationStatus = function(location, grid: string[][]) {
  var gridSize = grid.length;
  var dft = location.distanceFromTop;
  var dfl = location.distanceFromLeft;

  if (location.distanceFromLeft < 0 ||
      location.distanceFromLeft >= gridSize ||
      location.distanceFromTop < 0 ||
      location.distanceFromTop >= gridSize) {

    // location is not on the grid--return false
    return 'Invalid';
  } else if (grid[dft][dfl].substring(0, 4) === 'Goal') {
    return 'Goal';
  } else if (grid[dft][dfl] !== 'Empty' && grid[dft][dfl] !== "Obstacle") {
    // location is either an obstacle or has been visited
    return 'Blocked';
  } else if (grid[dft][dfl] == "Obstacle") {
    return 'Obstacle';
  } else {
    return 'Valid';
  }
};


// Explores the grid from the given location in the given
// direction
var exploreInDirection = function(currentLocation, direction, grid) {
  var newPath = currentLocation.path.slice();
  newPath.push(direction);

  var dft = currentLocation.distanceFromTop;
  var dfl = currentLocation.distanceFromLeft;

  if (direction === 'North') {
    dft -= 1;
  } else if (direction === 'East') {
    dfl += 1;
  } else if (direction === 'South') {
    dft += 1;
  } else if (direction === 'West') {
    dfl -= 1;
  }

  var newLocation = {
    distanceFromTop: dft,
    distanceFromLeft: dfl,
    path: newPath,
    status: 'Unknown'
  };
  newLocation.status = locationStatus(newLocation, grid);
  //Sup.log(newLocation.status+" at ",dft, dfl);
  
  // If this new location is valid, mark it as 'Visited'
  if (newLocation.status === 'Valid') {
    grid[newLocation.distanceFromTop][newLocation.distanceFromLeft] = 'Visited';
  }

  return newLocation;
};

//let grid = level.parse();



// Think of the first index as "distance from the top row"
// Think of the second index as "distance from the left-most column"

// This is how we would represent the grid with obstacles above

