import { useForm } from 'react-hook-form'
import Input from '@mui/material/Input'
import './Form.module.css'
import * as React from 'react'

const SignInForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => console.log(data)

    console.log(watch('example')) // watch input value by passing the name of it

    return (
        <>
            <div className="main">
                <h1 className="title">Sign in</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* register your input into the hook by invoking the "register" function */}
                    <Input defaultValue="test" {...register('example')} />

                    {/* include validation with required or other standard HTML validation rules */}
                    <Input
                        {...register('exampleRequired', { required: true })}
                    />
                    {/* errors will return when field validation fails  */}
                    {errors.exampleRequired && (
                        <span>This field is required</span>
                    )}

                    <Input type="submit" />
                </form>
            </div>
        </>
    )
}

export default SignInForm
