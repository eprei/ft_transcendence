import { useState } from 'react'

export class Speudo {
    speudo: string
}

const Product = () => {
    const [speudo, setSpeudo] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        let newSpeudo: Speudo = new Speudo()
        newSpeudo.speudo = speudo

        const response = await fetch('http://localhost:8080/api/speudo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newSpeudo),
        })

        if (!response.ok) {
            throw 'fail fetch(post)'
        }
    }

    return (
        <>
            <h1>Sign in</h1>
            <form onSubmit={handleSubmit}>
                <label>speudo:</label>
                <input
                    id="pseudo"
                    name="pseudo"
                    onChange={(e) => setSpeudo(e.target.value)}
                    required
                />
                <input
                    id="submitSpeudo"
                    name="submitSpeudo"
                    type="submit"
                    value="submit speudo"
                />
            </form>
        </>
    )
}

export default Product
