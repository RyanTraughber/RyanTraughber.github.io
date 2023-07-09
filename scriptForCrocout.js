const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const leftBtn = document.getElementById('left-btn');
const rightBtn = document.getElementById('right-btn');

let score = 0;
let highScore = 0;
let paddleCounter = 0; //For adding to the x for paddleArray

const brickRowCount = 9;
const brickColumnCount = 5;
const BALL_SPIN = 1; // Ball deflection off of ther paddle (0 = no spin, 1 = high spin)

//Create ball props
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 3,
    dx: 0,
    dy: 1
};

//Create paddle props
const paddle = {
    x: canvas.width / 2 -40,
    y: canvas.height -40,
    w: 8,
    h: 10,
    speed: 4,
    dx: 0,
    numPaddles: 10
};

//Create multiple paddles to put together
const paddleArray = [];
for (let i = 0; i < paddle.numPaddles; i++) {
    paddleArray[i] = paddleCounter;
    paddleCounter += paddle.w;
}

//Create brick props
const brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
};

//Create bricks
const bricks = [];
for (let i = 0; i < brickRowCount; i ++){
    bricks[i] = [];
    for(let j = 0; j < brickColumnCount; j++){
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
        bricks[i][j] = {x, y, ...brickInfo};
    }
}

//Draw ball on canvas
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = '#32CD32';
    ctx.fill();
    ctx.closePath();
}

//Draw paddle on canvas. Create 10 of them for different angles
function drawPaddle() {
  paddleArray.forEach(paddleGuy => {
    ctx.beginPath();
    ctx.rect((paddle.x + paddleGuy) , paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = '#32CD32';
    ctx.fill();
    ctx.closePath();
    });
}

//Draw the score on the canvas
function drawScore(){
    ctx.font ='20px Arial';
    ctx.fillText(`Score: ${score}` , canvas.width - 100, 30);
    ctx.fillText(`High Score: ${highScore}` , canvas.width - 147, 50);
    if(highScore >= 45) {
        ctx.fillText(`Nice Job 😎` , canvas.width - 780, 30)
    }
}

//Draw bricks on canvas
function drawBricks(){
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath();
            ctx.rect(brick.x, brick.y, brick.w, brick.h);
            ctx.fillStyle = brick.visible ? '#32CD32' : 'transparent';
            ctx.fill();
            ctx.closePath();
        });
    });
}

//Move paddle on canvas
function movePaddle() {
    paddle.x += paddle.dx;

    //Wall detection
    if(paddle.x + paddleArray[paddleArray.length - 1] > canvas.width){
        paddle.x = canvas.width - paddleArray[paddleArray.length - 1];
    }

    if(paddle.x < 0){
        paddle.x = 0;
    }
}

