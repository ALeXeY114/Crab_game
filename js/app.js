const block = document.querySelectorAll('.block')
const startPage = document.querySelector('#start__page')
const startRules = document.querySelector('#start__rules')
const timeGame = document.querySelector('#time__game')
const finishGame = document.querySelector('#finish__game')
const boardGame = document.querySelector('#board__game')
const primaryPage = document.querySelector('#primary__page')

let time = 0
let score = 0

startPage.addEventListener('click',(event)=>{
    event.preventDefault()
    block[0].classList.add('up')
})

startRules.addEventListener('click',(event)=>{
    event.preventDefault()
    block[1].classList.add('up')
})

timeGame.addEventListener('click',(event)=>{
    if(event.target.classList.contains('btn__game')) {
        time = parseInt(event.target.getAttribute('data-time'))
        block[2].classList.add('up')
        startGame ()
    }
})

boardGame.addEventListener('click', (event)=> {
    if(event.target.classList.contains('crab')) {
        score++;
        event.target.remove();
        setPositionSize ()
    }
})

primaryPage.addEventListener('click', (event) => {
    event.preventDefault()
    continueGame ()
})

function startGame () {
    setInterval(reduceTime, 1000)
    setPositionSize ()
    setTime(time)
}

function setTime(value){
    finishGame.innerHTML=`00:${value}`
}

function endGame() {
    finishGame.parentNode.classList.add('hide')
    primaryPage.classList.remove('hide')
    boardGame.innerHTML = `<div><h1>Поймали <span class="primary">${score}<img src="./img/crab.png"/></span></h1></div>`
}

function reduceTime () {
    if (time === 0) {
        endGame()
    } else {
        let remaining = --time;
        if(time<10){
            remaining =`0${remaining}`
        }
        setTime(remaining)
    }
}

function randomNumber (min, max) {
    return Math.round(Math.random()*(max-min)+min)
}

function setPositionSize () {
    const crabImg = document.createElement('img')
    crabImg.src = '/img/crab.png'
    const sizeCrab = randomNumber (20, 60)
    const {width, height} = boardGame.getBoundingClientRect()
    const x = randomNumber (0, height-sizeCrab)
    const y = randomNumber (0, width-sizeCrab)

    crabImg.classList.add('crab')
    crabImg.style.width = `${sizeCrab}px`
    crabImg.style.height = `${sizeCrab}px`
    crabImg.style.top = `${x}px`
    crabImg.style.left = `${y}px`

    boardGame.append(crabImg)
}

function continueGame () {
    location.reload()
}