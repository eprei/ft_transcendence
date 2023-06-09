function main(): void {
    const paraJoke: HTMLParagraphElement | null =
        document.querySelector('#paraJoke')

    if (paraJoke == null) throw 'Error: documentQuerySelector'

    paraJoke.textContent = 'waiting the joke...'

    const url: string = 'https://v2.jokeapi.dev/joke/Programming?type=single'

    fetch(url)
        .then((myResponse) => {
            if (!myResponse.ok) {
                throw `HTTP: fetch not OK: ${myResponse.status}`
            }
            return myResponse.json()
        })
        .then((myJson) => {
            paraJoke.textContent = myJson.joke
        })
}

main()
