//Player Class
if(typeof CoinStat == "undefined") {
    var CoinStat = {};
    CoinStat.static = 0;
};

// 2.
var Coin =  cc.Node.extend({
    sprite:null,
    //runningSize:null,
    
    stat:CoinStat.running,// init with running status
    startAction:null,
    spriteSheet:null,
    //get offsetPx() {return 100;},

    
    ctor:function (spriteSheet,space) {
                // needed for JS-Bindings compatibility
       // this._super();
       this.space=space;
         
        this.spriteSheet = spriteSheet;
               this.init();
    },

    init:function () {
        this._super();
        g_coinClass = this;
        // 4.
        this.sprite = cc.Sprite.createWithSpriteFrameName("coin0.png");
        this.runningSize = this.sprite.getContentSize();

        // 5.
        this.initAction();
        // 6.
        this.sprite.runAction(this.startAction);
        // 10.
        //this.spriteSheet.addChild(this.sprite);
        // 11.
       /* this.stat = CoinStat.static;
        //this.sprite = cc.PhysicsSprite.create("#runner0.png");
        var contentSize = this.sprite.getContentSize();
        // 2. init the runner physic body
        this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
        //3. set the position of the runner
        this.body.p = cc.p(g_runnerStartX, g_groundHight + contentSize.height / 2);
        //4. apply impulse to the body
        this.body.applyImpulse(cp.v(150, 0), cp.v(0, 0));//run speed
        //5. add the created body to space
        this.space.addBody(this.body);
        //6. create the shape for the body
        this.shape = new cp.BoxShape(this.body, contentSize.width - 14, contentSize.height);
        //7. add shape to space
        this.space.addShape(this.shape);
        //8. set body to the physic sprite
        this.sprite._body=this.body;/**/
               
    },

    // 12.
    onExit:function() {
        this.startAction.release();

        this._super();
    },
    pushThis:function(){
    g_coins_shadows_sprites.push(this.sprite);
    },

    // 13.
    getPositionX:function () {
        return this.sprite.getPositionX();
    },
    collideRect:function(){
        var a = this.getContentSize();
        var p = this.getPosition();
        return cc.rect(p.x - a.width/2, p.y - a.height/4,a.width,a.height/2);
    },
    setScale:function(scale){
    return this.sprite.setScale(scale);
    },
     setScaleY:function(scale){
    return this.sprite.setScaleY(scale);
    },
        setScaleX:function(scale){
    return this.sprite.setScaleX(scale);
    },
    setPosition:function(pos,pos2){
    
    return this.sprite.setPosition(pos,pos2);
    },
    addSpr:function(layer,zorder){
    layer.addChild(this.sprite,zorder);
    
    g_coins.push(this.sprite);
    
    },
    runAction:function(action){
    this.sprite.runAction(action);
    
    
    },
    getBoundingBox:function(){
    return this.sprite.getBoundingBox();
    
    },
   removeSpr:function(layer){
   
   layer.removeChild(this.sprite, true);

   },

    initAction:function () {
        // init runningAction
        var animFrames2 = [];
        // num equal to spriteSheet
        for (var i = 0; i < 1 ; i++) {
            var str = "coin" + i + ".png";
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
            animFrames2.push(frame);
        }

        var animation = cc.Animation.create(animFrames2, 0.1);
        this.startAction = cc.RepeatForever.create(cc.Animate.create(animation));
        this.startAction.retain();
    },
    taggg:function(){
    return 'blabla';
    },

    });