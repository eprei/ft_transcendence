import styles from './Form.module.css'
import Field from './Field.tsx'
import Submit from './Submit.tsx'

const Form = () => {
    return (
        <>
            <form className={styles.signInForm}>
                <Field fieldName="Name" />
                <Field fieldName="Age" />
                <Submit submitName="Submit" />
            </form>
        </>
    )
}

export default Form
