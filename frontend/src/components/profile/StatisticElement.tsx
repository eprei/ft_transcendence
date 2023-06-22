import React from 'react'
import styles from './StatisticElement.module.css'

interface StatisticElement {
    icon: string
    text: string
    number: number
}

const StatisticElement = ({ icon, text, number }: StatisticElement) => {
    return (
        <div className={styles.container}>
            <img src={icon} alt="Icon" className={styles.icon} />
            <p>{text}</p>
            <p className={styles.number}>{number}</p>
        </div>
    )
}

export default StatisticElement
