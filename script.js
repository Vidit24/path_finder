var len = 10;
var wall = 'white';
var original = 'grey';
var path = 'yellow';
function setup(){
  var maze_container = document.getElementById('maze_container');
  for(var i =0 ; i<10 ; i++)
  {
    var row = document.createElement('div');
    row.className = 'row row' + (i+1);
    row.id = 'row' + (i+1);
    for(var j =0 ; j<10 ; j++)
    {
       var node = document.createElement('div');
       node.className = 'node node' +((i*10)+(j+1));
       node.id = 'node' + ((i*10)+(j+1));
       if(((i*10)+(j+1)) != 1 && ((i*10)+(j+1)) != 100)
       {
         node.style.backgroundColor = original;
         node.onclick = function(){
           clicked(this.id);
         }
         
       }
       row.appendChild(node);
    }
    maze_container.appendChild(row);
  }
}

function clicked(elementID){
  var node = document.getElementById(elementID);
  if(node.style.backgroundColor == wall){
    node.style.backgroundColor = original;
  }
  else
  node.style.backgroundColor = wall;
}

function reset(){
  for(var i =2 ; i<100; i++){
  var node = document.getElementById('node' + i);
    node.style.backgroundColor = original;
  }

  document.getElementById('node1').style.backgroundColor = 'green' ;
  document.getElementById('node100').style.backgroundColor = 'red' ;


}
function refresh(){
    
}
function solveMaze(){
  var flag =0;
  if(hashWall()){
    alert('Press F5 or Use Reset button !');
    //reset();
    //return true;
  }
  var maze = [];

  for(let i =0 ; i< len ; i++){
      maze[i] = new Array(len).fill(0);
  }

  var rowCount = 0;
  var columnCount = 0;
  var nodeVal =1;

  for(var i =1 ; i < len*len+1 ; i++ ){
      if(document.getElementById('node' + i).style.backgroundColor == wall){
        maze[rowCount][columnCount] = -1;
      }
      else{
        maze[rowCount][columnCount] = nodeVal;
      }
      columnCount++;
      if(columnCount== len){
        rowCount++;
        columnCount=0;
      }
      nodeVal++;
  }
   
  var adjList = {};
  var possibleMoves = [
    [-1,0], [1,0],[0,1],[0,-1]
  ];

  for(var row = 0 ; row< len ; row++){
    for(var col = 0 ; col< len ; col++){
      if(maze[row][col] == -1)continue;
      var currNode = maze[row][col];
      var neighbours = [];

      for(var count = 0 ; count < possibleMoves.length ; count++){
        var nRow = possibleMoves[count][0] + row;
        var ncol = possibleMoves[count][1] + col;
        if((nRow >= 0 && nRow < maze.length)&&(ncol >= 0 && ncol < maze[0].length)){
          if(maze[nRow][ncol] != -1){
            neighbours.push([nRow,ncol]);
          }
        }
      }
      adjList[currNode] = neighbours;
    }
  }
  var visited = [];
  var prev = new Array(len*len).fill(0);
  for(var i =0 ; i< len ; i++){
    visited[i] = new Array(len).fill(false);
  }
  var queue = [];
  var solved = false;

  queue.push([0,0]);

  while(queue.length >0){
    var nodeCoor = queue.splice(0,1)[0];
    if(nodeCoor[0] == 9 && nodeCoor[1] == 9){
      solved = true;
      break;
    }
    visited[nodeCoor[0]][nodeCoor[1]] = true;
    // adjList[maze[nodeCoor[0]][nodeCoor[1]]]
    for(var i =0 ; i< adjList[maze[nodeCoor[0]][nodeCoor[1]]].length ; i++ ){
      var temp = adjList[maze[nodeCoor[0]][nodeCoor[1]]][i];
      if(visited[temp[0]][temp[1]] != true){
        queue.push([temp[0],temp[1]]);
        prev[maze[temp[0]][temp[1]]] = maze[nodeCoor[0]][nodeCoor[1]];
      }
    }

  }
  //retrace
  if(flag != 1){
  var endNode = maze[9][9];
  document.getElementById('node' + endNode).style.backgroundColor = path;
  var previous = endNode;
  var loopControl =false;
  while(true&& solved){
    var node = prev[previous];
    
      document.getElementById('node' + node).style.backgroundColor = path;
    

    if(node==1){
      break;
    }else{
      previous= node;
    }

    //if(loopControl)break;
  }

  document.getElementById('node1').style.backgroundColor = path;
}
  //console.log(adjList);
}

function hashWall(){
  for(var i = 1; i< 101 ; i++){
    if(document.getElementById('node' + i).style.backgroundColor == path){
      return true;
    }

  }
  return false;
}
