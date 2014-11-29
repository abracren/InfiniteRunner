//utils.js

//Globals
g_created=0;
g_eliminated= 0;

//layers
g_playScene=null;
var g_animLayer=null;


//initiate Arrays
g_coins = [];
g_walls = [];
g_obstacles = [];
g_posX = 0;
g_posY =0;
g_pos2X = 0;
g_pos2Y= 0;



//objects
g_player=null;
//Common Variables
g_toggleCurve= 1;
g_startCurve =1;
g_obstacleCount = 2;
g_obstacleCountTop = 2;


var g_groundHight = 10;
var g_runnerStartX = 80;
var g_runnerStartY = 100;

//var g_speedObstacle = 1;
var g_wallSpeed = .15;
var g_scaleXwall =40;



//var g_repeatObstacle = .4;
var g_toggleCoins = 0;
//var g_backCount= 0;
//var g_suum= 20;
var g_widthSize= 0;
var g_widthUnit=0;
var g_position= 0;


//Z-ORDER
var g_wallZorder=70;
var g_roadObjectZorder=99;



///Frame Variables
g_wallStartFrame=0;
g_wallEndFrame=1;

//CAMERA OFFSET

cameraPosY = 0;
cameraPosX =0;

//POINT POSITIONS

var g_playerFloor=-500; //<<<<<<--------posicion Jugador ------------->>>>>>>//
g_playerFloor2=-0;

//ar
var g_top = 150;

var g_leftTop = 20;
var g_uno = 40;
var g_dos = 50;
var g_tres =60;
var g_rightTop = 80;



//Down

 g_bottom = -450;
//var g_leftBottom = -5;
g_once = -100;
g_doce = 50;
g_trece =200;
//var g_rightBottom = 105;


// Step middle
g_stepMid = 100;
g_suno=43;
g_sdos=50;
g_stres=57;

//middle

g_middle =110;
g_vuno=45;
g_vdos=50;
g_vtres=55;


//Extra

g_puno = 0;
g_pdos = 0;
g_ptres = 0;


//offset para obstaculos

var g_offsetLeft = 10;
var g_offsetRight = 10;


//ROAD

g_createSpeed=0.015; //Main Speed  <<<<<-------____----->>>>>! min 0.006
var g_speed = g_createSpeed*50;
g_start = 0; //Start of road??
g_end = 400; // top of road
g_step=1;  //que estepea??
g_toggle =1; //que togglea?
g_curveAmount = 15;
g_curveSpeed = 0.01;
//g_scaleX = 1;
g_segment = [];
g_road = [];
g_curve = 0;
g_togg = 1;
g_topCurve = 0;
g_sideLeft=0;
g_sideRight=0;
g_sideMiddle=0;
g_sideMiddle=0;

//Deprecated
//g_curveMagnitudeStart = g_leftTop;
//g_curveMagnitude = 20;
//var g_scaleSpeed = .5;

//Options

g_skew_opt=0;




function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}





