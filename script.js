// Spillet baserer seg på ett kordinatsystem, der X verdien er den horisontale aksen, og Y er den loddrette aksen.
// her begynner den derimot på 0, 0 (x, y) som er oppe i venstre hjørnet
// første verdien (x) øker når den skal til høyre, og den andre verdien (y) øker når den skal nedover. 
// 

//              (0, 0)|(1, 0)|(2, 0)   + x          
//              ____________________
//       (0, 0)|      |      |      |
//             |      |      |      |
//             |______|______|______| 
//       (0, 1)|      |      |      |
//             |      |      |      |
//             |______|______|______|
//       (0, 2)|      |      |      |
//             |      |      |      |
//             |______|______|______|
//          + y


// under er størrelsen definert 





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

    // plasserer svart på hele brettet, begynner på pixel kordinatene 0, 0, og avslutter på pixel kordinatene board.width (500), og board.height (500)
    // Dette må repeteres før mat og slangen er plassert, for å fjerne de tidligere plasseringene
    context.fillStyle = "black"
    context.fillRect(0, 0, board.width, board.height)

    // plasserer mat på kordinatene som er definert i placeFood()
    context.fillStyle = "red"
    context.fillRect(foodX, foodY, blockSize, blockSize)

    // sjekker om slangen er på samme kordinatene som maten, 
    // legger til kordinatene den er på nå inn i slutten av arrayen for hvor kroppen til slangen er,
    // og kjører placeFood() igjen for å gi nye kordinater til maten
    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push([foodX, foodY])
        placeFood()
    }

    // Denne går igjennom hver verdi i snakeBody arrayet, og endrer det til verdien som den som er forran i arrayet.
    // Det gjør at slangen beveger seg framover, med å beholde like lengde på slangen.
    // Seinere endres jo snakeBody[0] til nye kordinater, så eneste verdien som blir overskrevet er den bakeste delen av kroppen til slangen.
    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1]
    }


    // sjekker om snakeBody har en lengde på seg, og endrer første verdien i snakeBody arrayet til å være kordinatene til hvor kroppen til slangen begynner.
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY]
    }

    // endrer fargen til grønn
    context.fillStyle = "lime"
    // legger inn hvor kordinatene til slangen begynner/hvor hodet er, og maler en rute
    snakeX += velocityX * blockSize
    snakeY += velocityY * blockSize
    context.fillRect(snakeX, snakeY, blockSize, blockSize)

    // Her legger den inn kroppen til slangen, først på plassen den var før, og før der og gjennom hele arrayet
    // den første snakeBody[i][0] betyr at den tar
    for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)
    }

    // Her sjekker den om hodet til slangen er kommet utenfor brettet
    if (snakeX < 0 || snakeX > columns * blockSize || snakeY < 0 || snakeY > rows * blockSize) {
        gameOver = true
        alert("Game Over")
    }
    
    // Her sjekker den om man går inn i seg selv, altså om kordinatene til slangehodet, er på et sted som slangekroppen er.
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            gameOver = true
            alert("Game Over")
        }
    }

}


// endrer på retningen til hastigheten for å være riktig i forhold til hvilken knapp du trykker ned
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

// lager en tilfeldig plassering på hvor x og y kordinatene er
function placeFood() {
    foodX = Math.floor(Math.random() * columns) * blockSize
    foodY = Math.floor(Math.random() * rows) * blockSize
}

const resetButton = document.querySelector("#reset")

resetButton.addEventListener("click", () => {
    location.reload()
})