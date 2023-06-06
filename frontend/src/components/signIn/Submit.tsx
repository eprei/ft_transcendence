import styles from './Submit.module.css'

interface SubmitProps {
    submitName: string
}

const Submit = ({ submitName }: SubmitProps) => {
    return (
        <>
            <button className={styles.btn} type="button">
                <strong>{submitName}</strong>
                <div className={styles.containerStars}>
                    <div className={styles.stars}></div>
                </div>

                <div className={styles.glow}>
                    <div className={styles.circle}></div>
                    <div className={styles.circle}></div>
                </div>
            </button>
        </>
    )
}

export default Submit
