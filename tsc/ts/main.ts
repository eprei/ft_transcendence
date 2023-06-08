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

let numberList: number[] = []
let counterTry: number = 0

function getNumberField(): number {
    return inputNumberField.valueAsNumber
}

function getRandomNumber(max: number): number {
    return Math.floor(Math.random() * max)
}

function resetGame(): void {
    console.log('reset game')
}

function endGame(): void {
    inputNumberField.disabled = true
    inputSubmit.disabled = true
    inputNumberField.value = ''
    outputUpDown.textContent = ''

    const inputButtonReset = document.createElement('button')
    inputButtonReset.textContent = 'Start a new game'
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
        if (counterTry === 10) {
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
    console.log('try number ' + counterTry)
}

const numberToGuess: number = getRandomNumber(100)
console.log(numberToGuess)
inputSubmit.addEventListener('click', handleSubmit)
