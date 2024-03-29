import styles from './ChatBox.module.css'
import ChatFeed from './ChatFeed.tsx'
import SendForm from './SendForm.tsx'
import { NewMsg } from '../../../pages/Chat'
import { ReceivedMsg } from '../../../pages/Chat'

interface ChatBoxProps {
    currentChatSelected: number
    messages: ReceivedMsg[]
    sendMessage: (NewMsg: NewMsg) => void
    amImuted: boolean
    blockedUsers: number[]
}

function ChatBox(props: ChatBoxProps) {
    return (
        <div className={styles.chatBox}>
            <ChatFeed
                messages={props.messages}
                blockedUsers={props.blockedUsers}
            />
            {props.currentChatSelected > 0 && !props.amImuted ? (
                <SendForm sendMessage={props.sendMessage} />
            ) : props.amImuted ? (
                <p>You're muted, select another chat</p>
            ) : null}
        </div>
    )
}

export default ChatBox
