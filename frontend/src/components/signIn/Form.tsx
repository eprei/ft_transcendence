import styles from './Form.module.css'
import Field from './Field.tsx'

const Form = () => {
    return (
        <>
            <form className={styles.signInForm}>
                <Field />
            </form>
        </>
    )
}

export default Form
