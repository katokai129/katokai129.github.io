window.addEventListener('load', init);
var canvas;
var ctx;
var SCREEN_WIDTH = 800;
var SCREEN_HEIGHT = 600;
var x = 0;

function init() {
    canvas = document.getElementById('canvas_kun');
    ctx = canvas.getContext('2d');

    requestAnimationFrame(update);
    
}
  
function update() {
    requestAnimationFrame(update);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(0, 230, 250)";
    ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);   
    draw();
}
function draw() {
    /* canvas要素のノードオブジェクト */
    var canvas = document.getElementById('canvas_kun');
    
    /* canvas要素の存在チェックとCanvas未対応ブラウザの対処 */
    if ( ! canvas || ! canvas.getContext ) {
      return false;
    }

    /* 2Dコンテキスト */
    var ctx = canvas.getContext('2d');
    /* 四角を描く */

    

    ctx.beginPath();
    ctx.moveTo(120, 120);
    ctx.lineTo(220+50*Math.cos(x/10), 120+50*Math.sin(x/10));
    ctx.lineTo(220+50*Math.sin(x/10), 220+50*Math.cos(x/10));
    ctx.lineTo(120, 220);
    ctx.stroke();
  
    x++;
}