const output = document.querySelector('#scriptOutput')
const numberField: any = document.querySelector('#guessNumber')
const buttonSubmit = document.querySelector('#submitButton')

const numberToGuess: number = 42
let numberList: number[] = []

function getNumberField(): number {
    return numberField.valueAsNumber
}

function handleSubmit(): void {
    const numberField: number = getNumberField()

    if (numberField < numberToGuess) output.textContent = 'too low'
    else if (numberField > numberToGuess) output.textContent = 'too high'
    else if (numberField === numberToGuess) output.textContent = 'win'
    numberList.push(numberField)

    console.log(numberList)
}

buttonSubmit.addEventListener('click', handleSubmit)
