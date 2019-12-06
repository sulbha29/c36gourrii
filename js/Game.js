class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
      playerCount = playerCountRef.val();
      
      player.getCount();
      }
      form = new Form()
      form.display();
      
    }
   
  }
  play(){
    form.hide();
    textSize(14);
    text("GAME BEGAN",50,250);
    Player.getplayerInfo();
    if(ALLplayers !== undefined){
      var display_position = 100;
     for(var plr in ALLplayers){
       if(plr === "player"+player.index)
       fill ("blue");
       else
       fill("black");
       display_position+=10;
       textSize(7);
       text(ALLplayers[plr].name+":"+ ALLplayers[plr].distance,120,display_position);

     }
    }
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance += 15;
      player.update();
    }
    
  }
}
