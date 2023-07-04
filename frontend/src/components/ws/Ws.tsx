import { useEffect } from 'react'

const Ws = () => {
    useEffect(() => {
        let ws = new WebSocket('wss://localhost:8080/api/pong')
        ws.onopen = () => console.log('ws opened')
        ws.onclose = () => console.log('ws closed')

        ws.onmessage = (e) => {
            const message = JSON.parse(e.data)
            console.log('e', message)
        }

        return () => {
            ws.close()
        }
    }, [])
    return (
        <>
            <h1>Web socket</h1>
            <p>content</p>
        </>
    )
}

export default Ws
