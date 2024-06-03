let data = getLocalData('data')
if (!data) {
    fetch('questions.json').then((res) => res.json())
    .then((questions) => {
        data = questions
        setlocalData('data', data)
    })

}

const heighestScore = getLocalData('highestScore')
if (heighestScore) {
    const div = document.createElement('div')
    div.id = "highestScore"
    div.innerHTML = `Highest Score: <span id="score">${heighestScore}</span>/<span id="totalScore">${data.length}</span>`
    document.getElementById('startMenu').appendChild(div)
}

let speakerImg = `<img src="images/speaker_unmute.png" alt="speaker_unmute">`
const speakerStatus = getLocalData('speaker')
if (speakerStatus && speakerStatus === "mute") speakerImg = `<img src="images/speaker_mute.png" alt="speaker_mute">`
if (!speakerStatus) setlocalData('speaker', 'unmute')

let currentQuestionNum;
let isPrinted = false
let isAnswered = false

// start main coding here

document.querySelector('#startMenu button').addEventListener('click', startGame)
 function startGame() {
    console.log("started...");
    resetGame()
    playSound('start')
    printTemplate()
    
    for (let i = 0; i < data.length; i++) {
        const ques = data[i];
        if (!ques.completed) {
            printQuestions(i)
            break
        }
    }

}




function printTemplate(){
    document.getElementById('container').innerHTML = `<div id="gameMenu">
    <div id="header">
        <div class="logo"><img src="images/logo.png" alt="logog"></div>
        <div id="speakerCon">${speakerImg}</div>
    </div>

    <div id="scoreBoard">
        <span id="currentQuestion"></span>/<span id="totalQuestion">${data.length}</span>
    </div>

    <div id="question">
       
    </div>

    <div id="time"> 
        00:30
    </div>

    <div id="answersContainer">

        <button class="answer">
            <span class="ans"></span>
            <span>
                <img src="images/wrong.png" alt="wrong">
                <img src="images/correct.png" alt="correct">
            </span>
        </button>

        <button class="answer">
            <span class="ans"></span>
            <span>
                <img src="images/wrong.png" alt="wrong">
                <img src="images/correct.png" alt="correct">
            </span>
        </button>

        <button class="answer">
            <span class="ans"></span>
            <span>
                <img src="images/wrong.png" alt="wrong">
                <img src="images/correct.png" alt="correct">
            </span>
        </button>

        <button class="answer">
            <span class="ans"></span>
            <span>
                <img src="images/wrong.png" alt="wrong">
                <img src="images/correct.png" alt="correct">
            </span>
        </button>

    </div>

    <div id="nextBtn">Next ></div>
</div>`
}

function printQuestions(quesNum){
    currentQuestionNum = quesNum
    document.getElementById('question').textContent =  data[quesNum].question //question printing
    
    const ans = document.querySelectorAll('.ans')
    const options = data[quesNum].options
    options.forEach((option, index) => {
        ans[index].textContent = option                                     // optons printing
    });

    document.getElementById('currentQuestion').textContent = quesNum+1     //current question number printing


isPrinted = true
}

let checkingPrinting;
function checkingStart(){
     checkingPrinting = setInterval(() => {
        if (isPrinted) {
            clearInterval(checkingPrinting)
            checkAnswer()
            mutedSpeaker()
            nextBtnListing()
        }
    }, 600);
}


function checkAnswer(){
    document.querySelectorAll('.answer').forEach((ans) =>{
     ans.addEventListener('click', () =>{
        const clickedAns = ans.querySelector('.ans').textContent
        const answer = data[currentQuestionNum].answer
        
        if (clickedAns === answer) {
         showCorrectAns('correct', answer)
         ans.classList.add("correct")
        }else {
         ans.classList.add("wrong")
           showCorrectAns("wrong", answer)
        }
     })
    })
}

function showCorrectAns(CW, answer) {
    if (CW === "wrong") {
        playSound('wrong')
        document.querySelectorAll('.answer').forEach((ans) => {
            ans.disabled = true
            const ansText = ans.querySelector('.ans').textContent
            if(ansText === answer) {
                ans.classList.add('correct')
            }
        });
    }else{
        playSound('correct')
        data[currentQuestionNum].correctAnswer = true
        setlocalData('data', data)
    }

    data[currentQuestionNum].completed = true
    setlocalData('data', data)
    isAnswered = true
}

