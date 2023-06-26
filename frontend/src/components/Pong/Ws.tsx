import { socket } from './socket'
import { useState, useEffect } from 'react'

import ConnectionState from './ConnectionState'
//import Events from './Events'
//import ConnectionManager from './ConnectionManager'
//import MyForm from './MyForm'

const Ws = () => {
    const [isConnected, setIsConnected] = useState(socket.connected)
    const [fooEvents, setFooEvents] = useState([])

    useEffect(() => {
        function onConnect() {
            setIsConnected(true)
        }

        function onDisconnect() {
            setIsConnected(false)
        }

        function onFooEvent(value) {
            setFooEvents((previous) => [...previous, value])
        }

        socket.on('connect', onConnect)
        socket.on('disconnect', onDisconnect)
        socket.on('foo', onFooEvent)

        return () => {
            socket.off('connect', onConnect)
            socket.off('disconnect', onDisconnect)
            socket.off('foo', onFooEvent)
        }
    }, [])

    return (
        <>
            <ConnectionState isConnected={isConnected} />
        </>
    )
//            <Events events={fooEvents} />
//            <ConnectionManager />
//            <MyForm />
}

export default Ws
