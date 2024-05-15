// custom cursor scripting
const customCursor = document.getElementById("custom-cursor");
document.addEventListener("mousemove", (e) => {
const left = e.pageX - 3
const top = e.pageY

customCursor.style.top = top + "px"
customCursor.style.left = left + "px" 
});

    