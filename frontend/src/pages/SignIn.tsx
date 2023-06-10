const Product = () => {
    return (
        <>
            <h1>Sign in</h1>
            <form>
                <label>speudo:</label>
                <input id="pseudo" name="pseudo" required />
                <input
                    id="submitSpeudo"
                    name="submitSpeudo"
                    type="submit"
                    value="submit speudo"
                />
            </form>
        </>
    )
}

export default Product
