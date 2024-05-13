const profileData = document.getElementById("Profile-data");
const twitter = document.getElementById("twitter");

const userName = prompt("Enter Your GitHub userName");

const apiUrl = userName ? `https://api.github.com/users/${userName}` : "https://api.github.com/users/subratamondal1029";

window.onload = getData;

function getData() {
  fetch(apiUrl)
  .then((res) => res.json())
  .then((data) => showData(data))
  .catch((err) => alert("Somthing Wrong Try again"))
}

function showData(data) {
  profileData.innerHTML = ` <div class="user-picture">
             <img src="${data.avatar_url}" alt="user-picture">
            </div>
            <p class="name-client"> ${data.name}
                <span>${data.followers} Followers</span>
            </p>`;

  twitter.href = `https://twitter.com/${data.twitter_username}`;
}

twitter.addEventListener("click", (e) => {
  if (twitter.href.includes("null") || twitter.href.includes("#")) {
    e.preventDefault();
  }
});