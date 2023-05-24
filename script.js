/*Modal Window*/

/*Get the yes button*/
const start = document.getElementById('start');
/*Get the Modal Window*/
const modal_container = document.getElementById('modal_container');
/*Get the no button */
const close = document.getElementById('close');

/*When yes button is pressed, do this*/
start.addEventListener('click',() => {
    modal_container.classList.add('close')
});

/*When no button is pressed, remove program*/
close.addEventListener('click',() => {
    document.getElementsByTagName ('html') [0] .remove ();
});

/* Starting guess the number game */

/* Track mistakes */
var attempt = 10;
var score=0;
var highscore=0;
/* winningNumber variable is assigned when the game starts*/
var winningNumber=Math.floor(Math.random() * 101)+1;

/*Check number by showing in console */
console.log(winningNumber)

/* set game_msg to a variable for easy access*/
const game_msg = document.getElementById('game_msg');
/*The img */
const stat_img = document.getElementById('status');

/*Declare score board*/
var tries=document.getElementById('try');
var score_track=document.getElementById('Score');
var hscore_track=document.getElementById('HighScore');
tries.innerHTML=(`Attempt: ${attempt}`)
score_track.innerHTML=(`Score: ${score}`)
hscore_track.innerHTML=(`High Score: ${highscore}`)

/*Guess Array */
var guessArray=[]
var guesses=document.getElementById('guesses');

/* Get the check button*/
var check = document.getElementById('check');
check.addEventListener('click',() => {
    /* get the value of the input*/
    const user_input = document.getElementById('userInput').value;
    guessArray.push(user_input);  
    guesses.innerHTML=guessArray;

    /*If duplicate*/
    const tofindDuplicates = guessArray => guessArray.filter((item,index) => guessArray.indexOf(item)!=index )
    const duplicateElements = tofindDuplicates(guessArray);

    /*Catch user input going wrong */
    try { 
        if(user_input == "")  throw "is Empty";
        if(isNaN(user_input)) throw "not a number";
        if(user_input<1) throw "please use a number between 1 and 100";
        if(user_input>100) throw "please use a number between 1 and 100";
      }

     catch(err) {
          game_msg.innerHTML = err;
          stat_img.src='images/wrong.png';
          document.getElementById("userInput").value = "";
         if(duplicateElements.length!=0){
        game_msg.innerHTML = `You guessed this number! Please try a different one.`;
        guessArray.pop();
        }
         
     }

      /*If guessed low */
      if(user_input<winningNumber && user_input>0){
        document.getElementById("userInput").value = "";
         game_msg.innerHTML = "too low";
         if(duplicateElements.length!=0){
            game_msg.innerHTML = `You guessed this number! Please try a different one.`;
            guessArray.pop();
        }
        if(duplicateElements.length==0){
            attempt=attempt-1;}
            highscore=score;
            document.getElementById("game-window").style.backgroundColor = 'lightsalmon';
            score=0;
            hscore_track.innerHTML=(`High Score: ${highscore}`)
            score_track.innerHTML=(`Score: ${score}`)
            tries.innerHTML=(`Attempt: ${attempt}`)
            stat_img.src='images/wrong.png';
      }
      /*If guessed high */
      if(user_input > winningNumber && user_input<101){
        document.getElementById("userInput").value = "";
        game_msg.innerHTML = "too high";
        document.getElementById("game-window").style.backgroundColor = 'lightsalmon';
        if(duplicateElements.length!=0){
            game_msg.innerHTML = `You guessed this number! Please try a different one.`;
            guessArray.pop();
        }
        if(duplicateElements.length==0){
            attempt=attempt-1;
        }
        highscore=score;
        document.getElementById("game-window").style.backgroundColor = 'lightsalmon';
        score=0;
        hscore_track.innerHTML=(`High Score: ${highscore}`)
        score_track.innerHTML=(`Score: ${score}`)
        tries.innerHTML=(`Attempt: ${attempt}`)
        stat_img.src='images/wrong.png';
      }
        /*If guessed right */
     if(user_input==winningNumber){
        guessArray=[];
        document.getElementById("userInput").value = "";
        game_msg.innerHTML = `You guessed it! My number was ${winningNumber}`;
        score=score+1;
        document.getElementById("game-window").style.backgroundColor = 'lightgreen';
        score_track.innerHTML=(`Score: ${score}`)
        hscore_track.innerHTML=(`High Score: ${highscore}`)
        tries.innerHTML=(`Attempt: ${attempt}`)
        stat_img.src='images/win.png';
        winningNumber=Math.floor(Math.random() * 101)+1
        /*check the new winning number */
        console.log(winningNumber);
      }

     /*gameover */
    if(attempt==0){
            document.getElementById("userInput").value = "";
            game_msg.innerHTML = (`Better luck next time. My number was ${winningNumber}. `);
            score=0;
            document.getElementById("game-window").style.backgroundColor = 'indianred';
            score_track.innerHTML=(`Score: ${score}`)
            tries.innerHTML=(`Attempt: ${attempt}`)
            stat_img.src='images/gameover.png';
            check.disabled=true;
            document.getElementById('userInput').disabled=true;
        }
    });

    /*The reset button */
    const reset = document.getElementById('reset');
    reset.addEventListener('click',() => {
        document.getElementById("game-window").style.backgroundColor = 'lightsalmon';
        document.getElementById("userInput").value = "";
        guessArray=[];
        attempt=10;
        highscore=0;
        score=0
        stat_img.src='images/thinker.png';
        score_track.innerHTML=(`Score: ${score}`)
        tries.innerHTML=(`Attempt: ${attempt}`)
        winningNumber=Math.floor(Math.random() * 101)+1
        console.log(winningNumber)
        guesses.innerHTML=guessArray;
        game_msg.innerHTML = "Guess a number";
        check.disabled=false;
        document.getElementById('userInput').disabled=false;
    });






