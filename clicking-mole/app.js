let currMoleDiv;
let currPlantDiv;
let score = 0 ;
let gameOver = false;

window.onload = function(){
    setGame();
}
function setGame(){
    for(let i = 0 ; i< 9 ; i++){
        let moleDiv = document.createElement("div");
        moleDiv.id = i.toString();
        moleDiv.addEventListener("click" , clickDiv);
        document.getElementById("board-area").appendChild(moleDiv);
    }

    setInterval(setMole , 1000); //we are calling the sotMole function in every 1 second
    setInterval(setPlant , 1500); //we are calling the sotPlant function in every 1.5 second
}

function getRandomDiv(){
    let num = Math.floor(Math.random()*9);
    return num.toString(); // make string - now we can add num as id
   
}

//to set the Mole image on the board Div
function setMole(){
    if(gameOver){
        return; // if game over is ture , then there is no neet to set the Mole
    }
    if(currMoleDiv){
        currMoleDiv.innerHTML ="";
    }
    let mole = document.createElement("img");
    mole.src ="photos/mole.png";

    let num = getRandomDiv();
    if(currPlantDiv && currPlantDiv.id == num){
        return; // if the plant is in the num(id) div , then return - means the mole will not set on that id
    }
    currMoleDiv = document.getElementById(num);
    currMoleDiv.appendChild(mole);
}

//to set the Plant image on the board Div
function setPlant(){
    if(gameOver){
        return; // if game over is ture , then there is no neet to set the Plant
    }
    if(currPlantDiv){
        currPlantDiv.innerHTML="";
    }
    let plant = document.createElement("img");
    plant.src ="photos/plant.png";

    let num =  getRandomDiv();
    if(currMoleDiv && currMoleDiv.id == num){
        return;    // if the mole is in the num(id) div , then return - means the plant will not set on that id
    }
    currPlantDiv = document.getElementById(num);
    currPlantDiv.appendChild(plant);
}

function clickDiv(){
    if(gameOver){
        return; // if game over is ture , then the user cant click the div
    }
    if(this == currMoleDiv){
        score++;
        document.getElementById("score").innerText = score.toString();
    }
    else if(this == currPlantDiv){
        document.getElementById("scoreID").innerText = `GAME OVER & THE SCORE IS :  ${score.toString()}`;
        gameOver = true;
    }
}