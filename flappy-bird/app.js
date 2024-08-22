let boardArea ;
let boardHeight = 640 ;
let boardWidth = 340 ;
let context;
//for bird
let birdWidth = 34; 
let birdHeight = 24 ; //actual ratio of the bird img in 408/228 = 34/24 = 17/12
let birdX = boardWidth/8;
let birdY = boardHeight/2; // here we fix the position of the bird image , which is at the 1/8 part of the width and 1/2 part of the height
let birdImg;

//for pipe
let pipeArray =[];
let pipeWidth = 64;
let pipeHeight = 512; // actual ration of pipe img is = 384 / 3072 = 1/8
let pipeX = boardWidth;
let pipeY = 0;
let topPipeImg;
let bottomPipeImg;

let velocityX = -2 ; //for moving left of the pipes
let velocityY = 0 ; //for bird jump
let gravity = 0.4;

let bird ={
    x : birdX,
    y : birdY,
    width : birdWidth,
    height : birdHeight,
}
window.onload = function(){
    boardArea = document.getElementById("board-area");
    boardArea.height = boardHeight;
    boardArea.width =  boardWidth;
    context = boardArea.getContext("2d");

    //drawing the bird
    // context.fillRect(birdX , birdY ,birdWidth , birdHeight); // making a rectangle for the bird image 
    //here we will fix the bird image to the rectangle
    birdImg = new Image();
    birdImg.src = "photos/flappybird.png";
    birdImg.onload =function(){
        context.drawImage(birdImg , bird.x , bird.y, bird.width , bird.height);
    }
    topPipeImg = new Image();
    topPipeImg.src = "photos/toppipe.png";

    bottomPipeImg = new Image();
    bottomPipeImg .src = "photos/bottompipe.png"

    requestAnimationFrame(update);
    setInterval(placePipes , 1500);
    document.addEventListener("keydown" ,moveBird);
}

function update(){
    requestAnimationFrame(update);
    context.clearRect(0,0, boardArea.width , boardArea.height); // to reset the frame again in loop

    //bird
    velocityY +=gravity;
    // bird.y += velocityY;
    bird.y = Math.max(bird.y +velocityY , 0);
    context.drawImage(birdImg , bird.x , bird.y , bird.width , bird.height); // to reset the bird image

    //pipes
    for(let i = 0 ; i<pipeArray.length ; i++){
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img , pipe.x , pipe.y , pipe.width , pipe.height);
    }

}
function placePipes() {
    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);//the y position of the pipe is reduce by 128 px then reduce by rnadomly
    let openingSpace = pipeHeight/4;
    let topPipe = {
        img : topPipeImg,
        x: pipeX,
        y: randomPipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed : false,
    }
    
    pipeArray.push(topPipe);

    let bottomPipe ={
        img : bottomPipeImg,
        x : pipeX,
        y : randomPipeY + pipeHeight + openingSpace,
        width : pipeWidth,
        height : pipeHeight,
        passed : false,
    }
    pipeArray.push(bottomPipe);
}
function moveBird(e){
    if(e.code == "Space" || e.code == "ArrowUP" || e.code =="KeyX"){
        //do jump
        velocityY = -6;
    }
}