window.addEventListener('load', init);
var canvas;
var ctx;
var white_num;
var black_num;
var pieces;
var ctx;
var turn=1;
var main_player_color;
var all_pieces_num;
var check_flag=0;
var cursor = {
    x: 0,
    y: 0
}
var mouse = {
    
    x: -1,
    y: -1,
    color: "black",
    isDrawing: false
};
function init() {
    
    canvas = document.getElementById('canvas_kun');
    
    if ( ! canvas || ! canvas.getContext ) {
      return false;
    }
    ctx = canvas.getContext('2d');
    all_pieces_num=4;
    pieces = [
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0,-1, 1, 0, 0, 0, 0],
              [0, 0, 0, 0, 1,-1, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
    canvas.addEventListener("mousemove", function (e) {
        //2.マウスが動いたら座標値を取得
        var rect = e.target.getBoundingClientRect();
        mouse.x = Math.floor(e.clientX - rect.left - 1);
        mouse.y = Math.floor(e.clientY - rect.top - 1);
    })
    canvas.addEventListener("mouseleave", function (e) { 
        mouse.x = -1;
        mouse.y = -1;
    }) ;
    canvas.onclick = function() {
        // ここにクリックしたら発生させる処理を記述する
        if (cursor.x != -1 && cursor.y != -1&&turn==main_player_color) {
            set_piece(cursor.x, cursor.y);
        }
        //502, 530, 99, 40
        if (502 <= mouse.x && mouse.x <= 601 && 530 <= mouse.y && mouse.y <= 570) { 
            pass();
        }
    };
    var a = Math.random() * 2;
    main_player_color = (1 < a) + (-1) * (1 >= a);
    white_num=2;
    black_num = 2;
    ctx.font = "30px 'x8y12pxTheStrongGamer'"
    requestAnimationFrame(update);
}
  
function update() {
    
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, 0, 800, 600);
    draw();
    Calculation();
    requestAnimationFrame(update);
}

function set_piece(board_x, board_y) { 
    
    if (pieces[board_y][board_x] == 0) {
        var check_data = check_direction(board_x, board_y)%100000000;
        var i;

        if (check_data){
            pieces[board_y][board_x] = turn;
            //左上
            for (i = 10000000; i <= check_data; i += 10000000) { 
                pieces[board_y - i / 10000000][board_x - i / 10000000] = turn;
                if (turn == 1) {
                    black_num++;
                    white_num--;
                } else { 
                    white_num++;
                    black_num--;
                }
            }
            check_data %= 10000000;
            //上
            for (i = 1000000; i <= check_data; i += 1000000) { 
                pieces[board_y - i / 1000000][board_x] = turn;
                if (turn == 1) {
                    black_num++;
                    white_num--;
                } else { 
                    white_num++;
                    black_num--;
                }
            }
            check_data %= 1000000;
            //右上
            for (i = 100000; i <= check_data; i += 100000) { 
                pieces[board_y - i / 100000][board_x + i / 100000] = turn;
                if (turn == 1) {
                    black_num++;
                    white_num--;
                } else { 
                    white_num++;
                    black_num--;
                }
            }
            check_data %= 100000;
            //左
            for (i = 10000; i <= check_data; i += 10000) { 
                pieces[board_y][board_x - i / 10000] = turn;
                if (turn == 1) {
                    black_num++;
                    white_num--;
                } else { 
                    white_num++;
                    black_num--;
                }
            }
            check_data %= 10000;
            //右
            for (i = 1000; i <= check_data; i += 1000) { 
                pieces[board_y][board_x + i / 1000] = turn;
                if (turn == 1) {
                    black_num++;
                    white_num--;
                } else { 
                    white_num++;
                    black_num--;
                }
            }
            check_data %= 1000;
            //左下
            for (i = 100; i <= check_data; i += 100) { 
                pieces[board_y + i / 100][board_x - i / 100] = turn;
                if (turn == 1) {
                    black_num++;
                    white_num--;
                } else { 
                    white_num++;
                    black_num--;
                }
            }
            check_data %= 100;
            //下
            for (i = 10; i <= check_data; i += 10) { 
                pieces[board_y + i / 10][board_x] = turn;
                if (turn == 1) {
                    black_num++;
                    white_num--;
                } else { 
                    white_num++;
                    black_num--;
                }
            }
            check_data %= 10;
            //右下
            for (i = 1; i <= check_data; i++) { 
                pieces[board_y + i][board_x + i] = turn;
                if (turn == 1) {
                    black_num++;
                    white_num--;
                } else { 
                    white_num++;
                    black_num--;
                }
            }
            if (turn == 1) {
                black_num++;
               
            } else { 
                white_num++;
         
            }
            change_turn();

        }
    }
    all_pieces_num++;
    
}
function invert_piece(board_x,board_y) { 
    pieces[board_y][board_x] = turn;
    
    change_turn();
}

