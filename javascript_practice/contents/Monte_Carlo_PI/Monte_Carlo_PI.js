window.addEventListener('load', init);
var canvas;
var ctx;
var SCREEN_WIDTH = 600;
var SCREEN_HEIGHT = 600;
var all_num = 0;
var in_num= 0;
var x = 100;
var y = 0;

function init() {
    canvas = document.getElementById('canvas_kun');
    ctx = canvas.getContext('2d');

    ctx.fillStyle = "rgb(0, 230, 250)";
    ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    ctx.beginPath();
    ctx.arcStyle =  "rgb(255,255,0)";
    ctx.arc(300, 300, 300, 0, Math.PI*2, false)
    ctx.stroke()
    ctx.fillStyle = "rgb(110, 200, 150)";
    SCREEN_WIDTH = 600;
    SCREEN_HEIGHT = 600;
    all_num = 0;
    in_num= 0;
    x = 100;
    y = 0;
    document.getElementById("all_point").innerHTML = all_num;
    document.getElementById("in_circle").innerHTML = in_num;
    document.getElementById("near_PI").innerHTML=""
}

function change() { 
    document.getElementById("all_point").innerHTML = all_num;
    document.getElementById("in_circle").innerHTML = in_num;
    document.getElementById("near_PI").innerHTML = 4*in_num/all_num;
}

function hit_point() { 
   

    x = 600*Math.random();
    y = 600*Math.random();
    all_num++;
    if (((x - 300) ** 2) + ((y - 300) ** 2) <= 90000) {
        in_num++;
        ctx.fillRect(x-3, y-3, 6, 6);
    } else { 
        ctx.fillStyle = "rgb(200, 10, 10)";
        ctx.fillRect(x - 3, y - 3, 6, 6);
        ctx.fillStyle = "rgb(110, 200, 150)";
    }
    
    change();

   
}

function hit_hundred() {
    for (  var i = 0;  i < 100;  i++  ) {
 
        hit_point();    
        
    }
    change();
}

function hit_million() { 
    for (  var i = 0;  i < 10000;  i++  ) {
 
        hit_point();    
        
    }
    change();
}