function playSound(type){
    const audio = document.getElementById('sound')
    audio.src = `sound/${type}.mp3`
    if (getLocalData('speaker') && getLocalData('speaker') === 'unmute') {
        audio.play()
    }
}

function mutedSpeaker(){
    const speaker = document.querySelector('#speakerCon img')
    speaker.addEventListener('click', (e) =>{
        const status = e.target.alt
        if (status === 'speaker_unmute') {
            e.target.src = `images/speaker_mute.png`
            e.target.alt = `speaker_mute`
            setlocalData('speaker', 'mute')
        }else{
            e.target.src = `images/speaker_unmute.png`
            e.target.alt = `speaker_unmute`
            setlocalData('speaker', 'unmute')
        }
    })
}

function nextBtnListing(){
    document.getElementById('nextBtn').addEventListener('click', () =>{
        if (isAnswered) {
            if (data.length-1 !== currentQuestionNum) {
                printQuestions(currentQuestionNum+1)
                removeCorrection()
            }else{
                showResult()
            }
        }

        isAnswered = false
    })
}

function removeCorrection(){
    document.querySelectorAll('.answer').forEach((ans) =>{
        ans.className = "answer"
        ans.disabled = false
    })
}


function showResult(){
    let correctAnswers = 0
    let wrongAnswers = 0
    const totalQuestion = data.length
    data.map((ans) =>{
        ans.correctAnswer ? correctAnswers++ : wrongAnswers++  
    })

    const correctParsentage = Math.round((correctAnswers/totalQuestion) * 100)
    const wrongParsentage = Math.round((wrongAnswers/totalQuestion) * 100)

    document.getElementById('container').innerHTML = ` <div id="resultMenu">
    <div id="resultHeader">
        <img src="images/logo.png" alt="logo" class="logo">
        <h1>Result</h1>
    </div>

    <div id="resultContainer">
        <div id="correctParse" style="width: ${correctParsentage}%"></div>
        <div id="scores">
            <span id="answered">${correctAnswers}</span>/<span id="totalQuestion">${totalQuestion}</span>
        </div>
        <div id="correctPar">
            <img src="images/correctLine.png" alt="correctLine">
            <div class="parsentage">${correctParsentage}%</div>
        </div>
        <div id="wrongPar">
            <img src="images/wrongLine.png" alt="wrongLine">
            <div class="parsentage">${wrongParsentage}%</div>
        </div>
    </div>

    <div id="retry">
        <h2>“${getScoreQuote(correctParsentage)}”</h2>

        <button class="startBtn">
            <span class="second">
              <svg width="40px" height="18px" viewBox="0 0 66 43" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g id="arrow" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <path class="one" d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z" fill="#FFFFFF"></path>
                  <path class="two" d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z" fill="#FFFFFF"></path>
                  <path class="three" d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z" fill="#FFFFFF"></path>
                </g>
              </svg>
            </span> 
            <span class="span">retry</span>
        </button>
    </div>

    <div id="shareCon">
        <p>Share your score:</p>
        <div id="socialIcons">
            <img src="images/LinkedIn.png" alt="LinkedIn">
            <img src="images/Twitter.png" alt="Twitter">
            <img src="images/Instagram.png" alt="Instagram">
        </div>
    </div>
</div>`

const heighestScore = getLocalData('highestScore')
if (!heighestScore || heighestScore < correctAnswers) {
    setlocalData('highestScore', correctAnswers)
}

document.querySelector('#retry .startBtn').addEventListener('click', startGame)
}


function setlocalData(key, value){
   localStorage.setItem(key, JSON.stringify(value))
}

function getLocalData(key){
    return JSON.parse(localStorage.getItem(key))
}

function resetGame(){
    isPrinted = false
    checkingStart()

    data = getLocalData('data')
let completedNum = 0
data.map((ques) =>{
    if (ques.completed) {
        completedNum++
    }
})

if (completedNum === data.length) {
    data.map((ques) =>{
        ques.completed = false
        ques.correctAnswer = false
    })

    setlocalData('data', data)
}else return
}

function getScoreQuote(score) {
    if (score < 30) {
        return "Every mistake is a lesson. Keep learning and growing!";
    } else if (score < 60) {
        return "Good effort! Keep pushing, you're getting there!";
    } else if (score < 80) {
        return "Well done! You're on the right track!";
    } else if (score < 90) {
        return "Excellent work! You're almost there!";
    } else{
        return "Outstanding! You’ve mastered this!";
    }
}


function timingCheck(){
    
}