//Obstacle

//Player Class
if(typeof ObstacleStat == "undefined") {
    var ObstacleStat = {};
    ObstacleStat.static = 0;
    ObstacleStat.jumpUp = 1;

};

// 2.
var Obstacle =  cc.Node.extend({
    sprite:null,
    //runningSize:null,
    
    stat:ObstacleStat.static,// init with running status
    startAction:null,
    spriteSheet:null,
    jumpUpAction:null,

    //get offsetPx() {return 100;},

    
    ctor:function (spriteSheet) {
                // needed for JS-Bindings compatibility
        this._super();
         
        this.spriteSheet = spriteSheet;
              // this.init();
    
        g_obstacleClass = this;
        // 4.
        this.sprite = cc.Sprite.createWithSpriteFrameName("obstacle0.png");
        this.runningSize = this.sprite.getContentSize();

        // 5.
        this.initAction();
        // 6.
        this.sprite.runAction(this.startAction);
        // 10.
        //this.spriteSheet.addChild(this.sprite);
        // 11.
        this.stat = ObstacleStat.static;
        
               
    },

    // 12.
    onExit:function() {
        this.startAction.release();
        this.jumpUpAction.release();

        this._super();
    },

    // 13.
    getPositionX:function () {
        return this.sprite.getPositionX();
    },
   getPositionY:function () {
        return this.sprite.getPositionY();
    },
    collideRect:function(){
        var a = this.getContentSize();
        var p = this.getPosition();
        return cc.rect(p.x - a.width/2, p.y - a.height/4,a.width,a.height/2);
    },
    setScale:function(scale){
    return this.sprite.setScale(scale);
    },
    setPosition:function(pos,pos2){
    
    return this.sprite.setPosition(pos,pos2);
    },
    addSpr:function(layer,zorder){
    layer.addChild(this.sprite,zorder);
    //g_obstacles.push(this.sprite);
    
    },
    runAction:function(action){
    this.sprite.runAction(action);
    
    
    },
    getBoundingBox:function(){
    return this.sprite.getBoundingBox();
    
    },
    pushThis:function(){
    g_obstacles_shadows_sprites.push(this.sprite);
    },
    setAnchor:function(pos){
    
    this.sprite.setAnchorPoint(pos);

    },

   removeSpr:function(layer){
   
   layer.removeChild(this.sprite, true);

   },

    initAction:function () {
       
        var animFrames2 = [];
       
        for (var i = 0; i < 1 ; i++) {
            var str = "obstacle" + i + ".png";
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
            animFrames2.push(frame);
        }

        var animation = cc.Animation.create(animFrames2, 0.1);
        this.startAction = cc.RepeatForever.create(cc.Animate.create(animation));
      
        this.startAction.retain();
        
        
        

  
            
            
            
    },
    bal:function(ble){
    
    cc.log(ble);
    },
    

    });