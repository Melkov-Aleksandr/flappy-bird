//нашли канвас

const canvas = document.getElementById('canvas');

//получили контекс канваса

const context = canvas.getContext('2d');

//Отступ

const gap = 100;

//Счет

var score = 0;

//Гравитация 

const grav = 0.6;

//Позиция птички

var birdPositionX = 10;
var birdPositionY = 150;

//Обьекы игры

const bird = new Image();
const background = new Image();
const foreground = new Image();
const obstacleUp = new Image();
const obstacleDown = new Image();

//Добавляем картинку к объектам

bird.src = "images/bird.png";
background.src = "images/background.png";
foreground.src = "images/foreground.png";
obstacleUp.src = "images/obstacleUp.png";
obstacleDown.src = "images/obstacleDown.png";

//Звуки 

var fly = new Audio();
var scoreAudio = new Audio();
fly.src = "audio/fly.mp3";
scoreAudio.src = "audio/score.mp3";

//Действия при клике

function moveup() {
    birdPositionY -= 25;
    fly.play();
}

//Действия пользователя

document.addEventListener('keydown', moveup);
document.addEventListener('click', moveup);

//Создание блоков

var obstacle = [];
obstacle[0] = {
    x: canvas.width,
    y: 0,
}

//Рисуем элементы игры в canvas

function draw() {
    //Рисуем задний фон

    context.drawImage(background, 0, 0);
 
    //Рисуем столбы по мере кординат

    for(let i = 0; i < obstacle.length; i++) {
        context.drawImage(obstacleUp, obstacle[i].x, obstacle[i].y);
        context.drawImage(obstacleDown, obstacle[i].x, obstacle[i].y + obstacleUp.height + gap);
        obstacle[i].x --;

        //Создание нового столбы после достижения координаты

        if (score <= 25) {
            if(obstacle[i].x == 50) {
                obstacle.push({
                    x: canvas.width,
                    y: Math.floor(Math.random() * obstacleUp.height) - obstacleUp.height
                })
            }
        } else {
            if(obstacle[i].x == 100) {
                obstacle.push({
                    x: canvas.width,
                    y: Math.floor(Math.random() * obstacleUp.height) - obstacleUp.height
                })
            }
        }

        //Проверка столкновения

        if(birdPositionX + bird.width >= obstacle[i].x 
            && birdPositionX <= obstacle[i].x + obstacleUp.width
            && (birdPositionY <= obstacle[i].y + obstacleUp.height
                || birdPositionY + bird.height >= obstacle[i].y + obstacleUp.height + gap)
                || birdPositionY + bird.height >= canvas.height - foreground.height) {
                    location.reload();
        }

        //Ведет счет

        if(obstacle[i].x == 5) {
            score ++;
            scoreAudio.play();
        }
    }

    //Рисуем оставшиеся элемменты

    context.drawImage(foreground, 0, canvas.height - foreground.height);
    context.drawImage(bird, birdPositionX, birdPositionY);
    
    //Реализация гравитации

    birdPositionY += grav;

    //Текс количества очков

    context.fillStyle = "#000";
    context.font = "24px Arial";
    context.fillText('Score:' + score, 10, canvas.height - 20)

    //Вызывает постоянно функцию

    requestAnimationFrame(draw)
}

//Вызываем функцию после загрузки картинок
obstacleDown.onload = draw;