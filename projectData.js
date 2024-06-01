const projectData = [
  {
    projectName: "Guess The Number",
    projectDescription: "This is a Game to Guess The Random Number",
    folderName: "GuessTheNumber",
    projectImage: "GuessTheNumber.png",
  },
  {
    projectName: "Alarm Clock",
    projectDescription: "This is a Alarm clock There we can set Alarm",
    folderName: "Alarm_Clock",
    projectImage: "AlarmClock.png",
  },
  {
    projectName: "Search By Anthing",
    projectDescription:
      "This is a search engine where we can search anything with any provider (e.g: google, bing)",
    folderName: "Search_Engine",
    projectImage: "Search_Engine.png",
  },
  {
    projectName: "Github User Data Fetch",
    projectDescription:
      "This is small project to fetch Users Data from github using fetch()",
    folderName: "API_project/fetch.html",
    projectImage: "API.png",
  },
  {
    projectName: "Music Player",
    projectDescription:
      "A Music player with (multiple songs) (next) (previous) (progress bar) (Duration)",
    folderName: "audioPlayer",
    projectImage: "audioPlayer.png",
  },
  {
    projectName: "Daily Goal Set",
    projectDescription:
      "This is To do list There you can set 3 goal for the Day",
    folderName: "dailyGoalSet",
    projectImage: "dailyGoalset.png",
  },
  {
    projectName: "The Shoe Company",
    projectDescription:
      "This is a shoe company website that showcase a shoe",
    folderName: "TheShoeCompany",
    projectImage: "TheShoeCompany.png",
  },
  {
    projectName: "Filter Joblist",
    projectDescription:
      "This is a job list website that showcase have listed job, and We can also filter the job by role, level or language | data is printing dynamically from data.json",
    folderName: "filter_data",
    projectImage: "jobList.png",
  },
].reverse();



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
           <a href="${projectObject.folderName}" target="_blank"><img src="images/${projectObject.projectImage}"></a> 
        </div>`;

  verticalLine.innerHTML += `<div class="horizontalRight horizontalLine" id="right${index+1}" style="top: ${topVal}px;">
            <div class="circle"></div>
        </div>`;

  turn = "left";
} else {
  contentLeft.innerHTML += `<div class="projectImage" id="project${index+1}Img">
            <span class="tooltip">${projectObject.projectName}</span>
           <a href="${projectObject.folderName}" target="_blank"><img src="images/${projectObject.projectImage}"></a> 
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
            li.setAttribute("tabindex", "0")
            li.textContent = keyword
            suggestionContainer.appendChild(li)
            suggestionField.style.display = "block"
        })
}

}

// mouse click select function
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


// sort Functionality
