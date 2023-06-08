const paraJoke: HTMLParagraphElement | null =
    document.querySelector('#paraJoke')

if (paraJoke == null) throw 'Error: documentQuerySelector'

paraJoke.textContent = 'waiting the joke...'