//Move ball on canvas
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    //Wall collision. Right and left
    if(ball.x + ball.size > canvas.width || ball.x - ball.size < 0){
        ball.dx *= -1; //ball.dx = ball.dx * -1
    }

    //Wall collision. Top and Bottom
    if(ball.y + ball.size > canvas.height || ball.y - ball.size < 0){
        ball.dy *= -1;
    }
    //Paddle collision for each section of the paddle
    if( //far left paddle
        ball.x > (paddle.x - 15) && //Subtracting extra because the collision was off for some reason on the sides
        ball.x < (paddle.x) &&
        ball.y + ball.size > paddle.y
    ){
        ball.dy = -ball.speed;
        angle = Math.PI * 11 /12;
        ball.dx = ball.speed * Math.cos(angle);
        ball.dy = -ball.speed * Math.sin(angle);
    } else if ( //one away from far left   
        ball.x > (paddle.x - 15) &&
        ball.x < (paddle.x + paddle.w + 7.27) && 
        ball.y + ball.size > paddle.y
    )
    {
        ball.dy = -ball.speed;
        angle = Math.PI * 10 /12;
        ball.dx = ball.speed * Math.cos(angle);
        ball.dy = -ball.speed * Math.sin(angle);
    } else if ( //two away from far left   
        ball.x > (paddle.x - 15) && 
        ball.x < (paddle.x + paddle.w + 14.54) && 
        ball.y + ball.size > paddle.y
    )
    {
        ball.dy = -ball.speed;
        angle = Math.PI * 9 /12;
        ball.dx = ball.speed * Math.cos(angle);
        ball.dy = -ball.speed * Math.sin(angle);
    } else if ( //three away from far left   
        ball.x > (paddle.x - 15) && 
        ball.x < (paddle.x + paddle.w + 21.81)&& 
        ball.y + ball.size > paddle.y
    )
    {
        ball.dy = -ball.speed;
        angle = Math.PI * 8 /12;
        ball.dx = ball.speed * Math.cos(angle);
        ball.dy = -ball.speed * Math.sin(angle);
    } else if ( //four away from far left   
        ball.x > (paddle.x - 15) &&
        ball.x < (paddle.x + paddle.w + 29.08) && 
        ball.y + ball.size > paddle.y
    )
    {
        ball.dy = -ball.speed;
        angle = Math.PI * 7 /12;
        ball.dx = ball.speed * Math.cos(angle);
        ball.dy = -ball.speed * Math.sin(angle);
    } else if ( //five away from far left   
        ball.x > (paddle.x - 15) && 
        ball.x < (paddle.x + paddle.w + 36.35) && 
        ball.y + ball.size > paddle.y
    )
    {
        ball.dy = -ball.speed;
        angle = Math.PI * 6 /12;
        ball.dx = ball.speed * Math.cos(angle);
        ball.dy = -ball.speed * Math.sin(angle);
    } else if ( //six away from far left   
        ball.x > (paddle.x - 15) && 
        ball.x < (paddle.x + paddle.w + 43.62) && 
        ball.y + ball.size > paddle.y
    )
    {
        ball.dy = -ball.speed;
        angle = Math.PI * 5 /12;
        ball.dx = ball.speed * Math.cos(angle);
        ball.dy = -ball.speed * Math.sin(angle);
    }else if ( //seven away from far left   
        ball.x > (paddle.x - 15) &&
        ball.x < (paddle.x + paddle.w + 50.89) &&
        ball.y + ball.size > paddle.y
    )
    {
        ball.dy = -ball.speed;
        angle = Math.PI * 4 /12;
        ball.dx = ball.speed * Math.cos(angle);
        ball.dy = -ball.speed * Math.sin(angle);
    }else if ( //eight away from far left   
        ball.x > (paddle.x - 15) &&
        ball.x < (paddle.x + paddle.w + 58.16) && 
        ball.y + ball.size > paddle.y
    )
    {
        ball.dy = -ball.speed;
        angle = Math.PI * 3 /12;
        ball.dx = ball.speed * Math.cos(angle);
        ball.dy = -ball.speed * Math.sin(angle);
    }else if ( //nine away from far left   
        ball.x > (paddle.x - 15) &&
        ball.x < (paddle.x + paddle.w + 65.43)&&
        ball.y + ball.size > paddle.y
    )
    {
        ball.dy = -ball.speed;
        angle = Math.PI * 2 /12;
        ball.dx = ball.speed * Math.cos(angle);
        ball.dy = -ball.speed * Math.sin(angle);
    }else if ( //10 away from far left   
        ball.x - ball.size > (paddle.x - 15) &&
        ball.x + ball.size < (paddle.x + paddle.w + 72.7 + 15)&& // also adding extra so that the right side is forgiving
        ball.y + ball.size > paddle.y
)
{
        ball.dy = -ball.speed;
        angle = Math.PI * 1 /12;
        ball.dx = ball.speed * Math.cos(angle);
        ball.dy = -ball.speed * Math.sin(angle);
}


    //Brick collision
    bricks.forEach(column => {
        column.forEach(brick => {
            if(brick.visible) {
                if(
                    ball.x - ball.size > (brick.x - 15) && //Left brick side check. Subtracting extra because the collision was off for some reason
                    ball.x + ball.size < (brick.x + brick.w + 15)&& //Right brick side check. Same as above
                    ball.y + ball.size > brick.y && //Top brick side check
                    ball.y - ball.size < brick.y + brick.h //Bottom brick side check
                ){
                    ball.dy *= -1;
                    brick.visible = false;

                    increaseScore();
                }
            }
        });
    });

    //Hit floor = lose
    if(ball.y + ball.size > canvas.height) {
        showAllBricks();
        score = 0;
    }
}

//Increase score
function increaseScore() {
    score++;

    if(score % (brickRowCount * brickColumnCount) === 0) {
        showAllBricks();
    }

    //set highscore
    if(score > highScore){
        highScore = score;
    }
}

//Make all bricks appear
function showAllBricks() {
    bricks.forEach(column => {
        column.forEach(brick => (brick.visible = true));
    });
}

//Draw everything
function draw() {
    //Clear canvas
    ctx.clearRect(0,0,canvas.width, canvas.height);

    drawBall();
    drawPaddle();
    drawScore();
    drawBricks();
}

//Update canvas drawing and animation
function update() {
    movePaddle();
    moveBall();

    //Draw everything
    draw();

    requestAnimationFrame(update);
}

update();

//Keydown event
function Keydown(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'd'|| e.key === 'D'){
        paddle.dx = paddle.speed;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft'|| e.key === 'a'|| e.key === 'A'){
        paddle.dx = -paddle.speed;
    }
}

//Keyup event
function Keyup(e){
    if(
        e.key === 'Right' ||
        e.key === 'ArrowRight' ||
        e.key === 'Left' ||
        e.key === 'ArrowLeft' ||
        e.key === 'd' || 
        e.key === 'D' || 
        e.key === 'a' || 
        e.key === 'A'
    ){
        paddle.dx = 0;
    }
}

//Virtual buttons for mouse
rightBtn.onmousedown = function(){
    paddle.dx = paddle.speed;
};
rightBtn.onmouseup = function(){
    paddle.dx = 0;
};
leftBtn.onmousedown = function(){
    paddle.dx = -paddle.speed;
};
leftBtn.onmouseup = function(){
    paddle.dx = 0;
};

//Touch buttons for mobile devices
rightBtn.ontouchstart = function(){
    paddle.dx = paddle.speed;
};
rightBtn.ontouchend = function(){
    paddle.dx = 0;
};
leftBtn.ontouchstart = function(){
    paddle.dx = -paddle.speed;
};
leftBtn.ontouchend = function(){
    paddle.dx = 0;
};

//Keyboard event handlers
document.addEventListener('keydown', Keydown);
document.addEventListener('keyup', Keyup);

//Rules and close event handlers
rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));