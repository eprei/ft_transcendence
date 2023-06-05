import styles from './Field.module.css'

const Field = () => {
    return (
        <>
            <div className={styles.form__group}>
                <input
                    type="input"
                    className={styles.form__field}
                    placeholder="Name"
                    required
                />
                <label htmlFor="name" className={styles.form__label}>
                    Name
                </label>
            </div>
        </>
    )
}

export default Field
