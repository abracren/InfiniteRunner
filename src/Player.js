//Player Class
if(typeof RunnerStat2 == "undefined") {
    var RunnerStat2 = {};
    RunnerStat2.running = 0;
};

// 2.
var Runner2 = cc.Node.extend({
    sprite:null,
    runningSize:null,
    
    stat:RunnerStat2.running,// init with running status
    runningAction:null,
    spriteSheet:null,
    get offsetPx() {return 100;},

    // 3.
    ctor:function (spriteSheet,space) {
        this._super();
        this.space =space;

        this.spriteSheet = spriteSheet;
               this.init();
    },

    init:function () {
        this._super();

        // 4.
        this.sprite = cc.Sprite.createWithSpriteFrameName("runner0.png");
        this.runningSize = this.sprite.getContentSize();

        // 5.
        this.initAction();
        // 6.
        this.sprite.runAction(this.runningAction);
        // 10.
        this.spriteSheet.addChild(this.sprite, 1);
        // 11.
        this.stat = RunnerStat2.running;
       /*
        var contentSize = this.sprite.getContentSize();
        // 2. init the runner physic body
        this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
        //3. set the position of the runner
        this.body.p = cc.p(100, g_groundHight + contentSize.height / 2);
        //4. apply impulse to the body
        this.body.applyImpulse(cp.v(150, 0), cp.v(0, 0));//run speed
        //5. add the created body to space
        this.space.addBody(this.body);
        //6. create the shape for the body
        this.shape = new cp.BoxShape(this.body, contentSize.width - 14, contentSize.height);
        //7. add shape to space
        this.space.addShape(this.shape);
        //8. set body to the physic sprite
        this.sprite._body=this.body;*/
    },

    // 12.
    onExit:function() {
        this.runningAction.release();

        this._super();
    },
    addChildren:function(sprite){
    this.addChild(this,2,1000);
    
    
    },

    // 13.
    getPositionX:function () {
        return this.sprite.getPositionX();
    },
        initAction:function () {
        // init runningAction
        var animFrames2 = [];
        // num equal to spriteSheet
        for (var i = 1; i < 2; i++) {
            var str = "runner" + i + ".png";
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
            animFrames2.push(frame);
        }

        var animation = cc.Animation.create(animFrames2, 0.1);
        this.runningAction = cc.RepeatForever.create(cc.Animate.create(animation));
        this.runningAction.retain();
    },
    setBody:function (body) {
this._body = body;
},
getBody:function () {
return this._body;
},

    });