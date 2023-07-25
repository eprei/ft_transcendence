import { Channel } from '../../../../types/Channel'
import DmItem from './DmItem'

interface ChannelsDisplayProps {
    channels: Channel[] | []
    getAllChannels: () => void
}

const DmDisplay = (props: ChannelsDisplayProps) => {
    let content: JSX.Element[] | JSX.Element = <p>No dm for now</p>
    if (props.channels !== undefined && props.channels.length > 0) {
        content = props.channels.map((channel: Channel) => (
            <DmItem
                key={channel.id}
                channel={channel}
                getAllChannels={props.getAllChannels}
            ></DmItem>
        ))
    }

    return (
        <div>
            <ul>{content}</ul>
        </div>
    )
}

export default DmDisplay