function change_turn() { 
    if (turn == 1) {
        turn = -1;
    } else { 
        turn = 1;
    }
    console.log("black : "+black_num);
    console.log("white : "+white_num);
}

function draw() {

    draw_board();
    draw_cursor();
    draw_pieces();
    draw_pass_button();
    if (main_player_color == 1) {
        draw_black(-2, 9);
        draw_white(11, 0);
        ctx.fillText(black_num, 100, 410);
        ctx.fillText(white_num, 700, 190);
    } else { 
        draw_white(-2, 9);
        draw_black(11, 0);
        ctx.fillStyle = "rgb(51, 230, 86)";
        ctx.fillText(white_num, 100, 410);
        ctx.fillText(black_num, 700, 190);

    }
    
    
}
function draw_pass_button() { 
    ctx.fillStyle = "rgb(51, 230, 86)";
    ctx.fillRect(502, 530, 99, 40);
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(510, 535, 15, 30);
    ctx.fillRect(533, 535, 15, 30);
    ctx.fillRect(556, 535, 15, 30);
    ctx.fillRect(579, 535, 15, 30);
    ctx.fillStyle = "rgb(51, 230, 86)";
    ctx.fillRect(514, 539, 7, 7);
    ctx.fillRect(514, 550, 11, 15);
    ctx.fillRect(537, 539, 7, 7);
    ctx.fillRect(537, 550, 7, 15);
    ctx.fillRect(560, 539, 11, 7);
    ctx.fillRect(556, 550, 11, 11);
    ctx.fillRect(583, 539, 11, 7);
    ctx.fillRect(579, 550, 11, 11);
}

function draw_board() { 
    ctx.fillStyle = "rgb(51, 230, 86)";
    ctx.fillRect(0, 0, 160, 600);
    ctx.fillRect(640, 0, 160, 600);
    ctx.fillRect(200, 100, 400, 400);
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(10, 0, 140, 450);
    ctx.fillRect(650, 150, 140, 450);
    ctx.fillRect(10, 460, 140, 130);
    ctx.fillRect(650, 10, 140, 130); 
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            ctx.fillRect(206+49*i, 106+49*j, 46, 46);
        }
    }
}


function draw_pieces() { 
    for (var i = 1; i < 9; i++) {
        for (var j = 1; j < 9; j++) {
            if (pieces[i][j] == 1) {
                draw_black(j,i);
            } else if (pieces[i][j] == -1) {
                draw_white(j,i);
            }
        }
    }
}

function draw_black(board_x,board_y) { 

    draw_white((board_x),board_y);
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(170 + (49 * board_x), 70 + (49 * board_y), 20, 20);
}

function draw_white(board_x, board_y) { 
    ctx.fillStyle = "rgb(51, 230, 86)";
    ctx.fillRect(171 + (49 * board_x), 62 + (49 * board_y), 18, 36);
    ctx.fillRect(162 + (49*board_x), 71 + (49 * board_y), 36, 18);
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(165+(49*board_x), 65+(49*board_y), 30, 30);
    ctx.fillStyle = "rgb(51, 230, 86)";
    ctx.fillRect(168+(49*board_x), 68+(49*board_y), 24, 24);
    
    
}

function draw_cursor() { 
    if (206 <= mouse.x && mouse.x <= 595 && 106 <= mouse.y && mouse.y <= 495) {
        cursor.x = 1 + Math.floor((mouse.x - 204) / 49);
        cursor.y = 1 + Math.floor((mouse.y - 104) / 49);
        ctx.fillStyle = "rgb(25, 115, 43)";
        ctx.fillRect(171 + (49 * cursor.x), 62 + (49 * cursor.y), 18, 36);
        ctx.fillRect(162 + (49 * cursor.x), 71 + (49 * cursor.y), 36, 18);
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fillRect(165 + (49 * cursor.x), 65 + (49 * cursor.y), 30, 30);
        
        ctx.fillStyle = "rgb(25, 115, 43)";
        ctx.fillRect(168 + (49 * cursor.x), 68 + (49 * cursor.y), 24, 24);
        if (turn == 1) {

            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.fillRect(170 + (49 * cursor.x), 70 + (49 * cursor.y), 20, 20);
        }
    } else { 
        cursor.x = -1;
        cursor.y = -1;
    }
}

