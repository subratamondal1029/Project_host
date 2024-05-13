const profileData = document.getElementById('Profile-data')
const twitter = document.getElementById('twitter')

const userName = prompt("Enter Your GitHub userName")

const apiUrl = userName ? `https://api.github.com/users/${userName}`: 'https://api.github.com/users/subratamondal1029';
const xhr = new XMLHttpRequest()

window.onload = getData

function getData(){
xhr.open('GET', apiUrl)
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
        const data = JSON.parse(this.responseText)
        // console.log(data);
        showData(data)
    }
}
xhr.send()
}

function showData(data){
    profileData.innerHTML = ` <div class="user-picture">
             <img src="${data.avatar_url}" alt="user-picture">
            </div>
            <p class="name-client"> ${data.name}
                <span>${data.followers} Followers</span>
            </p>`

    twitter.href = `https://twitter.com/${data.twitter_username}`
    
}

twitter.addEventListener('click', (e) =>{
   if (twitter.href.includes('null') || twitter.href.includes('#')) {
    e.preventDefault()
   }
})