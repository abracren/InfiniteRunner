//***************PlayScene.js
//http://www.cocos2d-x.org/reference/html5-js/V3.0alpha/symbols/cc.html#.rectIntersection
//globals para set frame obstaculos y paredes
//localStorage//
//lives
//menu
//background animation
///taggs
//1001 Player
//1006 addChild(
var PlayLayer = cc.Layer.extend(

    {
        coinSprite: null,
        player2: null,
        // constructor
        ctor: function () {
            this._super();
            g_layer = this;
            g_top = 700;

            g_point_top = [];
            g_point_stepMiddle = [];
            g_point_middle = [];
            g_point_player = [];
            g_point_bottom = [];

            g_coins_shadows = [];
            g_coins_shadows_sprites = [];

            g_obstacles_shadows = [];
            g_obstacles_shadows_sprites = [];
            g_objectsToRemove = [];

            // this.setScaleX(.5);

            this.addChild(new Road(), 2);

            this.createPlayer();

            this.createUi();
            var back = cc.Sprite.create("res/back.png");
            back.setPosition(cc.p(winSize.width/2,winSize.height/2+40));
            this.addChild(back,0,60001);
            //Updates
            //update _CreateSprite each x seconds
            this.schedule(this.objFaller, g_speed / 3);
            // this.schedule(this.updateSides, g_speed /2.5);
            this.schedule(this.toogleCurve, 0.001);
            this.schedule(this.curveMaker, 0.001);

            this.scheduleUpdate();

            //Touch
            var listener1 = cc.EventListener.create({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,

                onTouchBegan: function (touch, event) {
                    var target = event.getCurrentTarget();
                    var pos = touch.getLocation();
                    g_posX = pos.x;
                    g_posY = pos.y;

                    return true;
                },

                onTouchMoved: function (touch, event) {
                    var target = event.getCurrentTarget();

                    var pos = touch.getLocation();

                    // g_angleTouch= Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;

                    g_angleTouch = Math.atan2(pos.y - g_posY, pos.x - g_posX) * 180 / Math.PI;
                    // cc.log(g_angleTouch)

                },

                onTouchEnded: function (touch, event) {

                    var target = event.getCurrentTarget();
                    var rtn = this.touchended();
                    switch (rtn) {
                    case "up":
                        cc.log("==jumping");
                        break;
                    case "down":
                        cc.log("==crouching");
                        break;

                    case "right":
                        cc.log("==righting");

                        if (g_position == 0) {
                            var actionTo = cc.MoveTo.create(.05, cc.p(60 * g_widthUnit, g_playerFloor2));
                            g_player.runAction(cc.Sequence.create(actionTo));
                            log(g_trece * g_widthUnit);
                            g_position = 1;
                            var actTo = cc.MoveTo.create(.3, cc.p(g_layer.x - 10 * g_widthUnit, g_layer.y));
                            g_layer.runAction(actTo);

                            log('==' + g_position);
                        } else if (g_position == -1) {
                            var actionTo = cc.MoveTo.create(.05, cc.p(g_widthSize / 2, g_playerFloor2));
                            g_player.runAction(cc.Sequence.create(actionTo));
                            log(g_widthSize);
                            //log(this.player.getContentSize().width);

                            g_position = 0;
                            log('==' + g_position);
                            var actTo = cc.MoveTo.create(.3, cc.p(g_layer.x - 10 * g_widthUnit, g_layer.y));
                            g_layer.runAction(actTo);

                        };
                        break;

                    case "left":
                        cc.log("==lefting");
                        if (g_position == 0) {
                            var actionTo = cc.MoveTo.create(0.05, cc.p(40 * g_widthUnit, g_playerFloor2));
                            g_player.runAction(cc.Sequence.create(actionTo));
                            log(g_once * g_widthUnit);
                            g_position = -1;
                            log('==' + g_position);
                            var actTo = cc.MoveTo.create(.3, cc.p(g_layer.x + 10 * g_widthUnit, g_layer.y));
                            g_layer.runAction(actTo);

                        } else if (g_position == 1) {
                            var actionTo = cc.MoveTo.create(0.05, cc.p(g_widthSize / 2, g_playerFloor2));
                            g_player.runAction(cc.Sequence.create(actionTo));
                            log(g_widthSize / 2);
                            g_position = 0;
                            log('==' + g_position);
                            var actTo = cc.MoveTo.create(.3, cc.p(g_layer.x + 10 * g_widthUnit, g_layer.y));
                            g_layer.runAction(actTo);

                        }

                        break;
                    case "not support":
                    case "error":
                        break;
                    }
                },
                touchended: function () {
                    //if(Z is between X and Y ))

                    //if (z >= x && z <= y)

                    if (g_angleTouch >= 45 && g_angleTouch <= 135) {
                        return "up";

                    } else if (g_angleTouch >= -135 && g_angleTouch <= -45) {

                        return "down";

                    } else if (g_angleTouch >= -44 && g_angleTouch <= 44) {

                        return "right";

                    } else if (g_angleTouch >= -180 && g_angleTouch <= -136 || g_angleTouch >= 136 && g_angleTouch <= 179) {

                        return "left";
                    }

                },

            });
            cc.eventManager.addListener(listener1, this);

        },

        update: function (dt) {
            //cc.log(g_walls.length);
            //cc.log("el"+g_eliminated);
            //cc.log('com'+g_obstacles_shadows_sprites.length);
            //cc.log(g_point_player[2].x)
            //this.setSpritesPoints();
            var i;
            // cc.log(g_startCurve);
            //cc.log(g_scaleXwall);
            var ccsize = g_player.getContentSize();
            var playerRect = cc.rect(
                g_player.x - (ccsize.width / 2),
                g_player.y - (ccsize.height / 2),
                ccsize.width + 12,
                ccsize.height + 24);

            for (i in g_coins_shadows) {

                var ccsize2 = g_coins_shadows[i].getContentSize();
                var coinRect = cc.rect(
                    g_coins_shadows[i].x - (ccsize2.width / 2),
                    g_coins_shadows[i].y - (ccsize2.height / 2),
                    ccsize2.width,
                    ccsize2.height);
                //cc.log(playerRect.width);

                if (cc.rectIntersectsRect(playerRect, coinRect)) {
                    g_objectsToRemove.push(g_coins_shadows_sprites[i]);
                    g_objectsToRemove.push(g_coins_shadows[i]);

                    g_coins_shadows_sprites.splice(i, 1);
                    g_coins_shadows.splice(i, 1);
                    //road_layer.removeSprite(g_coins_shadows_sprites[i], 'coin');
                    //road_layer.removeSprite(g_coins_shadows[i],'shadow')
                    //cc.log('colliderShadow');

                } else {
                    //  cc.log('nocoll');
                }

            }
            for (i in g_obstacles_shadows) {

                var ccsize3 = g_obstacles_shadows[i].getContentSize();
                var ObstacleRect = cc.rect(
                    g_obstacles_shadows[i].x - (ccsize3.width / 2),
                    g_obstacles_shadows[i].y - (ccsize3.height / 2),
                    ccsize3.width,
                    ccsize3.height);

                if (cc.rectIntersectsRect(ObstacleRect, playerRect)) {
                    //  g_objectsToRemove.push(g_obstacles_shadows_sprites[i]);
                    // g_objectsToRemove.push(g_obstacles_shadows[i]);
                    // g_obstacles_shadows_sprites[i].setScale(2);
                    cc.log('collider');
                    // g_obstacles_shadows_sprites.splice(i,1);
                    //g_obstacles_shadows.splice(i,1);

                } else {
                    // cc.log('nocoll');
                }
            }
            //for(i in g_obstacles){
            //if (g_obstacles[i].getPositionY() < 100) {
          
            
           //g_obstacles[i].jump();
          // cc.log(g_obstacles[i].getActions());
           //}
            
            //}
            for (i in g_obstacles_shadows_sprites) {

                if (g_obstacles_shadows_sprites[i].getPositionY() < g_playerFloor2) {
                    //cc.log('collider');

                    /*
                      g_objectsToRemove.push(g_obstacles_shadows_sprites[i]);
                   g_objectsToRemove.push(g_obstacles_shadows[i]);

                   g_obstacles_shadows.splice(i,1);
                   g_obstacles_shadows_sprites.splice(i,1);
*/
                    //set Zorder to top of player
                    this.setZorder(g_obstacles_shadows_sprites[i], 80000);
                    //cc.log()
                    var f = g_obstacles_shadows_sprites.indexOf(g_obstacles_shadows_sprites[i]);
                    //  cc.log('order ' + f);

                    // g_obstacles_shadows.splice(f, 1);
                    // g_obstacles_shadows_sprites.splice(f,1);

                } else {
                    //  cc.log('nocoll');
                }

            }

            //Remove Object loop
            for (i in g_objectsToRemove) {
                this.removeSprite(g_objectsToRemove[i], 'bla');
                g_objectsToRemove.splice(i, 1);

            }

        },

        //Create Sprite (Updates)

        objFaller: function () {

            var rail = this.selectRail();
            //cc.log(rail);

            //Define options
            if (rail == 0) {
                var randomTop = g_uno;
                var randomStepMiddle = g_suno;

                var randomMiddle = g_vuno;
                var randomPlayer = g_puno;
                var randomBottom = g_once;

            } else if (rail == 1) {
                var randomTop = g_dos;
                var randomStepMiddle = g_sdos;

                var randomMiddle = g_vdos;
                var randomPlayer = g_pdos;

                var randomBottom = g_doce;
            } else if (rail == 2) {
                var randomTop = g_tres;
                var randomStepMiddle = g_stres;

                var randomMiddle = g_vtres;
                var randomPlayer = g_ptres;

                var randomBottom = g_trece;
            }
            //Define Sprite (coin or obstacle)
            if (g_toggleCoins > 1) {
                //this.createCoin(randomTop, randomStepMiddle, randomMiddle, randomPlayer, randomBottom, 'coin');

                //this.createObstacle(randomTop, randomBottom, 'obstacle');
                g_obstacleCount = 2;

                g_toggleCoins--;
            } else {
                this.createObstacle(randomTop, randomStepMiddle, randomMiddle, randomPlayer, randomBottom, 'obstacle');
                g_obstacleCount--;
                if (g_obstacleCount == 0) {
                    g_toggleCoins = 8;
                }

            }
           

        },
        updateSides:function(){
                 this.createWall(g_sideLeft, g_sideLeftAbs, "wall", 0);
                 this.createWall(g_sideRight, g_sideRightAbs, "wall", 1);
                
        },

        selectRail: function () {
            //Select rail from 1 to 5
            //if wall
            //if Coin or Obstacle
            var randomizer = randomIntFromInterval(0, 2);
            return randomizer;

        },
        createPlayer: function () {

            cc.SpriteFrameCache.getInstance().addSpriteFrames(res.player_plist);
            this.player2 = cc.SpriteBatchNode.create(res.player_png);
            road_layer.addChild(this.player2, 200, 1001);

            this.runner2 = new Runner2(this.player2, road_layer.space);
            // runner is base on Node, addChild to make scheduleOnce and onExit call.
            //this.addChild(this.runner2);

            this.player2.setPosition(cc.p(g_widthUnit * 50, g_playerFloor2));

            //WARNING UNDERSCALED
            this.player2.setScale(.2 * g_widthUnit);
            g_player = this.player2;
            g_player.runAction(cc.OrbitCamera.create(0, 10, 0, 89, 0, 90, 0));
               // g_player.setRotation([.3,0.3,0.3]);


            // g_player.runAction(cc.OrbitCamera.create(0, 1, 1, 60, 22.5, 90, 0));

            //mirror
            //this.player2.setScaleX(-1);

        },
        createCoin: function (randomTop, randomStepMiddle, randomMiddle, randomPlayer, randomBottom, tagg) {

            cc.SpriteFrameCache.getInstance().addSpriteFrames(res.coin_plist);
            coinSprite = cc.SpriteBatchNode.create(res.coin_png);
            coinSprite = new Coin(this.coinSprite, road_layer.space);

            coinSprite.setScale(.02 * g_widthUnit);
            var shadow = cc.Sprite.create(res.point4_png);

            // coinSprite.runAction(cc.OrbitCamera.create(0, 10, 0, -65,0, 90, 0));

            coinSprite.setPosition(randomTop, g_top);
            shadow.setPosition(cc.p(randomTop, g_top));

            coinSprite.addSpr(road_layer, g_roadObjectZorder);
            coinSprite.pushThis()
            road_layer.addChild(shadow, 1, 4001);
            g_coins_shadows.push(shadow);
            // var b = g_coins_shadows.indexOf(shadow);
            coinSprite.runAction(cc.OrbitCamera.create(0, 1, 1, 60, 22.5, 90, 0));

            //coinSprite.runAction(cc.OrbitCamera.create(0, 10, 0, -65, 0, 90, 0));
            //thisone  coinSprite.runAction(cc.OrbitCamera.create(0, 1, 0, 0, -89, -90, 0));
            shadow.opacity = 0;
            //var scaleTo2 = cc.ScaleTo.create(g_createSpeed * g_segment.length * 1.5, .015 * g_widthUnit, .015 * g_widthUnit);

            var bezier = [cc.p(randomTop, g_top), cc.p(randomMiddle, g_middle), cc.p(randomPlayer, g_playerFloor)];
            var bezierTo = cc.CardinalSplineTo.create(g_createSpeed * g_segment.length * 4.1, bezier, 0);

            var bezier2 = [cc.p(randomTop, g_top), cc.p(randomMiddle, g_middle), cc.p(randomPlayer, g_playerFloor)];
            var bezierTo2 = cc.CardinalSplineTo.create(g_createSpeed * g_segment.length * 4.1, bezier2, 0);
            coinSprite.runAction(cc.Sequence.create(bezierTo,
                //cc.DelayTime.create(0.1),
                cc.CallFunc.create(this.removeSprite, this, 'coin')));
            shadow.runAction(cc.Sequence.create(bezierTo2,

                //cc.DelayTime.create(0.1),
                cc.CallFunc.create(this.removeSprite, this, 'shadow')
            ));
            g_created++;
            g_created++;

            //cc.log(g_coins);
            g_roadObjectZorder--;
            if (g_roadObjectZorder < 50) {
                g_roadObjectZorder = 99;
            }

        },
        createObstacle: function (randomTop, randomStepMiddle, randomMiddle, randomPlayer, randomBottom, tagg) {

            cc.SpriteFrameCache.getInstance().addSpriteFrames(res.obstacle_plist);
            obstacleSprite = cc.SpriteBatchNode.create(res.obstacle_png);
            obstacle = new Obstacle(this.obstacleSprite);
            obstacle.setScale(.035 * g_widthUnit);
            obstacle.setPosition(randomTop, g_top - 10);
            var shadow = cc.Sprite.create(res.point4_png);
            road_layer.addChild(shadow, 1, 4001);

            shadow.setPosition(cc.p(randomTop, g_top));

            obstacle.setAnchor(cc.p(0.5, 0));
            var shadow = cc.Sprite.create(res.point4_png);
            road_layer.addChild(shadow, 200, 4001);
            g_obstacles_shadows.push(shadow);
            obstacle.pushThis();
            g_obstacles.push(obstacle);

            obstacle.runAction(cc.OrbitCamera.create(0, 2, 0, 60, 0, 90, 0));

            obstacle.addSpr(road_layer, g_roadObjectZorder);
                        shadow.opacity = 0;

            var scaleTo = cc.ScaleTo.create(g_createSpeed * g_segment.length * 1.5, 0.10 * g_widthUnit, .10 * g_widthUnit);

            var bezier = [cc.p(randomTop, g_top), cc.p(randomMiddle, g_middle), cc.p(randomPlayer, g_playerFloor)];
            var bezierTo = cc.CardinalSplineTo.create(g_createSpeed * g_segment.length * 4.1, bezier, 0);
            var bezier2 = [cc.p(randomTop, g_top), cc.p(randomMiddle, g_middle), cc.p(randomPlayer, g_playerFloor)];
            var bezierTo2 = cc.CardinalSplineTo.create(g_createSpeed * g_segment.length * 4.1, bezier2, 0);
            //var bla =  obstacle.getActionByTag(10001);

             //cc.log(bla);

            shadow.runAction(cc.Sequence.create(
            		bezierTo2,

            		//cc.DelayTime.create(0.1),
            		cc.CallFunc.create(this.removeSprite, this, 'shadowObstacle')
            ));
            obstacle.runAction(cc.Sequence.create(
                bezierTo,
                //cc.DelayTime.create(0.1),
               cc.CallFunc.create(this.removeSprite, this, 'obstacle')
            ));
            
            g_created++;

            g_created++;
            g_roadObjectZorder--;
            if (g_roadObjectZorder < 50) {
                g_roadObjectZorder = 99;
            }

        },

        createWall: function (top, middle, tagg, mirror)
        //si necesita funciones pasar  new  a wallsprite
        {

            cc.SpriteFrameCache.getInstance().addSpriteFrames(res.wall_plist);
            wall = cc.SpriteBatchNode.create(res.wall_png);
            road_layer.addChild(wall, g_wallZorder, 1006);
            wallSprite = new Wall(wall);

            wall.runAction(cc.OrbitCamera.create(0, 2, 0, 60, 0, 90, 0));

            wall.setPosition(top, g_top);
            wall.setScale(1);

            var bezier4 = [cc.p(top, g_top), cc.p(middle, g_middle - 20), cc.p(middle, g_playerFloor - 20)];
            var bezierTo4 = cc.CardinalSplineTo.create(g_createSpeed * g_segment.length * 4.1, bezier4, 0);

            wall.runAction(cc.Sequence.create(bezierTo4, cc.CallFunc.create(this.removeSprite, this, tagg)));

            //WallZorder order
            g_wallZorder--;
            if (g_wallZorder < 50) {
                g_wallZorder = 120;
            }
            g_walls.push(this.wallSprite);

        },
        setZorder: function (spr, zOr) {

            //cc.log(spr + zOr);
            road_layer.reorderChild(spr, zOr);

        },

        removeSprite: function (sprite, tagg) {
            //
            if (tagg == "coin") {
                var i = g_coins.indexOf(sprite);
                var b = g_coins_shadows_sprites.indexOf(sprite);

                g_coins.splice(i, 1);
                g_coins_shadows_sprites.splice(b, 1);

            } else if (tagg == "wall") {
                var i = g_walls.indexOf(sprite);

                g_walls.splice(i, 1);

            } else if (tagg == "shadow") {
                var i = g_coins_shadows.indexOf(sprite);

                g_coins_shadows.splice(i, 1);

            } else if (tagg == "shadowObstacle") {
               var i = g_obstacles_shadows.indexOf(sprite);

                g_obstacles_shadows.splice(i, 1);

            } else if (tagg == "obstacle") {
                var i = g_obstacles.indexOf(sprite);
                var b = g_obstacles_shadows_sprites.indexOf(sprite);

                g_obstacles.splice(i, 1);
                g_obstacles_shadows_sprites.splice(b, 1);

            }
           road_layer.removeChild(sprite, true);
          
            g_eliminated++;

           // cc.log('removed ' + tagg + ' ' + i );

        },
        createUi: function () {

            cc.MenuItemFont.setFontSize(60);
            var menuItemPlay = cc.MenuItemFont.create("Play", this.onPlay, this);
            var menu = cc.Menu.create(menuItemPlay);
            menu.setPosition(cc.p(100, 100));
            this.addChild(menu, 10000000);

        },
        onPlay: function () {
            // cc.log('balbla');
            g_toggleCurve = 1;

            if (g_startCurve == 0) {
                g_startCurve = 1;
            } else {
                g_startCurve = 0;
            }

           // this.addChild(new menuLayer(), 10000);
           // director.pause();
           if(g_createSpeed>0.006)
           g_createSpeed-=0.001;

        },
        toogleCurve: function () {
            /*if (g_startCurve == 0)
                        {
                                g_startCurve = 0;
                        }
                        else
                        {
                                g_startCurve = 0;
                        }*/

        },
        curveMaker: function () {
            if (g_startCurve == 1) {
                if (g_toggleCurve == 1) {
                    this.curveRight();

                } else if (g_toggleCurve == 0) {
                    this.curveLeft();

                }
            } else {
                /*var g_leftTop = 20;
                var g_uno = 40;
                var g_dos = 50;
                var g_tres = 60;
                var g_rightTop = 80;*/

            }
            //cc.log(g_leftTop);
            //cc.log(g_toggleCurve);
            //cc.log(g_scaleXwall);
            //cc.log('startCurve '+g_startCurve);

        },

        curveRight: function () {
            var step = 0.1;
            if (g_leftTop <= 30) {
                g_leftTop += step;
                g_rightTop += step;
                g_curve -= step;
                 g_blabla-=0.05;
                for (i in g_point_top) {
                    g_point_top[i].x += 1;
                }
               
                //this.setPositionX(this.x+.5);

                /*g_uno += step;
                g_dos += step;
                g_tres += step;
                g_scaleXwall -= step / 1000;*/
            } else {
                g_toggleCurve = 0;
                //g_startCurve = 0;

            }

        },
        curveLeft: function ()

        {
            var step = 0.1;
            var i;

            if (g_leftTop >= 10) {
                g_leftTop = g_leftTop - step;
                g_rightTop = g_rightTop - step;
                g_curve += step;
                 g_blabla+=0.05;

                for (i in g_point_top) {
                    g_point_top[i].x -= 1;

                }
                


                //this.setPositionX(this.x-.5);
                /* g_uno -= step;
                g_dos -= step;
                g_tres -= step;
                g_scaleXwall += step / 1000;/*/

            } else {

                g_toggleCurve = 1;
                //g_startCurve =0;

            }

        },
        setScaleWall: function () {
            var executed = false;
            return function () {
                if (!executed) {
                    executed = true;
                    g_scaleXwall = 0.011;
                }
            }
        },

    });

PlayLayer.scene = function () {
    var scene = cc.Scene.create();
    var layer = new PlayLayer();
    scene.addChild(layer);
    return scene;
};