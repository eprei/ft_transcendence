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

interface Paddle {
    position: Position
    size: Size
}

interface Frame {
    paddle: Paddle
}

const Pong = () => {
    const socket = io('http://localhost:8080')
    const [frame, setFrame] = useState<Frame>({
        paddle: {
            size: { width: 9, height: 16 },
            position: { x: 144, y: 400 },
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
