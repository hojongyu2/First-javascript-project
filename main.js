//variables
let startButton = document.querySelector("#startButton");
let wordArea = document.querySelector('#wordArea');
let inputText = document.querySelector('#input');
let area = document.querySelector('#area');
let time = document.querySelector('#time');
let score = document.querySelector('#score');
let medium = document.querySelector('#medium');


// music variable
let startMusic = new Audio('music/start.mp3');
let extremeMusic = new Audio('music/extreme.mp3');
let click = new Audio('music/click2.wav');

// set default game level
let timeNum = 60;
time.innerText = timeNum;

// set default life
let zero = 0;
score.innerText = zero;

//100 random words
let words = ['inexpensive', 'ghost', 'volleyball', 'scandalous', 'tiny', 'serve', 'shrill', 'wretched', 'energetic', 'pencil', 'dear', 'naive'
    , 'tie', 'bump', 'womanly', 'barbarous', 'juvenile', 'brief', 'report', 'aromatic', 'married', 'noisy', 'obscene', 'moor', 'pancake', 'slimy', 'adamant'
    , 'yummy', 'concern', 'handsomely', 'wooden', 'snails', 'unsightly', 'wet', 'mellow', 'worry', 'polish', 'shock', 'scrape', 'pear', 'flock', 'sheet', 'science'
    , 'better', 'rotten', 'basin', 'puzzled', 'jumpy', 'pass', 'parcel', 'curtain', 'doubt', 'disillusioned', 'yak', 'mix', 'connect', 'blushing', 'clip', 'two', 'ice'
    , 'humorous', 'delirious', 'pause', 'red', 'list', 'stingy', 'realize', 'violet', 'old', 'oil', 'offbeat', 'van', 'amazing', 'boring', 'pack', 'lackadaisical'
    , 'faulty', 'painstaking', 'bless', 'fine', 'pizzas', 'doubt', 'weary', 'zip', 'chubby', 'spell', 'picture', 'river', 'weary', 'acoustic', 'ants', 'gaping'
    , 'frogs', 'plug', 'awesome', 'hands', 'shiny', 'earthquake', 'zephyr', 'bee'];


//to know the sequence of newly created random word from createDiv function
let newWords = [];
// console.log(newWords);

//function to get random words without duplicates
function getRandom(data) {
    let random = data[Math.floor(Math.random() * data.length)];
    let noRepeat = data.indexOf(random);
    return data.splice(noRepeat, 1);
};

//function to create new word div with random word at random location
function createDiv() {
    
    let createDivInterval = setInterval(function(){
        let random = getRandom(words);
        let leftWidth = Math.round(Math.random() * 1350) // to appear random location in browser when created.
        // console.log(leftWidth);
        let wordDiv = document.createElement('div');
        wordDiv.style.fontSize = '30px';
        wordDiv.id = 'random-word';
        wordDiv.style.marginLeft = leftWidth + 'px';
        wordDiv.innerText = random;
        wordDiv.style.position = 'absolute'; // use absolute position so that word does not affect layout.
        wordArea.appendChild(wordDiv);
        
        // to prevent the word to appear outside of the play area.
        if (leftWidth > 1300) {
            wordDiv.style.marginLeft  = (leftWidth - 1000) + 'px';
        } else {
            wordDiv.style.marginLeft = leftWidth + 'px';
        };
        //if words array length and new array is same, then stop create new div
        if (newWords.length === words.length){
            clearInterval(createDivInterval);
        };
        // when new div is created, push it to the new array so that I know what order it was created.
        newWords.push(wordDiv);        
        // console.log(newWords);
    },1000);
};
function createDivExtreme() {
    let answer = document.querySelector("#answer")
    let body = document.querySelector('body');
    let div = document.querySelector('div');
        body.style.backgroundColor = 'white';
        area.style.backgroundColor = 'black';
        area.style.borderColor = 'white';
        answer.style.borderColor = 'white';
        div.style.color = 'red';
        
       

    let createDivInterval = setInterval(function(){

        let leftWidth = Math.round(Math.random() * 1350) // to appear random location in browser when created.
        console.log(leftWidth);
        let wordDiv = document.createElement('div');
        wordDiv.style.fontSize = '30px'
        wordDiv.classList = 'extreme';
        wordDiv.style.color = 'white';
        wordDiv.style.marginLeft = leftWidth + 'px';
        wordDiv.innerText = getRandom(words);
        wordDiv.style.position = 'absolute'; // use absolute position so that word does not affect layout.
        wordArea.appendChild(wordDiv);
        
        // to prevent the word to appear outside of the play area.
        if (leftWidth >= 1300) {
            // alert('hi');
            wordDiv.style.marginLeft  = (leftWidth - 1200) + 'px';
        } else {
            wordDiv.style.marginLeft = leftWidth + 'px';
        };
        //if words array length and new array is same, then stop create new div
        if (newWords.length === words.length-1){
            clearInterval(createDivInterval);
        };
        // when new div is created, push it to the new array so that I know what order it was created.
        newWords.push(wordDiv);        
        // console.log(newWords);
    },1000);
};

