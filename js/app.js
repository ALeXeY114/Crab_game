const block = document.querySelectorAll('.block')
const startPage = document.querySelector('#start__page')
const startRules = document.querySelector('#start__rules')
const timeGame = document.querySelector('#time__game')
const finishGame = document.querySelector('#finish__game')
const boardGame = document.querySelector('#board__game')
const primaryPage = document.querySelector('#primary__page')
const copyText = document.querySelector('#copy__text')
//генератор случаный фраз
const text=document.getElementById("quote");

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
    copyText.classList.remove('hide')

    //генератор случаный фраз
    text.classList.remove('hide')

    boardGame.innerHTML = `<div><h1>Поймали <span class="primary">${score} <img src="./img/crab.png"/></span></h1></div>`
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
    const sizeCrab = randomNumber (35, 70)
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

//генератор случаных фраз
const getNewQuote = async () => {
    //api
    let url="https://type.fit/api/quotes"
    //получение данных из API
    const response = await fetch(url);
    console.log(typeof response);
    //преобразовать ответ в json и сохранить его в массиве
    const allQuotes = await response.json();
    //генерация случайного числа
    const index = Math.floor(Math.random()*allQuotes.length);
    //сохранение фразы полученной на основании индекса из массива
    const quote = allQuotes[index].text;
    //вставка текста в HTML
    text.innerHTML=quote;
}
getNewQuote()