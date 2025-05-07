
// Setter størrelsen på canvas/board
const blockSize = 25
const rows = 20
const columns = 20
let board = document.querySelector("#board")

// context er det vi bruker for å male/legge til ruter på canvas
let context


// definerer størrelsen på slangen
let snakeX = blockSize * 5 
let snakeY = blockSize * 5

// lager en array for å lagre hvor kroppen til slangen er
let snakeBody = []

// definerer en verdi for hastigheten til slangen
let velocityX = 0
let velocityY = 0

// lager en tom variablel for posisjonen på mat
let foodX
let foodY

// lager en variabel for å teste om spillet er ferdig
let gameOver = false


// lager en Dom ContentLoaded event listener, som gjør at spillet kun kjører når siden er lastet
document.addEventListener("DOMContentLoaded", () => {

    // endrer høyden og bredden på canvas til å være lik antall rader og kolloner
    board.height = rows * blockSize
    board.width = columns * blockSize

    // sier at canvas er 2d
    context = board.getContext("2d")

    // kjører plassere mat funksjonen når siden laster inn
    placeFood()
    // kjører kun changeDirection hvis en knapp er trykket ned
    document.addEventListener("keydown", changeDirection)
    // kjører update funksjonen hver 100ms eller 10 ganger i sekundet
    setInterval(update, 100)
})

function update() {

    // Sjekker først om gameOver er true, og så stopper dne funksjonen der
    // (gameOver) er det samme som å skrive (gameOver === true)
    if (gameOver) {
        return
    }

    // plasserer svart på brettet, begynner på pixel kordinatene 0, 0, og avslutter på pixel kordinatene board.width (500), og board.height (500)
    // Dette må repeteres før mat og slangen er plassert, for å fjerne de tidligere plasseringene
    context.fillStyle = "black"
    context.fillRect(0, 0, board.width, board.height)

    // plasserer mat på kordinatene som er definert i placeFood()
    context.fillStyle = "red"
    context.fillRect(foodX, foodY, blockSize, blockSize)

    // sjekker om slangen er på samme kordinatene som maten, 
    // legger til kordinatene til maten inn i slutten av arrayen for hvor kroppen til slangen er, for å gjøre den lengre, 
    // og kjører placeFood() igjen for å gi nye kordinater til maten
    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push([foodX, foodY])
        placeFood()
    }

    // Sjekker hvor lang snakeBody arrayet er, og endrer snakeBody[]
    // FORSTÅR IKKE DENNE

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1]
        console.log(snakeBody[i])
    }


    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY]
    }

    // endrer fargen til grønn
    context.fillStyle = "lime"
    // legger inn kordinatene 
    snakeX += velocityX * blockSize
    snakeY += velocityY * blockSize
    context.fillRect(snakeX, snakeY, blockSize, blockSize)
    for (let i = 0; i < snakeBody.length; i++)
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)

    if (snakeX < 0 || snakeX > columns * blockSize || snakeY < 0 || snakeY > rows * blockSize) {
        gameOver = true
        alert("Game Over")
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            gameOver = true
            alert("Game Over")
        }
    }

}

function changeDirection(e) {
    if (e.code === "ArrowUp" && velocityY != 1) {
        velocityX = 0
        velocityY = -1 
    } else if (e.code === "ArrowDown" && velocityY != -1) {
        velocityX = 0
        velocityY = 1 
    } else if (e.code === "ArrowLeft" && velocityX != 1) {
        velocityX = -1
        velocityY = 0
    } else if (e.code === "ArrowRight" && velocityX != -1) {
        velocityX = 1
        velocityY = 0 
    }
}


function placeFood() {
    foodX = Math.floor(Math.random() * columns) * blockSize
    foodY = Math.floor(Math.random() * rows) * blockSize
}