const engineSelect = document.getElementById("selectEngine");
let searchUrl = "https://www.google.com/search?q=";
  let shortcutUrl = "";
engineSelect.value = "google";
engineSelect.addEventListener("change", changeEngine);

function changeEngine() {
  const selectedEngine = engineSelect.value;
  document.getElementById("logoImage").src = `Logo/${selectedEngine}.webp`;
  document.getElementById("labelImage").src = `Logo/${selectedEngine}.webp`;

  switch (selectedEngine) {
    case "Bing":
      searchUrl = "https://www.bing.com/search?q=";
      break;

    case "yahoo":
      searchUrl = "https://search.yahoo.com/search?p=";
      break;
    case "DuckDuckGo":
      searchUrl = "https://duckduckgo.com/?q=";
      break;

    default:
      searchUrl = "https://www.google.com/search?q=";
      break;
  }
}

// search Function
document.getElementById("searchForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const searchpromt = document.getElementById("searchInput").value;
  window.location.href = `${searchUrl}${searchpromt}`;
});

//shortcut function
const shortcutContainer = document.getElementById("shortcutCon")
const AddOption = document.getElementById("shortcutAdd");

document.getElementById("shortcutClose").addEventListener('click', () => (showHideAdd("close")) );
document.getElementById("shortcutForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const shortcutTitle = document.getElementById("shortcutTitle").value;
  const shortcutUrl = document.getElementById("shortcutUrl").value;

  saveShortcut(shortcutTitle, shortcutUrl)
});


function showHideAdd(type){
  if (type == "open") {
    AddOption.style.transform = "scale(1)"
  }else{
    AddOption.style.transform = "scale(0)"
  }

}

function saveShortcut(title, url){
  const data = {
    Title: title,
    Url: `https://www.${url}`,
    Logo: `https://s2.googleusercontent.com/s2/favicons?domain=${url}`
  };

if(url.includes('.')){
  localStorage.setItem("shortcut", JSON.stringify(data));
    printShortcut()
    document.getElementById('error').style.display = 'none'
    showHideAdd('close')
    window.location.reload();
}else{
  document.getElementById('error').style.display = 'block'
}

}


let isAdded = false;
function printShortcut(){
  const data = JSON.parse(localStorage.getItem(("shortcut")))

  const title  = data.Title
   shortcutUrl = data.Url
  const logo = data.Logo
  shortcutContainer.innerHTML = `
  <div class="shortcutBoxAdded shortcutBox">
          <div class="shortcutcontent">
            <div class="shortcut">
              <!-- <i class="fa-solid fa-plus" style="color: #ffffff;"></i> -->
              <img src="${logo}" alt="" />
            </div>
            <div class="shortcutName">
              <h5>${title}</h5>
            </div>
          </div>

          <div class="shortcutMore">
            <i class="fa-solid fa-trash" style="color: #f6f5f4"></i>
          </div>
        </div>
  `;

  isAdded = true
}

(function () {
  const data = JSON.parse(localStorage.getItem("shortcut"));
  if (data) {
    printShortcut();
  }
})();

const shortcutBox = document.querySelector(".shortcutcontent");
shortcutBox.addEventListener("click", () => {
  if (isAdded) {
    window.open(shortcutUrl);
  } else {
    showHideAdd("open");
  }
});

const deleteOption = document.querySelector(".shortcutMore");
if (isAdded) {
  deleteOption.style.display = "block";
}

deleteOption.addEventListener('click', deleteShortcut)

function deleteShortcut(){
  localStorage.removeItem('shortcut')
  window.location.reload()
}