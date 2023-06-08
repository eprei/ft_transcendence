const output: HTMLParagraphElement = document.querySelector('#scriptOutput')
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

    let outputText: string = ''
    const numberField: number = getNumberField()

    if (numberField < numberToGuess) outputText = 'too low'
    else if (numberField > numberToGuess) outputText = 'too high'
    else if (numberField === numberToGuess) outputText = 'win'
    numberList.push(numberField)

    outputText += ' ' + numberList
    output.textContent = outputText
    console.log('try number ' + counterTry)
}

const numberToGuess: number = getRandomNumber(100)
console.log(numberToGuess)
buttonSubmit.addEventListener('click', handleSubmit)
