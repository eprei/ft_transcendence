import { useState } from 'react'

import TempForm from '../components/tempLogin/TempForm'
import TempPlayerList from '../components/tempLogin/TempPlayerList'
import styles from './TempLogin.module.css'

interface Player {
    login: string
    email: string
    avatarUrl: string
}

async function getUsers() {
    try {
        const response = await fetch('http://localhost:8080/api/player')

        if (!response.ok) {
            throw new Error('Failed to fetch users')
        }

        const users = await response.json()
        return users
    } catch (error) {
        console.error(error)
    }
}

async function postData(data: Player) {
    try {
        const response = await fetch('http://localhost:8080/api/player', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            throw new Error('Failed to make POST request')
        }

        const responseData = await response.json()
        return responseData
    } catch (error) {
        console.error(error)
    }
}

const TempLogin = () => {

    const [players, setPlayers] = useState<Player[]>([])

    const submitFormHandler = (user: Player) => {
        postData(user).then((responseData) => {
            console.log(responseData)
        })
    }

    const getUsersHandler = () => {
        getUsers().then((users) => {
            setPlayers(users)
            console.log(users)
        })
    }

    return (
        <div className={styles.container}>
            <TempForm submitNewPlayer={submitFormHandler} getPlayers={getUsersHandler}></TempForm>
            <TempPlayerList getPlayers={getUsersHandler} players={players}></TempPlayerList>
        </div>
    )
}

export default TempLogin