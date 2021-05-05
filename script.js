let buttonColours = ["green", "red", "yellow", "blue"]
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0

$("body").keypress(function(){
    if(!started){
        $("#title").text("level " + level);
        nextSequence();
        started = true;
        console.log("start game");
    }
});


function nextSequence(){
    level++;
    $("#title").text("level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    let audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();

}


$(".btn").click(function(){
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);  
    checkAnswer(userClickedPattern.lastIndexOf(userChosenColour));
    console.log(userClickedPattern.lastIndexOf(userChosenColour)); 
    
});
    
function playSound(name){
     $("#" + name).fadeIn(100).fadeOut(100).fadeIn(100);  
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
        
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    },100)

}

function checkAnswer(lastColour){
    if(gamePattern[lastColour] === userClickedPattern[lastColour]){
        // console.log(lastColour + "success");
    
        if(gamePattern.length === userClickedPattern.length){
        setTimeout(() => {
        nextSequence();
        },1000)
        userClickedPattern = [];
    }
    }else {
        let wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over")
            startOver();
        }, 200)
        $("#title").text("Game Over, Press Any Key To Restart");
    }
}

function startOver(){
    userClickedPattern = [];
    level = 0;
    gamePattern = [];
    started = false;
}