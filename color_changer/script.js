const buttons = document.querySelectorAll('.button')

buttons.forEach((btn) =>{
    btn.addEventListener('click', (e) => {
        const id = e.target.id
        document.body.style.backgroundColor = id;
    })
})