
//Wall Class
if(typeof WallStat == "undefined") {
    var WallStat = {};
    WallStat.static = 0;
};

// 2.
var Wall =  cc.Node.extend({
    sprite:null,
    //runningSize:null,
    
    stat:WallStat.running,// init with running status
    startAction:null,
    spriteSheet:null,
    //get offsetPx() {return 100;},

    
    ctor:function (spriteSheet) {
        this._super();

        this.spriteSheet = spriteSheet;
              
       

        // 4.
        this.sprite = cc.Sprite.createWithSpriteFrameName("pared0.png");
        this.runningSize = this.sprite.getContentSize();

        // 5.
        this.initAction();
        // 6.
        this.sprite.runAction(this.startAction);
        this.sprite.setAnchorPoint(cc.p(0.5,0));

        // 10.
        this.spriteSheet.addChild(this.sprite);
        // 11.
        this.stat = WallStat.static;
    },

    // 12.
    onExit:function() {
        this.startAction.release();

        //this._super();
    },
   
    
getBoundingBox:function(){

//cc.log('sadkfjaskdfjaslkdjf');
},
    // 13.
    getPositionX:function () {
        return this.sprite.getPositionX();
    },

    initAction:function () {
        // init runningAction
        var animFrames2 = [];
        // num equal to spriteSheet
        for (var i = 0; i < 1 ; i++) {
            var str = "pared" + i + ".png";
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
    wallSetScale : function(scale){
    
    this.sprite.setScale(scale);
    },
    

    });