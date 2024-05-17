const projectData = [
    {
        projectName : "Color Changer",
        projectDescription : "This is a simple color changer app that changes the background color of the page on click of a button.",
        folderName : "color_changer",
        projectImage : "color_changer.png"
    },
    {
        projectName : "BMI Calculator",
        projectDescription : "This is a BMI calculator that calculate BMI using height and weight",
        folderName : "BMI_calculator",
        projectImage : "Bmi_calculator.png"
    },
    {
        projectName : "Digital Clock",
        projectDescription : "This is a Digital clock That shows the local time",
        folderName : "Digital_clock",
        projectImage : "Digital_clock.png"
    },
    {
        projectName : "Guess The Number",
        projectDescription : "This is a Game to Guess The Random Number",
        folderName : "GuessTheNumber",
        projectImage : "GuessTheNumber.png"
    },
    {
        projectName : "Keyboard Track",
        projectDescription : "This Keyboard Key tracker That shows the key and keyCode",
        folderName : "keyboard_track",
        projectImage : "keyboard_track.png"
    },
    {
        projectName : "Scroll Indicator",
        projectDescription : "This Scroll Indicator That shoes the scrolling progress",
        folderName : "scroll_indicator",
        projectImage : "scroll_indicator.png"
    },
    {
        projectName : "Automatic Background Changer",
        projectDescription : "This is change The Background color every 1 second when start button will click and stop changing Background color",
        folderName : "BgColor_changer_auto",
        projectImage : "BG_color_auto.png"
    },
    {
        projectName : "Github User Data Fetch",
        projectDescription : "This is small project to fetch Users Data from github using fetch()",
        folderName : "API_project/fetch.html",
        projectImage : "API.png"
    },

]



const contentLeft = document.getElementById("contentLeft");
const contentRight = document.getElementById("contentRight");
const verticalLine = document.getElementById("verticalLine");
let topVal = 160;
let turn = "right";

projectData.forEach((projectObject, index) =>{

if (turn === "right") {
  contentLeft.innerHTML += `<div id="project${index+1}" class="projectContainer">
            <h1>${projectObject.projectName}</h1>
            <p>${projectObject.projectDescription}</p>
        </div>`;

  contentRight.innerHTML += `<div class="projectImage" id="project${index+1}Img">
            <span class="tooltip">${projectObject.projectName}</span>
           <a href="/${projectObject.folderName}" target="_blank"><img src="images/${projectObject.projectImage}"></a> 
        </div>`;

  verticalLine.innerHTML += `<div class="horizontalRight horizontalLine" id="right${index+1}" style="top: ${topVal}px;">
            <div class="circle"></div>
        </div>`;

  turn = "left";
} else {
  contentLeft.innerHTML += `<div class="projectImage" id="project${index+1}Img">
            <span class="tooltip">${projectObject.projectName}</span>
           <a href="/${projectObject.folderName}" target="_blank"><img src="images/${projectObject.projectImage}"></a> 
        </div>`;

  contentRight.innerHTML += `<div id="project${index+1}" class="projectContainer">
            <h1>${projectObject.projectName}</h1>
            <p>${projectObject.projectDescription}</p>
        </div>`;

  verticalLine.innerHTML += `<div class="horizontalLeft horizontalLine" id="left${index+1}" style="top: ${topVal}px;">
            <div class="circle"></div>
        </div>`;

  turn = "right";
}

topVal += 307
})

// searchBtn fuctionality
const inputField = document.getElementById('search');

const searchBtn = document.getElementById('searchBtn')
// console.log(input);
searchBtn.addEventListener('click', (e) => {


    if (inputField.className !== "hideSearch") {
        inputField.value === "" ? inputField.classList.add('hideSearch') : searchContent()
    }else{
        inputField.classList.remove("hideSearch");
    }
})

function searchContent(){
const searchVal = inputField.value.trim().toLowerCase()
let isAvilable;

projectData.forEach((data, index) =>{
    if (data.projectName.toLowerCase() === searchVal){
        if (index == 0) {
            isAvilable = "#"
        }else isAvilable = index;
    }
})


if (isAvilable) {
let projectNum = `project${isAvilable}`

    if (projectNum === "project#") {
     projectNum =  " "
    }
    
    location.href = `${location.href.slice(0, location.href.lastIndexOf("/"))}/#${projectNum}`

    
}else alert("Can't Find")

}


// show suggestion functionality
const suggestionField = document.getElementById("suggestions");
const suggestionContainer = document.querySelector("#suggestions ul");

inputField.addEventListener('keyup', showSuggestion)

function showSuggestion(){
let arrayOfProjectName = [];
projectData.forEach((projectObj) => {
  arrayOfProjectName.push(projectObj.projectName.toLowerCase());
});

const searchKeyword = inputField.value.trim().toLowerCase();
if (searchKeyword == "") {
    suggestionField.style.display = "none"
}else {
    const keywordArray = arrayOfProjectName.filter((keyword) => keyword.match(searchKeyword));
    suggestionContainer.innerHTML = ""

        keywordArray.forEach((keyword) =>{
            let li = document.createElement('li')
            li.textContent = keyword
            suggestionContainer.appendChild(li)
            suggestionField.style.display = "block"
        })

}

}


suggestionContainer.addEventListener('click', (e) =>{
    if (e.target.tagName === "LI") {
       inputField.value = e.target.innerText
       searchContent()
       clearAll()
    }

    
})


function clearAll(){
    inputField.classList.add('hideSearch')
    suggestionField.style.display = "none"
}