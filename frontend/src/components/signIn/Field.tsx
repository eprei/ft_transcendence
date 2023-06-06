import styles from './Field.module.css'

interface FieldProps {
    fieldName: string
}

const Field = ({ fieldName }: FieldProps) => {
    return (
        <>
            <div className={styles.form__group}>
                <input
                    type="input"
                    className={styles.form__field}
                    placeholder={fieldName}
                    required
                />
                <label htmlFor="name" className={styles.form__label}>
                    {fieldName}
                </label>
            </div>
        </>
    )
}

export default Field
