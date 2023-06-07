const output = document.querySelector('#scriptOutput')
const numberField: any = document.querySelector('#guessNumber')
const buttonSubmit = document.querySelector('#submitButton')

const numberToGuess: number = 42
let numberList: number[] = []
let counterTry: number = 0

function getNumberField(): number {
    return numberField.valueAsNumber
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

buttonSubmit.addEventListener('click', handleSubmit)
