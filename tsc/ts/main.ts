const output = document.querySelector('#scriptOutput')
const numberField: any = document.querySelector('#guessNumber')
const buttonSubmit = document.querySelector('#submitButton')

let numberList: number[] = []
let counterTry: number = 0

function getNumberField(): number {
    return numberField.valueAsNumber
}

function getRandomNumber(max: number): number {
    return Math.floor(Math.random() * max)
}

function handleSubmit(): void {
    ++counterTry

    const numberField: number = getNumberField()

    if (numberField < numberToGuess) output.textContent = 'too low'
    else if (numberField > numberToGuess) output.textContent = 'too high'
    else if (numberField === numberToGuess) output.textContent = 'win'
    numberList.push(numberField)

    console.log(numberList)
    console.log('try number ' + counterTry)
}

const numberToGuess: number = getRandomNumber(100)
console.log(numberToGuess)
buttonSubmit.addEventListener('click', handleSubmit)