function Calculation() { 
    var x, y, max_score=0,tmp_score;
    if (turn != main_player_color) {
        

        for (i = 1; i <= 8; i++) { 
            for (j = 1; j <= 8; j++) { 
                tmp_score = Math.floor(check_direction(j, i)/100000000);

                if (max_score < tmp_score) { 
                    x = j;
                    y = i;
                    max_score = tmp_score;
                }
                
            }
        }

        if (max_score != 0) {
            set_piece(x, y);
            console.log(max_score);
            console.log(x);
            console.log(y);
        } else { 
            change_turn();
        }
       
    }
    

}

function pass() { 
    var i, j;
    for (i = 1; i <= 8; i++) { 
        for (j = 1; j <= 8; j++) { 
            if (check_direction(j, i) ) { 
                return;
            }
        }
    }
    change_turn();
}



function check_direction(board_x,board_y) { 
    var checking_x, checking_y,result=0,tmp,get_piece=0;
    if (pieces[board_y][board_x] == 0) {
        //左上
        if (pieces[board_y - 1][board_x - 1] == -(turn)) {
            checking_x = board_x - 2;
            checking_y = board_y - 2;
            tmp = 1;
            while (pieces[checking_y][checking_x] == -(turn)) {
                checking_x--;
                checking_y--;
                tmp++;
            }
            if (pieces[checking_y][checking_x] == turn) {
                result += tmp * 10000000;
                get_piece += tmp;
            }
        }
        //上
        if (pieces[board_y - 1][board_x] == -(turn)) {
            checking_x = board_x;
            checking_y = board_y - 2;
            tmp = 1;
            while (pieces[checking_y][checking_x] == -(turn)) {
                checking_y--;
                tmp++;
            }
            if (pieces[checking_y][checking_x] == turn) {
                result += tmp * 1000000;
                get_piece += tmp;
            }
        }
        //右上
        if (pieces[board_y - 1][board_x + 1] == -(turn)) {
            checking_x = board_x + 2;
            checking_y = board_y - 2;
            tmp = 1;
            while (pieces[checking_y][checking_x] == -(turn)) {
                checking_x++;
                checking_y--;
                tmp++;
            }
            if (pieces[checking_y][checking_x] == turn) {
                result += tmp * 100000;
                get_piece += tmp;
            }
        }
        //左
        if (pieces[board_y][board_x - 1] == -(turn)) {
            checking_x = board_x - 2;
            checking_y = board_y;
            tmp = 1;
            while (pieces[checking_y][checking_x] == -(turn)) {
                checking_x--;
                tmp++;
            }
            if (pieces[checking_y][checking_x] == turn) {
                result += tmp * 10000;
                get_piece += tmp;
            }
        }
        //右
        if (pieces[board_y][board_x + 1] == -(turn)) {
            checking_x = board_x + 2;
            checking_y = board_y;
            tmp = 1;
            while (pieces[checking_y][checking_x] == -(turn)) {
                checking_x++;
                tmp++;
            }
            if (pieces[checking_y][checking_x] == turn) {
                result += tmp * 1000;
                get_piece += tmp;
            }
        }
        //左下
        if (pieces[board_y + 1][board_x - 1] == -(turn)) {
            checking_x = board_x - 2;
            checking_y = board_y + 2;
            tmp = 1;
            while (pieces[checking_y][checking_x] == -(turn)) {
                checking_x--;
                checking_y++;
                tmp++;
            }
            if (pieces[checking_y][checking_x] == turn) {
                result += tmp * 100;
                get_piece += tmp;
            }
        }
        //下
        if (pieces[board_y + 1][board_x] == -(turn)) {
            checking_x = board_x;
            checking_y = board_y + 2;
            tmp = 1;
            while (pieces[checking_y][checking_x] == -(turn)) {
                checking_y++;
                tmp++;
            }
            if (pieces[checking_y][checking_x] == turn) {
                result += tmp * 10;
                get_piece += tmp;
            }
        }
        //右下
        if (pieces[board_y + 1][board_x + 1] == -(turn)) {
            checking_x = board_x + 2;
            checking_y = board_y + 2;
            tmp = 1;
            while (pieces[checking_y][checking_x] == -(turn)) {
                checking_x++;
                checking_y++;
                tmp++;
            }
            if (pieces[checking_y][checking_x] == turn) {
                result += tmp;
                get_piece += tmp;
            
            }
        }
        result += get_piece * 100000000;
    }
    return result;
}



