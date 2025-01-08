var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var level = 0;

var userClickedPattern = [];

var start = false;

$(".btn").click(function () {
    var randomChoseColor = $(this).attr("id");
    userClickedPattern.push(randomChoseColor);
    playSound(randomChoseColor);
    animatePress(randomChoseColor);
    checkAnwser(userClickedPattern.length - 1);
})


$(document).keydown(function () {
    $("h1").text("level " + level);

    if (!start) {
        start = true;
        setTimeout(function () {
            nextSequence();
        }, 100);
    }
});


function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);
    $("#" + randomColor).fadeOut(100).fadeIn(100);
    playSound(randomColor);
    animatePress(randomColor);
    console.log("系统" + gamePattern);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed")
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}




function checkAnwser(currentLevel) {

    console.log("我" + userClickedPattern);
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }

    else {
        level = 0;
        console.log("wrong");
        start = false;
        $("h1").text("Game Over, Press Any Key to Play Again");
        gamePattern = [];
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 1500);
    }
}