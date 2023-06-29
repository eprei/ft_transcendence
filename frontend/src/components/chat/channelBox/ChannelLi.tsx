import styles from './ChannelLi.module.css'
import { Channel } from '../../../types/Channel'
import { ChannelUser } from '../../../types/ChannelUser'
import IconLeaveChannel from '../../../assets/icon/block_user.svg'
import IconJoinChannel from '../../../assets/icon/add_friend.svg'
import ChannelTypes from '../../../types/ChannelTypes'
import IconPrivate from '../../../assets/icon/lock.svg'

interface ChannelLiProps {
    channel: Channel
}

const ChannelLi = (props: ChannelLiProps) => {
    async function postChUser(data: ChannelUser) {
        console.log('data', data)
        try {
            const response = await fetch(
                'http://localhost:8080/api/channel-user',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }
            )

            if (!response.ok) {
                throw new Error('Failed to make POST request')
            }

            const responseData = await response.json()
            return responseData
        } catch (error) {
            console.error(error)
        }
    }

    async function deleteChUser(ch_id: string, pl_id: string) {
        console.log('id', ch_id, pl_id)
        try {
            const response = await fetch(
                `http://localhost:8080/api/channel-user/${ch_id}/${pl_id}`,
                {
                    method: 'DELETE',
                }
            )

            if (!response.ok) {
                throw new Error('Failed to make delete channel-user')
            }

            console.log('channel-user deleted successfully')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <li className={styles.li}>
            <div className={styles.text}>{props.channel.name}</div>
            <div>
                <img
                    src={IconJoinChannel}
                    alt="JoinChannel"
                    className={styles.addChannelIcon}
                    onClick={() => {
                        postChUser({
                            player: { id: 7 },
                            channel: { id: props.channel.id },
                            isAdmin: false,
                            penalty: false,
                        })
                    }}
                />
                <img
                    src={IconLeaveChannel}
                    alt="LeaveChannel"
                    className={styles.addChannelIcon}
                    onClick={() => {
                        deleteChUser(props.channel.id.toString(), '7')
                    }}
                />
                {props.channel.type === ChannelTypes.Private ? (
                    <img
                        src={IconPrivate}
                        alt="Private Channel"
                        className={styles.privateIcon}
                    />
                ) : null}
            </div>
        </li>
    )
}

export default ChannelLi
