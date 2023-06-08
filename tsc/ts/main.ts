/* output paragraph */
const outputPrevious: HTMLParagraphElement =
    document.querySelector('#outputPrevious')
const outputResult: HTMLParagraphElement =
    document.querySelector('#outputResult')
const outputUpDown: HTMLParagraphElement =
    document.querySelector('#outputUpDown')

const numberFieldInput: HTMLInputElement =
    document.querySelector('#guessNumber')
const buttonSubmit: HTMLButtonElement = document.querySelector('#submitButton')

let numberList: number[] = []
let counterTry: number = 0

function getNumberField(): number {
    return numberFieldInput.valueAsNumber
}

function getRandomNumber(max: number): number {
    return Math.floor(Math.random() * max)
}

function handleSubmit(): void {
    ++counterTry

    const numberField: number = getNumberField()

    if (numberField !== numberToGuess) {
        outputResult.textContent = 'Wrong!'
        outputResult.style.backgroundColor = 'red'
        numberFieldInput.focus()
        if (numberField > numberToGuess)
            outputUpDown.textContent = 'Last guess was too high!!'
        else outputUpDown.textContent = 'Last guess was too low!!'
    } else {
        numberFieldInput.disabled = true
        buttonSubmit.disabled = true
        numberFieldInput.value = ''
        outputUpDown.textContent = ''
        outputResult.textContent = 'Congratulations! You got it right!'
        outputResult.style.backgroundColor = 'green'
    }

    numberList.push(numberField)

    outputPrevious.textContent = 'Previous guesses: ' + numberList.toString()
    console.log('try number ' + counterTry)
}

const numberToGuess: number = getRandomNumber(100)
console.log(numberToGuess)
buttonSubmit.addEventListener('click', handleSubmit)
