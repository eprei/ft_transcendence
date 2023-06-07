const output = document.querySelector('#scriptOutput')
const numberField: any = document.querySelector('#guessNumber')
const buttonSubmit = document.querySelector('#submitButton')

function handleSubmit(): void {
    console.log(numberField.value)
    console.log('handle submit + ')
}

console.log(numberField.value)
console.log(buttonSubmit)

buttonSubmit.addEventListener('click', handleSubmit)

const numberToGuess: number = 42

output.textContent = 'Hello, from the script'
