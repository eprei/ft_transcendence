import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

interface Position {
    x: number
    y: number
}

interface Size {
    width: number
    height: number
}

interface Rectangle {
    position: Position
    size: Size
}

interface Frame {
    paddleLeft: Rectangle
    paddleRight: Rectangle
    ball: Rectangle
}

const Pong = () => {
    const socket = io('http://localhost:8080')
    const [frame, setFrame] = useState<Frame>({
        paddleLeft: {
            size: { width: 3, height: 4 },
            position: { x: 12, y: 24 },
        },
        paddleRight: {
            size: { width: 13, height: 14 },
            position: { x: 12, y: 24 },
        },
        ball: {
            size: { width: 10, height: 20 },
            position: { x: 5, y: 5 },
        },
    })

    useEffect(() => {
        socket.emit('getFrame', { id: 50 }, (response: Frame) => {
            setFrame(response)
        })
    }, [])

    console.log('actual frame: ', JSON.stringify(frame))

    return <p>the pong game !</p>
}

export default Pong
