// objeto com as variáveis globais da app, separadas em view (quando alteram elementos visuais) e values
const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        score: document.querySelector("#score"),
        timeLeft: document.querySelector("#time-left"),
        lives: document.querySelector("#lives")
    },
    values: {
        timerId: null,
        enemySpeed: 1000
    }
};

function randomizeEnemy() {
    state.view.squares.forEach(square => {
        square.classList.remove("enemy");
    })

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
}

function moveEnemy() {
    state.values.timerId = setInterval(randomizeEnemy, state.values.enemySpeed);
}

function addListenerHitBox() {
    state.view.squares.forEach(square => {

    })
}

function initialize() {
    randomizeEnemy();
    moveEnemy();
}

initialize();
