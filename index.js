var buttonColors = ["sand", "purple", "pink", "gray"];

var gameSequence = [];

var userClickedSequence = [];

var gameStarted = false;

var level = 0;

var soundBytes = ["bass", "chicken", "beeds", "idiot"];

$(document).keypress(function (){
  if (!gameStarted) {
    $("h2").hide();
    $("#level-and-title").text("Level " + level);
    nextSequence();
    gameStarted = true;
  }
});

$(".btn").click(function () {
  var userColorClicked = $(this).attr("id");
  userClickedSequence.push(userColorClicked);

  playSound(userColorClicked);

  animatePress(userColorClicked);

  checkSequence(userClickedSequence.length-1);
});

function checkSequence(currentLevel) {
  if (gameSequence[currentLevel] === userClickedSequence[currentLevel]) {
    console.log("success");

  if (userClickedSequence.length === gameSequence.length) {
    setTimeout(function (){
      nextSequence();
    }, 1000);
    }
  } else {
    console.log("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    $("#level-and-title").text("Game Over, Press Any Key to Restart");
    $("h2").show();
    $("h2").text("Remember to click the previous button(s) before clicking the new flashing button");
    var randomNumber = Math.floor(Math.random() * 4);
    var randomWrongSounds = soundBytes[randomNumber];
    playWrongSound(randomWrongSounds);

    startOver();
  }
}

function nextSequence() {

  userClickedSequence = [];

  level++;

  $("#level-and-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gameSequence.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
}

function playSound(randomChosenColor) {
  var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
  audio.play();
}

// function playWrongSound() {
//   var wrongAudio = new Audio("sounds/" + randomChosenColor + "1.mp3");
//   wrongAudio.play();
// }

function playWrongSound(randomWrongSounds) {
  var wrongAudio = new Audio("sounds/" + randomWrongSounds + ".mp3");
  wrongAudio.play();
}

function animatePress(randomChosenColor) {
  $("#" + randomChosenColor).addClass("pressed");

  setTimeout(function(){
    $("#" + randomChosenColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gameSequence = [];
  gameStarted = false;
}
