function printNumber(number: number): void {
    console.log('number :' + number)
}

function sumArray(listNumbers: number[]): number {
    var sum: number = 0

    listNumbers.forEach(printNumber)

    listNumbers.forEach((item) => {
        sum += item
    })

    return sum
}

function addNumbers(a: number, b: number): number {
    return a + b
}

var sum: number = addNumbers(10, 15)

console.log('Sum of the two numbers is: ' + sum)

var myListNumbers: number[] = [0, 10, 200]

sum = sumArray(myListNumbers)

console.log('Sum of the array numbers is: ' + sum)