// an empty array that has same length of Words array and gives default height value of 5 to each index
let arrTop = [];
for (let i = 0; i < words.length; i++){
    arrTop.push(words[i])
    arrTop[i] = 10;
};
// console.log(arrTop)

// function to make word go down slowly once it is created.
function slow() {
    // default value of Y velocity
   
    // every n amount on time, this will happen
    let move = setInterval(function (){
        
        for (let i=0; i < newWords.length; i++){
            newWords[i].style.top = arrTop[i] + 'px';
            //add value to the individual y velocity 
            arrTop[i] += 10;
            // remove word if it hits bottom
            if (arrTop[i] >= 730){
                newWords[i].remove();
            };// when last word hits bottom, it will reload
        };
        
    }, 500);
};
// function to make word go down faster than function slow once it is created.
function fast() {
   
    // every n amount on time, this will happen
    let move = setInterval(function (){
        
        for (let i=0; i < newWords.length; i++){
            newWords[i].style.top = arrTop[i] + 'px';
            //add value to the individual y velocity 
            arrTop[i] += 10;
            // remove word if it hits bottom
            if (arrTop[i] >= 730){
                newWords[i].remove();
                // console.log(arrTop[arrTop.length-1])
                
            };// when last word hits bottom, it will reload
            if (arrTop[arrTop.length-1] >= 730){
                clearInterval(move);
            
            };
        };
    }, 200);
};
// function to make word go down zigzagly than function slow once it is created.
function spin() {
    
    // every n amount on time, this will happen
    let move = setInterval(function (){
        
        for (let i=0; i < newWords.length; i++){
            newWords[i].style.top = arrTop[i] + 'px';
            //add value to the individual y velocity 
            arrTop[i] += 10;
            // remove word if it hits bottom
            if (arrTop[i] >= 730){
                newWords[i].remove();
                // console.log(arrTop[arrTop.length-1])
            };// when last word hits bottom, it will reload
            if (arrTop[arrTop.length-1] >= 730){
                clearInterval(move);
            };
            
        };
    }, 100);
};

//eventListerener when input value is equal to the word, then remove it.
inputText.addEventListener('input', function(){
        for (let i=0; i < newWords.length; i++){
            if (inputText.value === newWords[i].innerText){
                //to remove only words that is matching with input value
                click.play();
                wordArea.removeChild(newWords[i]);
                inputText.value = '' // refresh text input 
                zero++;
                score.innerText = zero;
            };
        };
});

//eventListerener to start game
startButton.addEventListener("click", function () {
    if (medium.checked === true){
        createDiv();
        fast();
        startMusic.play();
    } else if (extreme.checked === true){
        createDivExtreme();
        spin();
        extremeMusic.play();
    } else {
        createDiv();
        slow();
        startMusic.play();
    }
    // button is disabled after it is clicked
    startButton.style.display = 'none';
    //game will end if time hits zero
        setInterval(function(){
        timeNum -= 1;
        time.innerText = timeNum;
        if (timeNum === 0){
            let WPS = score.innerText / 60
            alert('Your WPS is : ' + WPS.toFixed(1) + ' words per secsonds');
            location.reload();
        };
    },1000);
});
////////////////////////////////////////////////

