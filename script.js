// custom cursor scripting
const customCursor = document.getElementById("custom-cursor");
document.addEventListener("mousemove", (e) => {
const left = e.pageX - 3
const top = e.pageY


const cursorStyle = window.getComputedStyle(document.elementFromPoint(e.clientX, e.clientY)).cursor

if(cursorStyle === "pointer" || cursorStyle === "not-allowed" || cursorStyle === "text"){
    customCursor.style.display = "none"
}else{
    customCursor.style.display = "block"
    customCursor.style.top = top + "px"
    customCursor.style.left = left + "px" 
}
});