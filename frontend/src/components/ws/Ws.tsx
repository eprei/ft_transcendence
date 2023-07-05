import { io } from 'socket.io-client'

const Ws = () => {
    let socket = io('http://localhost:8080/api/a')
    console.log('socket: ', socket)

    let socketa = io('http://localhost:8080/a')
    console.log('a: ', socketa)
    return (
        <>
            <h1>Web socket</h1>
            <p>content</p>
        </>
    )
}

export default Ws
