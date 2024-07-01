const typeContainer = document.getElementById('typed')
const texts = ["subrata", "Developer", "programer", "coder", "student"]

 
// const text = texts[0] //testing purpose only
let length = texts.length
let index = 0
sendText()

async function sendText(){
    const typerResult = await typerFunction(texts[index])
    length--;

    if (typerResult) {
        if (length > 0) {
            index++;

            sendText()
        }else{
            index = 0
            length = texts.length
            sendText()
        }
       
    }
}


function typerFunction(text){
    return new Promise((res, rej) =>{
        const words = text.split("")
        let length = words.length
        let index = 0
    
        const typer = setInterval(() =>{
        
            if (length > 0) {
                typeContainer.innerHTML += words[index]
        
                length--;
                index++;
            }else{
        
                if(index > 0){
                    const currentText = typeContainer.textContent
                   
            
                    const clearlast = currentText.slice(0, index-1)
                    typeContainer.innerHTML = clearlast
            
            
                    index--;
                    
                }else {
                    clearInterval(typer)
                    res(true)
                }
            }
        },350)
    })
}