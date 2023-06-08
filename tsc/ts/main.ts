/* output paragraph */
const outputPrevious: HTMLParagraphElement =
    document.querySelector('#outputPrevious')
const outputResult: HTMLParagraphElement =
    document.querySelector('#outputResult')
const outputUpDown: HTMLParagraphElement =
    document.querySelector('#outputUpDown')

/* input elements */
const inputNumberField: HTMLInputElement =
    document.querySelector('#guessNumber')
const inputSubmit: HTMLButtonElement = document.querySelector('#submitButton')

/* constants */
const MAX_ATTEMPTS: number = 10
const MAX_NUMBER: number = 100

let numberList: number[] = []
let counterTry: number = 0
let numberToGuess: number = 0

function getNumberField(): number {
    return inputNumberField.valueAsNumber
}

function getRandomNumber(max: number): number {
    return Math.floor(Math.random() * max)
}

function resetGame(): void {
    /* enable inputs */
    inputNumberField.disabled = false
    inputSubmit.disabled = false

    /* remove the reset button */
    const inputButtonReset: HTMLInputElement =
        document.querySelector('#resetButton')
    inputButtonReset.parentNode.removeChild(inputButtonReset)

    /* empty the output content */
    outputUpDown.textContent = ''
    outputResult.textContent = ''
    outputPrevious.textContent = ''
    startGame()
}

function endGame(): void {
    inputNumberField.disabled = true
    inputSubmit.disabled = true
    inputNumberField.value = ''
    outputUpDown.textContent = ''

    const inputButtonReset = document.createElement('button')
    inputButtonReset.textContent = 'Start a new game'
    inputButtonReset.id = 'resetButton'
    inputButtonReset.addEventListener('click', resetGame)
    document.body.appendChild(inputButtonReset)
}

function gameOver(): void {
    outputResult.textContent = 'GAME OVER'
    outputResult.style.backgroundColor = 'red'
    endGame()
}

function handleSubmit(): void {
    ++counterTry

    const numberField: number = getNumberField()

    if (numberField !== numberToGuess) {
        if (counterTry === MAX_ATTEMPTS) {
            gameOver()
            return
        }
        outputResult.textContent = 'Wrong!'
        outputResult.style.backgroundColor = 'red'
        inputNumberField.focus()
        if (numberField > numberToGuess)
            outputUpDown.textContent = 'Last guess was too high!!'
        else outputUpDown.textContent = 'Last guess was too low!!'
    } else {
        endGame()
        outputResult.textContent = 'Congratulations! You got it right!'
        outputResult.style.backgroundColor = 'green'
    }

    numberList.push(numberField)

    outputPrevious.textContent = 'Previous guesses: ' + numberList.toString()
}

function startGame(): void {
    /* set null values */
    numberList = []
    counterTry = 0

    numberToGuess = getRandomNumber(MAX_NUMBER)
    console.log('Number to guess: ' + numberToGuess)
}

inputSubmit.addEventListener('click', handleSubmit)
startGame()
