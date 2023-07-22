import styles from './MainProfile.module.css'
import FriendList from '../components/profile/FriendList'
import Statistics from '../components/profile/Statistics'
import UserInformation from '../components/profile/UserInformation'
import { userActions } from '../store/user'
import { useAppDispatch } from '../store/types'
import { UserData } from '../types/UserData'
import { useLoaderData } from 'react-router-dom'
import { useEffect, useState } from 'react'
import AddFriendsBtn from '../components/profile/AddFriendsBtn'

export interface friendList {
    myId: number
    listOfFriends: {
        id: number
        isPending: boolean
        user: {
            id: number
            nickname: string
            avatarUrl: string
            status: 'online' | 'offline' | 'playing'
        }[]
    }
    listOfPendings: {
        id: number
        isPending: boolean
        user: {
            id: number
            nickname: string
            avatarUrl: string
            status: 'online' | 'offline' | 'playing'
        }[]
    }
}

const MainProfile = () => {
    const [friendList, setFriendList] = useState({
        myId: 0,
        listOfFriends: [],
        listOfPendings: [],
    })

    const refreshTime: number = 3000
    const fetchUserData = useLoaderData() as UserData
    const dispatch = useAppDispatch()
    dispatch(userActions.update({ user: fetchUserData }))

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8080/api/user/getmyfriends`,
                    {
                        method: 'GET',
                        credentials: 'include',
                    }
                )

                if (!response.ok) {
                    throw new Error('Error fetching friends')
                }

                const data = await response.json()
                const { myId, listOfFriends, listOfPendings } = data

                setFriendList({
                    myId,
                    listOfFriends,
                    listOfPendings,
                })

                setIsLoading(false)
            } catch (error) {
                console.error(error)
                setIsLoading(false)
            }
        }

        // Call fetchFriends immediately and then every 3 seconds
        fetchFriends() // Initial call
        const intervalId = setInterval(fetchFriends, refreshTime) //Periodic call every 3 seconds

        // Cleaning the interval when the component is disassembled
        return () => clearInterval(intervalId)
    }, [])

    // useEffect(() => {
    //     const fetchOtherUsers = async () => {
    //         try {
    //             const response = await fetch(
    //                 `http://localhost:8080/api/user/getallnonfriendusers`,
    //                 {
    //                     method: 'GET',
    //                     credentials: 'include',
    //                 }
    //             )

    //             if (!response.ok) {
    //                 throw new Error('Error fetching other users')
    //             }

    //             const otherUsersData: getMyFriendsProps = await response.json()
    //             setOtherUsers(otherUsersData)
    //             setIsLoading(false)
    //         } catch (error) {
    //             console.error(error)
    //             setIsLoading(false)
    //         }
    //     }

    //     fetchOtherUsers()
    //     const intervalId = setInterval(fetchOtherUsers, refreshTime)

    //     return () => clearInterval(intervalId)
    // }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className={styles.container}>
            <h1>Profile</h1>
            <div className={styles.body}>
                <div className={styles.bodyLeftSide}>
                    <UserInformation />
                    <Statistics />
                    {/* <AddFriendsBtn otherUsers={otherUsers}/> */}
                </div>
                <div className={styles.bodyRightSide}>
                    <FriendList friendList={friendList} />
                </div>
            </div>
        </div>
    )
}

export default MainProfile

export async function loader() {
    const response = await fetch(`http://localhost:8080/api/user/me`, {
        method: 'GET',
        credentials: 'include',
    })

    if (response.status !== 200) {
        throw new Response(
            JSON.stringify({ message: 'Error fetching user data' }),
            { status: 400 }
        )
    }

    const data = await response.json()
    return data
}
