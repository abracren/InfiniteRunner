//Road.js
var Road = cc.Layer.extend({
    spr: null,
    space:null,


    ctor: function () {
        this._super();
                           // this.initPhysics();

                    this.setSpritesPoints();
                            road_layer=this;
                            g_blabla=-75;

        //thi.runAction(cc.OrbitCamera.ActionCamera())
         //this.setPositionX(100);
       //this.setScale(.4);
        this.setPositionY(15);
        //this.setSkewX(5);

        //this.createRoad6();
        this.schedule(this.createRoad1, g_createSpeed);
        this.scheduleUpdate();
        // this.schedule(this.moveCurve, 0.1);
        //this.schedule(this.moveDown,1.5);

        cc.MenuItemFont.setFontSize(60);
        var menuItemPlay = cc.MenuItemFont.create("Play", this.moveDown, this);
        var menu = cc.Menu.create(menuItemPlay);
        menu.setPosition(cc.p(100, 100));
        // this.addChild(new layerTest(),10000);
        //this.addChild(menu);
        this.schedule(this.everyTick, 0.0001);


    },
    /* initPhysics:function() {
        //1. new space object 
        this.space = new cp.Space();
        //2. setup the  Gravity
        this.space.gravity = cp.v(0, 0);

        // 3. set up Walls
        //var wallBottom = new cp.SegmentShape(this.space.staticBody,
          //  cp.v(0, g_groundHight),// start point
            //cp.v(4294967295, g_groundHight),// MAX INT:4294967295
            //0);// thickness of wall
        //this.space.addStaticShape(wallBottom);
        
    },*/

    update: function () {
        // this.createRoad1();
        //this.space.step(0.0001);
              
                
                  
                    this.runAction(
cc.OrbitCamera.create(0, 1, 1,-80 ,-32.5 , 90, 0)


//cc.OrbitCamera.create(0, 1, 1, -80,-22.5 , 90, 0)

        
        
      );


        var i;
        for (i in g_segment) {

            if (g_segment[i].getPositionY() < -370) {

                var b = g_segment.indexOf(g_segment[i]);

                this.removeChild(g_segment[i], true);
                g_segment.splice(b, 1);

                //cc.log(g_curve);

            }

        }


//cc.log('com '+g_coins[0].getBoundingBox().y);
//cc.log('com '+g_player.getBoundingBox().y);
//cc.log(g_point_player[2].x)
//this.setSpritesPoints();
            var i;
            
             //cc.log(g_obstacles.length);
            //cc.log(g_scaleXwall);

                       
        },

    moveCurve: function () {
        if (g_togg == 1) {
            if (g_curve < 0.2) {
                g_curve += g_curveSpeed;

            } else {
                g_togg = 0;
            }

        }

        if (g_togg == 0) {
            if (g_curve > -0.2) {
                g_curve -= g_curveSpeed;

            } else {
                g_togg = 1;
            }

        }

    },
    
    raizN: function (x, n) {
        return Math.exp(Math.log(x) / n);
    },

    moveDown: function () {
        var b = g_segment.length - 1;
        var current_x = winSize.width / 2;
        var current_scale = 1.5;
        var dx = 0;
        var ddx = 0;
        var dif = 0;
        var difScale = 0;
        var iscurveRight = 0; //false
        var skewX = 45 / g_segment.length;

        difScale = current_scale - g_scaleX;
        var ratio = g_segment.length;
        //cc.log('ratio '+ratio);
        //var scaleUnit = difScale / (g_segment.length-1);

        var scaleUnit = .02;
        // cc.log('sC ' +scaleUnit);

        if (current_x > g_topCurve) {
            dif = current_x - g_topCurve;
        } else {
            dif = g_topCurve - current_x;
            iscurveRight = 1;
        }

        var rZ = this.raizN(dif, ratio);
        // var rS = this.raizN(80,ratio);

        for (i in g_segment) {
            if (g_segment.length <= 1000) {

                if (i <= 0) {
                if( iscurveRight == 1){
                    g_segment[i].setPositionX(current_x-1);
                   }else{
                      g_segment[i].setPositionX(current_x+1);
                    }
                    
                    // g_segment[i].setScaleX((scaleUnit*b))
                    //g_segment[i].setSkewX(-skewX*i);

                    //cc.log(i);

                } else {
                    dx = Math.pow(rZ, i);
                    //ds =  Math.pow(-rS,i)
                    //cc.log(dif);
                    //cc.log(rZ);
                    //cc.log(dx);
                    if (iscurveRight == 1) {
                        //actionTo= cc.MoveTo.create(0.1,cc.p(current_x-dx,this.y))
                        //g_segment[i].runAction(actionto);
                        g_segment[i].setPositionX(current_x - dx);
                        //g_segment[i].setSkewX(ds);
                        if (g_skew_opt == 1) {
                            g_segment[i].setSkewX(-skewX * i);
                        }

                    } else {
                        g_segment[i].setPositionX(current_x + dx);
                        //g_segment[i].setSkewX(-ds);
                        if (g_skew_opt == 1) {
                            g_segment[i].setSkewX(skewX * i);
                        }

                    }
                    //cc.log('sc2 ' +  i + ' ' +Math.pow(rS,i));

                }
            }

            g_segment[i].setPositionY(g_segment[i].y - 20);
            //                g_segment[i].setSkewX(Math.pow(rS,i));
            //g_segment[i]._setWidth(10)2
            // g_segment[i].setScaleX((scaleUnit*b));
            b--;

        }

    },
    createRoad6: function () {
        for (i = 0; i < g_end; i++) {
            sprV = cc.Sprite.create(res.vio_png);
            sprC = cc.Sprite.create(res.vio_png);
            spr = cc.Sprite.create(res.vio_png);

            sprV.setPosition(cc.p(0 + i * .5, i));
            spr.setPosition(cc.p(winSize.width / 2, i));
            sprC.setPosition(cc.p(winSize.width - i * .5, i));

            sprV.setScaleX(i * .5);
            spr.setScaleX((.5));
            sprC.setScaleX(i * .5);

            this.addChild(spr);
            //this.addChild(sprV);
            //this.addChild(sprC);

            g_segment.push(spr);

            // cc.log(winSize.width);

        }

    },
    createRoad1: function () {
        //spr =null;
        if (g_toggle ==0) {
            spr = cc.Sprite.create(res.piso5_1_png);
            g_toggle += 1;
            //cc.log(spr);
        } else if (g_toggle == 1) {
            spr = cc.Sprite.create(res.piso4_1_png);
            g_toggle += 1;

        }   else if (g_toggle == 2) {
            spr = cc.Sprite.create(res.piso3_1_png);
            g_toggle += 1;

        }
         else if (g_toggle ==3) {
            spr = cc.Sprite.create(res.piso2_1_png);
            g_toggle += 1;

        }
        else if (g_toggle == 4) {
            spr = cc.Sprite.create(res.piso1_1_png);
            g_toggle += 1;
                        g_toggle = 0;


        }

        if (g_curve > 0) {

            spr.setPosition(cc.p(winSize.width / 2 + (g_curve * g_curveAmount), g_end));
        } else {
            spr.setPosition(cc.p(winSize.width / 2 - (g_curve * -g_curveAmount), g_end));

        }
        // cc.log((winSize.width/2)-(g_curve*1000));

        //spr.setScale(.01);
        //spr._setHeight(1);
        spr.setScaleY(1);
        spr.setScaleX(.15);
        //spr.setScaleX(.1);

        //spr._setHeight((20));
        //spr._setWidth(400);

        this.addChild(spr);
        //this.addChild(sprV);
        //this.addChild(sprC);

        g_segment.push(spr);
        //cc.log(g_segment.length );
        g_topCurve = spr.x;
        g_scaleX = spr.scaleX;
        // cc.log(g_topCurve);

        this.moveDown();

    },
    setSpritesPoints:function(){
        //top points
        var i;
        var top=[20,40,50,60,80];
        var stepMiddle=[40,50,60];
        var middle=[40,50,60];
        var playerLevel = [40,50,60];
        var bottom=[40,50,60];
        
        for(i in top){
        var spr=cc.Sprite.create(res.point4_png);
        spr.setPosition(cc.p(top[i]*g_widthUnit,g_top));
        spr.setScale(.1);
        this.addChild(spr,100);
        
        g_point_top.push(spr);
        
        }
        for(i in stepMiddle){
        var spr4=cc.Sprite.create(res.point4_png);
        spr4.setPosition(cc.p(stepMiddle[i]*g_widthUnit,g_stepMid));
        spr4.setScale(.1);
        this.addChild(spr4,100);
        
        g_point_stepMiddle.push(spr4);
        cc.log(i);
        
        }
        
        for(i in middle){
        var spr2=cc.Sprite.create(res.point4_png);
        spr2.setPosition(cc.p(middle[i]*g_widthUnit,g_middle));
        spr2.setScale(1);
        this.addChild(spr2,100);
        
        g_point_middle.push(spr2);
        
        }
        
        for(i in playerLevel){
        var spr5=cc.Sprite.create(res.point4_png);
        spr5.setPosition(cc.p(playerLevel[i]*g_widthUnit,g_playerFloor));
        spr5.setScale(.1);
        this.addChild(spr5,100);
        
        g_point_player.push(spr5);
        
        }


        for(i in bottom){
        var spr3=cc.Sprite.create(res.point4_png);
        spr3.setPosition(cc.p(bottom[i]*g_widthUnit,g_bottom));
        spr3.setScale(.1);
        this.addChild(spr3,100);
        
        g_point_bottom.push(spr3);
        
        }


        },
        
        //every tick set array position to top variable:
       everyTick:function(){
       g_uno = g_point_top[1].x;
       g_dos = g_point_top[2].x;
       g_tres = g_point_top[3].x;
       
       
       g_sideLeft = g_point_top[0].x-40*g_widthUnit;
       g_sideRight = g_point_top[4].x+40*g_widthUnit;
       g_sideLeftAbs = g_point_middle[0].x-60*g_widthUnit;
       g_sideRightAbs = g_point_middle[2].x+60*g_widthUnit;

       

       
       
       

       g_suno = g_point_stepMiddle[0].x;
       g_sdos = g_point_stepMiddle[1].x;
       g_stres = g_point_stepMiddle[2].x;
       
        g_vuno = g_point_middle[0].x;
       g_vdos = g_point_middle[1].x;
       g_vtres = g_point_middle[2].x;
       
       g_puno = g_point_player[0].x;
       g_pdos = g_point_player[1].x;
       g_ptres = g_point_player[2].x;
       
       
              
       g_once = g_point_bottom[0].x;
       g_doce = g_point_bottom[1].x;
       g_trece = g_point_bottom[2].x;
       

       
       
       
       },
         /*      removeSprite: function (sprite, tagg) {
            //
            if (tagg == "coin") {
                var i = g_coins.indexOf(sprite);
                var b = g_coins_shadows_sprites.indexOf(sprite);

                g_coins.splice(i, 1);
                g_coins_shadows_sprites.splice(b, 1);


            }
            else if (tagg == "wall") {
                var i = g_walls.indexOf(sprite);

                g_walls.splice(i, 1);

            }
              else if (tagg == "shadow") {
                var i = g_coins_shadows.indexOf(sprite);

               g_coins_shadows.splice(i, 1);

            }
             else if (tagg == "shadowObstacle") {
                var i = g_obstacles_shadows.indexOf(sprite);

               g_obstacles_shadows.splice(i, 1);

            }else if (tagg == "obstacle") {
                var i = g_obstacles.indexOf(sprite);

                g_obstacles.splice(i, 1);

            }

            this.removeChild(sprite, true);

            cc.log('removed ' + tagg + ' ' + i );

        },*/


});