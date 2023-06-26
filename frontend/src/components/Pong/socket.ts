import { io } from 'socket.io-client'

const URL: string = 'http://localhost:80'

export const socket = io(URL)
