import styles from './Form.module.css'
import Field from './Field.tsx'

const Form = () => {
    return (
        <>
            <form className={styles.signInForm}>
                <Field fieldName="Name" />
                <Field fieldName="Age" />
            </form>
        </>
    )
}

export default Form
