import TwoFactorVerificationBox from '../components/TFAVerify/TwoFactorVerificationBox'
import styles from './TFA.module.css'

const TFAAuthenticate = () => {
    const url = 'http://localhost/api/auth/2fa/authenticate'

    return (
        <div className={styles.container}>
            <TwoFactorVerificationBox url={url} />
        </div>
    )
}

export default TFAAuthenticate
