import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

interface Frame {
    x: number
    y: number
}

const Pong = () => {
    const socket = io('http://localhost:8080')
    const [frame, setFrame] = useState<Frame>()

    useEffect(() => {
        socket.emit('getFrame', { id: 50 }, (response: Frame) => {
            setFrame(response)
        })
    }, [])

    console.log('actual frame: ', JSON.stringify(frame))

    return <p>the pong game !</p>
}

export default Pong
