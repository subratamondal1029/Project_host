// set data / store data function 
const inputField = document.querySelectorAll(".goalInput");

let goalData = JSON.parse(localStorage.getItem('goalData')) ?? []

inputField.forEach((input) =>{
    input.addEventListener('keyup', (e)=>{
        if(e.key === "Enter" && input.value.trim() !== ""){
            let goalVal = input.value.trim()
            goalVal = goalVal.replace(/[^\w\s]/g, "");
            goalData.push({goalText: goalVal, complete: false})
            localStorage.setItem('goalData', JSON.stringify(goalData))
            printData()

            input.value = ""
        }
    })
})

// get localstorage Data

// checking all field are ready for checked 
const errorText = document.getElementById('error')
const totalGoals = document.querySelectorAll('.goal').length;
const checkTextFieldLength = setInterval(() => {
    const textField = document.querySelectorAll(".goalText");
    if (textField.length === totalGoals) {

        const errorTextContent = errorText.textContent
        if (errorTextContent !== "You did it! 🎉" && errorTextContent !== "Just a step away, keep going!"){
            errorText.textContent = "Go Ahead";
        }

        errorText.style.color = "#858585";

        const today = new Date().getDay()
        const storedToday = JSON.parse(localStorage.getItem('today'))
        
        if (storedToday && today !== storedToday) {
            deleteAllData()
            localStorage.setItem('today', JSON.stringify(today))
        }else{
            localStorage.setItem("today", JSON.stringify(today))
        }
        
        clearInterval(checkTextFieldLength)
    }
}, 200);


// complete function
const checkBoxs = document.querySelectorAll(".checkBox");
checkBoxs.forEach((checkBox, index) =>{
    checkBox.addEventListener('click', (e) =>{
        const setGoal = document.querySelectorAll(".goalText").length;
        if (totalGoals === setGoal) {
            goalData[index].complete = true
            localStorage.setItem('goalData', JSON.stringify(goalData))
            printData()
        }
    })
})
document.getElementById("totalGoal").textContent = totalGoals

// print function
if (goalData) printData()

function printData(){
    goalData.forEach((data, index) =>{

        const textField = document.createElement('span')
        textField.className = 'goalText'
        textField.textContent = data.goalText
        const goalContainer = inputField[index].parentElement

        const deleteBtn = document.createElement('button')
        deleteBtn.className = 'deleteBtn'
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        
        
        if(!goalContainer.querySelector('.goalText')){
            goalContainer.appendChild(textField)
            goalContainer.appendChild(deleteBtn);
        }
        inputField[index].style.display = "none"

        if (data.complete) {
            inputField[index].nextElementSibling.setAttribute('state', 'complete')
            checkBoxs[index].setAttribute('state', 'checked')

            const currentDeleteBtn = goalContainer.querySelector('.deleteBtn')
            if (currentDeleteBtn) {
                currentDeleteBtn.remove()
            }

            progress()
        }
    })
}


// Progress function 
function progress() {
  const checked = document.querySelectorAll(".checkBox[state='checked']").length;
  const totalGoal = document.querySelectorAll(".goal").length;
  const progress = document.getElementById("progress");
  document.getElementById("progressNum").textContent = checked

  
  const progressInParsentage = (checked / totalGoal) * 100 
  progress.style.width = `${progressInParsentage.toFixed()}%`


  if (progressInParsentage >= 66) {
    errorText.textContent = "Just a step away, keep going!";
    document.querySelector('#footerText p').textContent = "“Keep Going, You’re making great progress!”"
  }

  if(progressInParsentage === 100){
    errorText.textContent = "You did it! 🎉"
    document.querySelector('#footerText p').textContent = "“You did it! 🎉 You’ve completed all your goals. Keep up the good work!”"
  }
}

// delete Data 
const goalContainer = document.querySelectorAll('.goal').forEach((goal, index) =>{
    goal.addEventListener('click', (e) =>{
        if (e.target.tagName === "I") {
            goalData.splice(index, 1)
            localStorage.setItem('goalData', JSON.stringify(goalData))
            location.reload()
        }
    })
})


// Delete all Data on Day change
function deleteAllData(){
    localStorage.removeItem('goalData')
    location.reload()
}