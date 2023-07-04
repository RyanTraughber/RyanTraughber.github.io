const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let score = 0;
let highScore = 0;

const brickRowCount = 9;
const brickColumnCount = 5;
const BALL_SPIN = 1; // Ball deflection off of ther paddle (0 = no spin, 1 = high spin)

//Create ball props
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 3,
    dx: 3,
    dy: -3
};

//Create paddle props
const paddle = {
    x: canvas.width / 2 -40,
    y: canvas.height -20,
    w: 80,
    h: 10,
    speed: 4,
    dx: 0
};

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

//Draw paddle on canvas
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = '#32CD32';
    ctx.fill();
    ctx.closePath();
}

//Draw the score on the canvas
function drawScore(){
    ctx.font ='20px Arial';
    ctx.fillText(`Score: ${score}` , canvas.width - 100, 30);
    ctx.fillText(`High Score: ${highScore}` , canvas.width - 147, 50);
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
    if(paddle.x + paddle.w > canvas.width){
        paddle.x = canvas.width - paddle.w;
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
    //Paddle collision
    if(
        ball.x - ball.size > paddle.x &&
        ball.x + ball.size < paddle.x + paddle.w &&
        ball.y + ball.size > paddle.y
    ){
        ball.dy = -ball.speed;

        //Modify angle
        let angle = Math.atan2(-ball.dy, ball.dx);
        angle += (Math.random() * Math.PI / 2 - Math.PI / 4) * BALL_SPIN;

        //Make sure the random number can't be too dramatic. Keep it between 30 degrees and 150 degrees
        if (angle < Math.PI / 6) {
            angle = Math.PI / 6
        } else if (angle > Math.Pi * 5 / 6 ) {
            angle = Math.PI * 5/6;
        }

        //Apply random angle to ball
        ball.dx = ball.speed * Math.cos(angle);
        ball.dy = -ball.speed * Math.sin(angle);
    }

    //Brick collision
    bricks.forEach(column => {
        column.forEach(brick => {
            if(brick.visible) {
                if(
                    ball.x - ball.size > brick.x && //Left brick side check
                    ball.x + ball.size < brick.x + brick.w && //Right brick side check
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
        if(score > highScore){
            highScore = score;
        }
        if(highScore === 45) {
            ctx.fillText(`Nice Job 😎` , canvas.width - 780, 30)
        }
        score = 0;
    }
}

//Increase score
function increaseScore() {
    score++;

    if(score % (brickRowCount * brickRowCount) === 0) {
        showAllBricks();
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

//Keyboard event handlers
document.addEventListener('keydown', Keydown);
document.addEventListener('keyup', Keyup);

//Rules and close event handlers
rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));