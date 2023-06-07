function printArray(listNumbers: number[]): void {
    listNumbers.forEach((element) => console.log('list number: ' + element))
}

function addNumbers(a: number, b: number): number {
    return a + b
}

var sum: number = addNumbers(10, 15)

var myListNumbers: number[] = [0, 10, 200]

printArray(myListNumbers)

console.log('Sum of the two numbers is: ' + sum)
