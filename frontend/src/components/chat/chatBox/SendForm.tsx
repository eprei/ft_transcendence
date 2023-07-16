import styles from './SendForm.module.css'
import { useState, ChangeEvent, KeyboardEvent } from 'react'
import { useAtom } from 'jotai'
import { chatIdAtom } from '../channelBox/ChannelLi'
import { useAppSelector } from '../../../store/types'
import { UserData } from '../../../types/UserData'
import { io } from 'socket.io-client'

const socket = io('http://localhost:8080')

export interface NewMsg {
    creator: number
    content: string
	channelId: number
}

interface ChatFeedProps {
    socket: any
}

const SendForm = ({ socket }: ChatFeedProps ) => {
	
	const userData = useAppSelector((state) => state.user.userData) as UserData

// async function sendNewMsg(data: NewMsg) {
// 	const response = await fetch(`http://localhost:8080/api/message/channelId/${chatId}`, {
// 		method: 'POST',
// 					headers: {
// 							'Content-Type': 'application/json',
// 						},
// 				 		body: JSON.stringify(data),
// 	})

// 	if (!response.ok) {
// 		throw new Error('Failed to make POST request')
// 	}
// }

	const [chatId] = useAtom(chatIdAtom)
	const [inputText, setInputText] = useState('')

	const handleCreation = (text: string) => {
	  console.log('Received values of form: ', text)
	  const newMsg = {creator : userData.user.id, content : text, channelId : chatId}
	  socket.emit('postMsg', newMsg, (response: any) => {
		  console.log(response.content)
	  })
	//   sendNewMsg(newMsg)
	  setInputText('')
	}
  
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
	  setInputText(event.target.value)
	}
  
	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
	  if (event.key === 'Enter') {
		handleCreation(inputText)
	  }
	}

    return (
        <div className={styles.textInputWrapper}>
            <input
                className={styles.textInput}
                placeholder="Send message"
                type="text"
				value={inputText}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
            />
        </div>
    )
}

export default SendForm
