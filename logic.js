$(document).ready(function () {

    // Saves the original stats start
    var statPrime = $(".pointList").html();

// *******************************************************//
    // ALL THIS IS FOR STOPWATCH
    //  Will be assigned setInterval  for clock run
    var intervalId;

    // Used to stop and go the watch
    var clockRunning = false;

    // Our stopwatch object
    var stopwatch = {

        time: 15,

        reset: function () {

            stopwatch.time = 15; //Seconds
            // DONE: Change the "display" div to "00:30."
            $("#timeDisplay").html("00:15");
            stopwatch.stop();
        },
        start: function () {
            // DONE: Use setInterval to start the count here and set the clock to running.
            if (!clockRunning) {
                intervalId = setInterval(stopwatch.count, 1000);
                // This sets the path for generating the questions
                gameChanger.Generate();
                // Keeps the clock running
                clockRunning = true;
            }
        },
        stop: function () {
            // Use clearInterval to stop the count here and set the clock to not be running.
            clearInterval(intervalId);
            clockRunning = false;
        },
        count: function () {
            // increment time by 1
            stopwatch.time--;
            // Get the current time, pass that into the stopwatch.timeConverter function,
            //       and save the result in a variable.
            var converted = stopwatch.timeConverter(stopwatch.time);

            // DONE: Use the variable we just created to show the converted time in the "display" div.
            $("#timeDisplay").text(converted);
            if(converted === "00:00"){              
                // Stops clock at 00:00
                gameChanger.answerCheck(5,5);
            }
        },
        timeConverter: function (t) {

            var minutes = Math.floor(t / 60);
            var seconds = t - (minutes * 60);

            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            if (minutes === 0) {
                minutes = "00";
            }
            else if (minutes < 10) {
                minutes = "0" + minutes;
            }
            return minutes + ":" + seconds;
        }
    };
// *******************************************************//
    // Questions: NOTE: FIRST ANSWER IS CORRECT
    var triviaLists = {
        1: ['What dinosaur name means "fast thief?"',
            {
                answers: ["VELOCIRAPTOR",
                    "PTERONODON",
                    "SINOCALLIOPTERYX",
                    "NANOTYRANNUS"]
            }
        ],
        2: ['What dinosaur fossil was originally mistaken for a type of bison?',
            {
                answers: ["TRICERATOPS",
                    "BUFFALOSAURUS",
                    "STEGOSAURUS",
                    "ALLOSAURUS"]
            }
        ],
        3: ['When did dinosaurs become extinct?',
            {
                answers: ["65 MILLION YEARS AGO",
                    "7 MILLION YEARS AGO",
                    "2 BILLION YEARS AGO",
                    "THEY'RE NOT"]
            }
        ],
        4: ['What were the direct ancestors of the dinosaurs?',
            {
                answers: ["ARCHOSAURS",
                    "EUKARYOTES",
                    "SILESAURS",
                    "SAPHEOSAURS"]
            }
        ],
        5: ['What was the lifespan of a T. rex?',
            {
                answers: ["20 TO 30 YEARS",
                    "1 TO 1000 YEARS",
                    "50 TO 60 YEARS",
                    "THEY DON'T DIE"]
            }
        ],
        6: ['The meteor that many scientists believe killed the dinosaurs struck in what modern-day country?',
            {
                answers: ["MEXICO",
                    "UNITED STATES",
                    "NARNIA",
                    "SOUTH AFRICA"]
            }
        ],
        7: ['Which of the following dinosaurs had a giraffe-like neck?',
            {
                answers: ["BRACHIOSAURUS",
                    "GIRAFFASOUR",
                    "DADDYLONGNECK",
                    "ANKYLOSAURUS"]
            }
        ],
        8: ['What is the only dinosaur lineage to survive the mass extinction event?',
            {
                answers: ["BIRDS",
                    "TARANTULAS",
                    "MAMMOTH",
                    "FISH"]
            }
        ],
        9: ['Which dinosaur had fifteen horns?',
            {
                answers: ["KOSMOCERATOPS",
                    "DIABLOCERATOPS",
                    "TRICERATOPS",
                    "SPIKATOPS"]
            }
        ],
        10: ['Which dinosaur had the smallest brain for its body size?',
            {
                answers: ["STEGOSAURUS",
                    "T. REX",
                    "BRAINASAURUS",
                    "TRICERATOPS"]
            }
        ],
        11: ['What fossil hunter theorized that bezoar stones were fossilized feces?',
            {
                answers: ["MARY ANNING",
                    "T. STARK",
                    "BARNUM BROWN",
                    "LUIS ALVAREZ"]
            }
        ],
        12: ['Which of the following dinosaurs was toothless?',
            {
                answers: ["OVIRAPTOR",
                    "DENTASAURUS",
                    "DIPLODOCUS",
                    "COMPSOGNATHUS"]
            }
        ],
        13: ['What would a sauropod use gastroliths for?',
            {
                answers: ["TO AID IN DIGESTION",
                    "TO SHARPEN ITS CLAWS",
                    "TO ATTRACT A MATE",
                    "TO FIGHT CRIME"]
            }
        ],
        14: ['What was the first mounted dinosaur skeleton?',
            {
                answers: ["HADROSAURUS",
                    "STEGOSAURUS",
                    "IGUANODON",
                    "T. REX"]
            }
        ],
        15: ['What was the wingspan of the smallest known pterodactyl?',
            {
                answers: ["10 METERS",
                    "AFRICAN OR EUROPEAN?",
                    "10 INCHES",
                    "10 FEET"]
            }
        ],
        16: ['How many teeth did the Nigersaurus have?',
            {
                answers: ["500",
                    "92",
                    "100",
                    "28.9 DEPENDING..."]
            }
        ],
        17: ['What was the first dinosaur to be discovered?',
            {
                answers: ["MEGALOSAURUS",
                    "T. REX",
                    "GIGANOTOSAURUS",
                    "DARWINASAUR"]
            }
        ],
        18: ['What dinosaur name means "covered lizard?"',
            {
                answers: ["STEGOSAURUS",
                    "ANKYLOSAURUS",
                    "TRICERATOPS",
                    "SLYTHERIZARD"]
            }
        ],
        19: ['What dinosaur is believed to have weighed up to 110 tons?',
            {
                answers: ["ARGENTINOSAURUS",
                    "COLUMBIOSAURUS",
                    "SUMOSAURUS",
                    "GARGANTISAUR"]
            }
        ],
        20: ['How long were the arms of an average Tyrannosaurus Rex?',
            {
                answers: ["1 METER",
                    "3 METER",
                    "1/2 METER",
                    "3/8 METER"]
            }
        ],
    };
// *******************************************************//
// IT BEGINS --> QUESTION RANDOMIZER
// variables for statistics
var wrongPoints = 0;
var correctPoints = 0;
var timedPoints = 0;
var questionsAsked = 0;

    var gameChanger = {
        startGame:function(){
            $(".answerHolder").empty();
            $(".questionHolder").html('<button id = "start">Play</button>');
            stopwatch.reset();
        },
        statReset:function(){
            // overwrites with original stats
            $(".pointList").html(statPrime);
            // reset point variables
            wrongPoints =0;
            correctPoints = 0;
            timedPoints = 0;
        },
        Generate: function () { 

            var questionUp = gameChanger.Randomizer(triviaLists);
            $(".questionHolder").html('<h2>'+triviaLists[questionUp][0]+'</h2>');
           
            //Empty answer so for the new set
            $(".answerHolder").empty();

            // this will determine what order the answers are listed. They will be reshuffled.
            // The array will come back in a shuffle and they will print in that order.
            questionOrder = [0,1,2,3];
            questionOrder = (gameChanger.shuffleArray(questionOrder));
            console.log("Shuffled Answer ORDER:"+questionOrder+" -->NOTE: 0 is the correct answer");
            //This will label each button
            var questionLabel = ["A) ","B) ","C) ","D) "]
            
            // This creates the button list. The questionLabel array is attached to do A-D and then the object answers
            for(var k = 0;k<questionOrder.length;k++){ 
                //This append the shuggled answers for each object
                $(".answerHolder").append('<button class="answerButton" id="'+questionUp+'" value="'+questionOrder[k]+'">'+questionLabel[k]+triviaLists[questionUp][1].answers[questionOrder[k]]+'</button></br>');
            }         
        },
        Randomizer: function (obj) {
            // This randomly picks a question in the trivialist property. It doesn't matter what the object size is.
            var result;
            var count = 0;
            for (var prop in obj)
                if (Math.random() < 1 / ++count)
                    result = prop;
            return result;
        },
        shuffleArray: function(array) {
            // Durstenfeld's method. Shuffles the array which determines in what order to print the answers
            for (var i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1)); 
                [array[i], array[j]] = [array[j], array[i]]; // swap variables
            }
            return array;
        },
        timedOut:function(questionNum){
            $(".flip--back").html('<img class = "timedOut" src="images/timeout.png"/>');
            $(".flip--back").append('<h4> Timed Out! </br> Correct Answer:'+triviaLists[questionNum][1].answers[0]+'</h4>');
            
            // Update timed out points
            timedPoints ++;
            $("#timedPoints").html(timedPoints);
            // Go to next question. Stop watch for delay
            stopwatch.stop();
            setTimeout(gameChanger.nextQuestion, 1000 * 2);
        },
        answerCheck:function(questionNum,answerChoice){
            // we compare the answer value which states what option it was to the original correct answer of the object
            
            $(".card").addClass("is-flipped");
            if( answerChoice === "1" || answerChoice === "2" || answerChoice === "3"){
                $(".flip--back").html('<img class = "wrong" src="images/wrong.png"/>');
                $(".flip--back").append('<h4> Incorrect! </br> Correct Answer:  '+triviaLists[questionNum][1].answers[0]+'</h4>');
                wrongPoints ++;
                $("#wrongPoints").html(wrongPoints);
            }else if(answerChoice === "0"){
                $(".flip--back").html('<img class = "correct" src="images/right.png"/>');
                $(".flip--back").append('<h4> Correct!</h4>');
                correctPoints ++;
                $("#correctPoints").html(correctPoints);
            }else {
                gameChanger.timedOut(questionNum)
            }
            // Next question PLEASE we delay it and stop the clock in the meantime
            
            stopwatch.stop();
            setTimeout(gameChanger.nextQuestion, 1000 * 2);

            console.log("Question #: "+ questionNum);
            console.log("Answer chosen: "+ answerChoice);
        },
        nextQuestion:function(){
            $(".card").removeClass("is-flipped");

             // We want the function to terminate at 10 questions.
             questionsAsked ++;
             
            if(questionsAsked === 10){
                questionsAsked = 0;
                $(".questionHolder").empty();
                $(".answerHolder").html("<h4>You got a score of "+ correctPoints/(correctPoints+wrongPoints+timedPoints)*100 +" %</h4>");
                setTimeout(gameChanger.restartGame, 1000 * 5);
            }else{ 
             // reset stopwatch
             stopwatch.reset();
            //  start it up again....
             stopwatch.start();
            }
        },
        restartGame:function(){
            // Generate Play button again
            gameChanger.startGame();
            // Reset Stats
            gameChanger.statReset();
        },
    };

    // This is how to interact with the object --> This gives the length of the object
    var size = Object.keys(triviaLists).length;


//  **************************************************************** //

    // Sets the Play button to start.
    gameChanger.startGame();
    
    // Click events

    $("body").on("click","#reset",gameChanger.restartGame); 
    
    $("body").on("click",".answerButton", function () {
        // we need the id of the button to know which question to check
        // we need the value of the button to know it's unique placement in the answers array
        questionNum = this.id;
        answerChoice = this.value;
        gameChanger.answerCheck(questionNum, answerChoice);
    });

    $("body").on("click","#start",stopwatch.start);

});