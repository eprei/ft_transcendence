import styles from './BoardGame.module.css'
import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
// import theme1 from '../../assets/bg/theme1.jpg'
// import theme2 from '../../assets/bg/theme2.avif'
// import theme3 from '../../assets/bg/theme3.avif'
import { useAppSelector } from '../../store/types'
import { UserData } from '../../types/UserData'
import { useNavigate } from 'react-router-dom'
import Player from './Player'

interface Position {
    x: number
    y: number
}
interface Size {
    width: number
    height: number
}

interface Rectangle {
    size: Size
    position: Position
}

interface Frame {
    paddleLeft: Rectangle
    paddleRight: Rectangle
    ball: Rectangle
    score: { playerOne: number; playerTwo: number }
    gameOver: boolean
}

function drawRectangle(
    ctx: CanvasRenderingContext2D,
    rectangle: Rectangle
): void {
    ctx.fillStyle = 'white'
    ctx.fillRect(
        rectangle.position.x,
        rectangle.position.y,
        rectangle.size.width,
        rectangle.size.height
    )
}

export interface BoardGameProps {
    room: string
    player_one: number
    player_two: number
    theme: string
    imPlayerOne: boolean
}

const BoardGame = ({
    room,
    player_one,
    player_two,
    theme,
    imPlayerOne,
}: BoardGameProps) => {
    const userData = useAppSelector((state) => state.user.userData) as UserData
    const [waitingForPlayer, setWaitingForPlayer] = useState<boolean>(false)
    let playerNumber: string =
        imPlayerOne === true ? 'player_one' : 'player_two'
    const BALL_SIZE: number = 2
    const PADDLE_WIDTH: number = 2
    const PADDLE_HEIGHT: number = 30
    const [gameOver, setGameOver] = useState<boolean>(false)
    const [winner, setWinner] = useState<string>('')
    const navigate = useNavigate()

    const [frame, setFrame] = useState<Frame>({
        paddleLeft: {
            size: { width: PADDLE_WIDTH, height: PADDLE_HEIGHT },
            position: { x: 10, y: 60 },
        },
        paddleRight: {
            size: { width: PADDLE_WIDTH, height: PADDLE_HEIGHT },
            position: { x: 280, y: 60 },
        },
        ball: {
            size: { width: BALL_SIZE, height: BALL_SIZE },
            position: { x: 50, y: 50 },
        },
        score: { playerOne: 0, playerTwo: 0 },
        gameOver: false,
    })

    useEffect(() => {
        let canvas: HTMLCanvasElement | null = document.getElementById(
            'boardGame'
        ) as HTMLCanvasElement
        if (canvas === null) {
            console.log('fail get canvas element')
            // TODO manage error
        }
        let ctx: CanvasRenderingContext2D | null = canvas.getContext('2d')
        if (ctx === null) {
            throw 'fail get context'
            // TODO manage error
        }

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        drawRectangle(ctx, frame.paddleLeft)
        drawRectangle(ctx, frame.paddleRight)
        drawRectangle(ctx, frame.ball)
    }, [frame])

    useEffect(() => {
        const socket = io('http://localhost:8080/game')

        if (playerNumber === 'player_one') {
            socket.on('connect', () => {
                console.log('Connected to server')
                socket.emit('createRoom', room)
            })
        } else {
            socket.on('connect', () => {
                console.log('Connected to server')
                socket.emit('joinRoom', room)
            })
        }

        socket.on('connect_error', (error) => {
            console.log('Connection Error', error)
        })

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                socket.emit('movePaddle', {
                    player: playerNumber,
                    direction: event.key,
                    roomId: room,
                })
            }
        }

        function onReceiveFrames(updatedFrame: Frame) {
            setWaitingForPlayer(false)
            setFrame(updatedFrame)
            document.getElementById('scorePlayerOne').innerText =
                updatedFrame.score.playerOne.toString()
            document.getElementById('scorePlayerTwo').innerText =
                updatedFrame.score.playerTwo.toString()

            if (updatedFrame.gameOver) {
                let winner =
                    updatedFrame.score.playerOne > updatedFrame.score.playerTwo
                        ? 'Player One'
                        : 'Player Two'
                setWinner(winner)
                setGameOver(true)
                socket.emit('resetGame', {
                    userId: userData.user.id,
                })
                setTimeout(() => {
                    navigate('/play')
                }, 3000)
            }
        }

        // Event listener to captures up and down keys
        document.addEventListener('keydown', handleKeyDown)

        // Event registration to receive updated frames from the server
        socket.on('sendFrames', onReceiveFrames)

        socket.on('waitingForSecondPlayer', () => {
            setWaitingForPlayer(true)
        })

        return () => {
            // Remove the event listener when disassembling the component to avoid memory leaks
            document.removeEventListener('keydown', handleKeyDown)

            // Unregister event to receive updated frames from server
            console.log('Unregistering event...')
            socket.off('sendFrames', onReceiveFrames)
            socket.close()
            // socket.emit('leaveRoom', room)
        }
    }, [])

    // TODO Handle theme
    // const themeImages: { [key: string]: string } = {
    // 	'theme 1': theme1,
    // 	'theme 2': theme2,
    // 	'theme 3': theme3,
    // }

    // TODO add player names and photos to the board
    return (
        <div>
            <div className={styles.scoreContainer}>
                {gameOver && (
                    <div className={styles.gameOver}>
                        Game Over! {winner} won!
                    </div>
                )}
                <Player userId={player_one} />
                <div id="scorePlayerOne" className={styles.score}>
                    0
                </div>
                <div id="scorePlayerTwo" className={styles.score}>
                    0
                </div>
                <Player userId={player_two} />
            </div>
            <div className={styles.waitingForPlayer}>
                {playerNumber === 'player_one' ? (
                    waitingForPlayer ? (
                        <div>Waiting for the second player...</div>
                    ) : null
                ) : null}
            </div>
            <canvas id="boardGame" className={styles.boardGame}></canvas>
        </div>
    )
}

export default BoardGame
