// objeto com as variáveis globais da app, separadas em view (quando alteram elementos visuais), values (armazenam valores internos) e actions (armazenam métodos)
const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        scoreDisplay: document.querySelector("#score"),
        timeLeft: document.querySelector("#time-left"),
        lives: document.querySelector("#lives")
    },
    values: {
        enemySpeed: 1000,
        hitBoxPosition: 0,
        score: 0,
        currentTime: 60,
    },
    actions: {
        enemyMovementTimer: null,
        countDownTimer: setInterval(countDown, 1000)
    }
};

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.innerHTML = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimer);
        clearInterval(state.actions.enemyMovementTimer);
        alert("Time over! Yout final score is:" + state.values.score);
    }
}

function playAudio(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function randomizeEnemy() {
    state.view.squares.forEach(square => {
        square.classList.remove("enemy");
    })

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");

    state.values.hitBoxPosition = randomSquare.id;
}

function moveEnemy() {
    state.values.enemyMovementTimer = setInterval(randomizeEnemy, state.values.enemySpeed);
}

function addListenerHitBox() {
    state.view.squares.forEach(square => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitBoxPosition) {
                state.values.score++;
                state.view.scoreDisplay.innerHTML = state.values.score;
                state.values.hitBoxPosition = null;
                playAudio("hit");
            }
        })
    })
}

function initialize() {
    state.view.timeLeft.innerHTML = state.values.currentTime;
    randomizeEnemy();
    moveEnemy();
    addListenerHitBox();
}

initialize();
