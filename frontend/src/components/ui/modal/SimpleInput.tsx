import ReactDOM from 'react-dom'
import { useState } from 'react'
import Backdrop from './Backdrop'
import Card from '../Card'
import styles from './SimpleInput.module.css'

interface Props {
    onConfirm: (newPassword: string) => void
    onCancel: () => void
    title: string
    content: string
}

const Input = (props: Props) => {
    const [errorMessage, setErrorMessage] = useState('')
    const [inputValue, setInputValue] = useState('')

    const inputNotEmpty = () => {
        if (inputValue.trim() === '') {
            setErrorMessage('Value is required')
            return false
        }
        return true
    }

    const checkInputValues = () => {
        if (inputNotEmpty()) {
            return true
        }
        return false
    }

    const onOk = () => {
        const isValid = checkInputValues()
        if (isValid) {
            props.onConfirm(inputValue)
            setInputValue('')
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setInputValue(event.target.value)
    }

    return (
        <Card className={styles.modal}>
            <header className={styles.header}>
                <h4>{props.title}</h4>
            </header>
            <div className={styles.formControl}>
                <input
                    type="text"
                    name="channelName"
                    onChange={handleInputChange}
                    placeholder={props.content}
                    autoComplete="off"
                />
                {errorMessage !== '' && (
                    <p className={styles.error}>{errorMessage}</p>
                )}
            </div>
            <div className={styles.formActions}>
                <button className={styles.confirmBtn} onClick={onOk}>
                    Send
                </button>
                <button className={styles.cancelBtn} onClick={props.onCancel}>
                    Cancel
                </button>
            </div>
        </Card>
    )
}

const SimpleInput = (props: Props) => {
    return (
        <>
            {ReactDOM.createPortal(
                <Backdrop />,
                document.getElementById('backdrop')!
            )}
            {ReactDOM.createPortal(
                <Input
                    onConfirm={props.onConfirm}
                    onCancel={props.onCancel}
                    title={props.title}
                    content={props.content}
                />,
                document.getElementById('modal')!
            )}
        </>
    )
}

export default SimpleInput