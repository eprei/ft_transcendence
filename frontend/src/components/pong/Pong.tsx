import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

interface Position {
    x: number
    y: number
}

interface Frame {
    position: Position
}

const Pong = () => {
    const socket = io('http://localhost:8080')
    const [frame, setFrame] = useState<Frame>({ position: { x: 10, y: 30 } })

    useEffect(() => {
        socket.emit('getFrame', { id: 50 }, (response: Frame) => {
            setFrame(response)
        })
    }, [])

    console.log('actual frame: ', JSON.stringify(frame))

    return <p>the pong game !</p>
}

export default Pong
