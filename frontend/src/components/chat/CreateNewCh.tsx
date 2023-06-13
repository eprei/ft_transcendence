import React, { useState } from 'react'
import { Form, Input, Modal, Radio } from 'antd'
import IconAddChannel from '../../assets/icon/add_friend.svg'
import styles from './ChannelList.module.css'
import { Channel } from '../../types/Channel'
import channelType from '../../types/ChannelTypes'

interface CollectionCreateFormProps {
    open: boolean
    onCreate: (values: Channel) => void
    onCancel: () => void
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
    open,
    onCreate,
    onCancel,
}) => {
    const [form] = Form.useForm()

    const [isPrivate, setIsPrivate] = useState<boolean>(false)

    let showPassword: JSX.Element | null = null

    const togglePass = () => {
        setIsPrivate(!isPrivate)
    }

    if (isPrivate) {
        showPassword = (
            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please type your password',
                    },
                ]}
            >
                <Input type="textarea" />
            </Form.Item>
        )
    }



    return (
        <Modal
            open={open}
            title="Create new Channel"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields()
                    .then((values) => {
                        form.resetFields()
                        const newChannel: Channel = {
                            id: new Date().getTime(),
                            owner: new Date().getTime() + 4,
                            name: values.chName,
                            type: values.type,
                            password: values.password,
                            creationDate: new Date().getTime().toString(),
                        }
                        onCreate(newChannel)
                        setIsPrivate(false)
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info)
                    })
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{ type: 'public' }}
            >
                <Form.Item
                    name="chName"
                    label="Channel name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the channel name',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                {showPassword}
                <Form.Item
                    name="type"
                    className="collection-create-form_last-form-item"
                >
                    <Radio.Group onChange={togglePass}>
                        <Radio value={channelType.Public}>Public</Radio>
                        <Radio value={channelType.Private}>Private</Radio>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </Modal>
    )
}

interface CreateNewChProps {
    handleCreation: (channel: Channel) => void
}

const CreateNewCh = ({ handleCreation }: CreateNewChProps) => {
    const [open, setOpen] = useState(false)

    const onCreate = (values: Channel) => {
        console.log('Received values of form: ', values)
        setOpen(false)
        handleCreation(values)
    }

    return (
        <div>
            <button
                className={`${styles.chList} ${styles.newCh}`}
                onClick={() => {
                    setOpen(true)
                }}
            >
                New channel
                <img
                    src={IconAddChannel}
                    alt="plus sign"
                    className={styles.addChannelIcon}
                />
            </button>

            <CollectionCreateForm
                open={open}
                onCreate={onCreate}
                onCancel={() => {
                    setOpen(false)
                }}
            />
        </div>
    )
}

export default CreateNewCh

// const handlenewChSubmit = () => {
// 		if (
// 			enteredEmail.trim().length > 0 &&
// 			enteredName.trim().length > 0 &&
// 			enteredPicUrl.trim().length > 0
// 		) {
// 			const user = {
// 				login: enteredName,
// 				email: enteredEmail,
// 				avatarUrl: enteredPicUrl,
// 			}
// 			props.submitNewPlayer(user)
// 		}
// 	}
