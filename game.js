var Snake = (function () {

  const INITIAL_TAIL = 08;

 // var fixedTail = true;



  var intervalID;//main

  var tileCount = 6;
  var gridSize = 500/tileCount; 
  
  //var grd=[tileCount][tileCount];
  //  
  var grd1 = new Array(tileCount);
  for (var i = 0; i < grd1.length; i++) {
    grd1[i] = new Array(tileCount).fill(1);
  }
  grd1[1][1] = 5;
  grd1[5][5]=7;
  
  var grd0 = new Array(tileCount);
  for (var i = 0; i < grd0.length; i++) {
    grd0[i] = new Array(tileCount);
  }
  grd0[2][2] = 2;
  grd0[5][3] = 1;

  const INITIAL_PLAYER = { x: Math.floor(tileCount / 2), y: Math.floor(tileCount / 2) };

  var velocity = { x:0, y:0 };
  var player = { x: INITIAL_PLAYER.x, y: INITIAL_PLAYER.y };

  //var walls = false;

  //var fruit = { x:1, y:1 };

  //var trail = [];
  var tail = INITIAL_TAIL;

  var reward = 0;
  var points = 0;
  var pointsMax = 0;

  //var ActionEnum = { 'none':0, 'up':1, 'down':2, 'left':3, 'right':4 };
  //Object.freeze(ActionEnum);
  //var lastAction = ActionEnum.none;

  function setup () {
    canv = document.getElementById('gc');
    ctx = canv.getContext('2d');

    game.reset();
  }
  
  function isbusy(x, y) {
    if(grd0[x][y]==1)return -1;
    if(grd0[x][y]==2)return -2;
    return 0;
  }
  
  function cntx(x, y){
    
  }

  var game = {

    reset: function () {
      ctx.fillStyle = 'grey';
      ctx.fillRect(0, 0, canv.width, canv.height);

      //tail = INITIAL_TAIL;
      points = 0;
      velocity.x = 0;
      velocity.y = 0;
      player.x = INITIAL_PLAYER.x;
      player.y = INITIAL_PLAYER.y;
      // this.RandomFruit();
      //reward = -1;

      //lastAction = ActionEnum.none;

      //trail = [];
      //trail.push({ x: player.x, y: player.y });
       //for(var i=0; i<tail; i++) trail.push({ x: player.x, y: player.y });
    },

    action: {
      up: function () {
        //if (lastAction != ActionEnum.down){
          velocity.x = 0;
          velocity.y = -1;
        //}
      },
      down: function () {
        //if (lastAction != ActionEnum.up){
          velocity.x = 0;
          velocity.y = 1;
        //}
      },
      left: function () {
        //if (lastAction != ActionEnum.right){
          velocity.x = -1;
          velocity.y = 0;
        //}
      },
      right: function () {
          velocity.x = 1;
          velocity.y = 0;
      },
      esc: function() {
        grd0[player.x][player.y] = 2;
      },
      entr: function() {
        grd0[player.x][player.y] = 1;
      }
    },
    /*
    
    */
    log: function () {
      console.log('====================');
      console.log('x:' + player.x + ', y:' + player.y);
      console.log('tail:' + tail + ', trail.length:' + trail.length);
    },

    loop: function () {
      player.x += velocity.x;
      player.y += velocity.y;
      velocity.x=0;
      velocity.y=0;
      /*
      
      */
      ctx.fillStyle = 'rgba(20,40,40,0.8)';
      ctx.fillRect(0,0,canv.width,canv.height);
      ctx.fillStyle = 'white';
      ctx.font = "bold small-caps 16px Helvetica";
      //grid  ********************
      ctx.strokeStyle ="gray";
      ctx.lineWidth=1;
      for (var i = 0; i < tileCount; i++) {
        ctx.moveTo(0,i*gridSize);
        ctx.lineTo(500,i*gridSize);
        
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, 500);
        for (var j = 0; j < tileCount; j++) {
          ctx.fillStyle="gray";
          var txt=grd1[i][j]==undefined?0:grd1[i][j];
          ctx.fillText(txt, i*gridSize+4, j*gridSize+16);
        }
      }
      ctx.stroke();


       
        ctx.fillStyle = 'rgba(200,200,200,0.2)';
        ctx.font = "small-caps 14px Helvetica";
        //ctx.fillText("(esc) reset", 24, 356);
        //ctx.fillText("(space) pause", 24, 374);
      

      ctx.fillStyle = 'green';
      
      
      ctx.beginPath();
      ctx.strokeStyle="green";
      ctx.lineWidth=3; 
      ctx.rect(player.x*gridSize+1, player.y*gridSize+1, gridSize-2, gridSize-2);
      
      //ctx.beginPath();
      ctx.fillStyle="red";
      //ctx.font = "50px Helvetica";
      for (var i = 0; i < tileCount; i++) {
        for (var j = 0; j < tileCount; j++) {
          var txt = grd0[i][j] == undefined ? "" : grd0[i][j];
          if(txt==1) txt="X";
          else if(txt==2) txt="O";
          else txt=="";
          ctx.fillText(txt, i * gridSize + 4, j * gridSize + 16);
        }
      }
      ctx.stroke();
    
      
      /*
      if(stopped) {
        ctx.fillStyle = 'rgba(250,250,250,0.8)';
        ctx.font = "small-caps bold 14px Helvetica";
        ctx.fillText("press ARROW KEYS to START...", 24, 374);
      }

      ctx.fillStyle = 'white';
      ctx.font = "bold small-caps 16px Helvetica";
      ctx.fillText("points: " + points, 288, 40);
      ctx.fillText("top: " + pointsMax, 292, 60);
      */
      return 0;//reward;
    }
  }
  
  function keyPush (evt) {
    switch(evt.keyCode) {
      case 37: //left
      game.action.left();
      evt.preventDefault();
      break;

      case 38: //up
      game.action.up();
      evt.preventDefault();
      break;

      case 39: //right
      game.action.right();
      evt.preventDefault();
      break;

      case 40: //down
      game.action.down();
      evt.preventDefault();
      break;

      case 32: //space
      Snake.pause();
      evt.preventDefault();
      break;

      case 27: //esc
      game.reset();
      evt.preventDefault();
      break;
    }
  }
  
  return {
    start: function (fps = 15) {
      window.onload = setup;
      intervalID = setInterval(game.loop, 1000 / fps);
    },

    loop: game.loop,

    reset: game.reset,

    stop: function () {
      clearInterval(intervalID);
    },

    setup: {
      keyboard: function (state) {
        if (state) {
          document.addEventListener('keydown', keyPush);
        } else {
          document.removeEventListener('keydown', keyPush);
        }
      }
    //  },
     // wall: function (state) {
     //   walls = state;
     // },
      //tileCount: function (size) {this
       // tileCount = size;
      //  gridSize = 400 / tileCount;
      
    //  fixedTail: function (state) {
     //   fixedTail = state;
    //  }
    },

    action: function (act) {
      switch(act) {
        case 'left':
          game.action.left();
          break;

        case 'up':
          game.action.up();
          break;

        case 'right':
          game.action.right();
          break;

        case 'down':
          game.action.down();
          break;
          
        case 'esc':
          game.action.esc();
          break;
          
        case 'entr':
          game.action.entr();
          break;
      }
    },
/*
    pause: function () {
      velocity.x = 0;
      velocity.y = 0;
    },
    */
  };

})();

Snake.start(8);
Snake.setup.keyboard(true);
//Snake.setup.fixedTail(false);
