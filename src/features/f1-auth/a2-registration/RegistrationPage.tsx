import React from "react";
import style from "./css.module.css";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../main/m2-bll/store";
import {useFormik} from "formik";
import {registrationTC, setIsLoadingAC} from "../../../main/m2-bll/registration-reducer";
import {Redirect} from "react-router-dom";


function RegisterPage() {

    const dispatch = useDispatch();
    const isRegistered = useSelector<AppRootStateType, boolean>(state => state.registrationPage.isRegistered);
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.registrationPage.isLoading);
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error);

    const checkEmail = /\S+@\S+\.\S+/
    const checkPassword = /(?=.*[0-9])(?=.*[a-z])[0-9a-z]{8,}/

    const formik = useFormik({
        validate: (values) => {
            if (checkEmail.test(values.email) === false) {
                return {
                    email: 'Please enter your email'
                }
            }
            if (checkPassword.test(values.password) === false) {
                return {
                    password: 'Please enter your password'
                }
            }
        },
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: values => {
            let data = {
                email: values.email,
                password: values.password
            }
            dispatch(setIsLoadingAC(true))
            dispatch(registrationTC(data))
        },
    });

    if (isRegistered === true) {
        return <Redirect to={'/login'}/>
    }

    return (
        <div className={style.registerPage}>
            <div className={style.contentContainer}>
                <div className={style.Container}>
                    <div className={style.title}><h1>Registration Page</h1></div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={style.formgroup}>
                            <input
                                className={style.formValue}
                                id="email"
                                name="email"
                                type="text"
                                placeholder="Enter your Email"
                                onChange={formik.handleChange}
                                value={formik.values.email}/>
                            <label htmlFor={"email"}>Email</label>
                        </div>
                        <div className={style.formgroup}>
                            <input
                                className={style.formValue}
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                onChange={formik.handleChange}
                                value={formik.values.password}/>
                            <label htmlFor={"password"}>Password</label>
                        </div>
                            <button>Регистрация</button>
                        { isLoading === true ?
                            <div className={style.preloader}>
                            <div className={style.preloader__image_animate}></div>
                            </div> :
                            <span></span>}
                        {formik.errors.password ?<div className={style.errorMessage}><div className={style.errorText}>Password<br/> incorrect</div></div>: null}
                        {formik.errors.email ?<div className={style.errorMessage}><div className={style.errorText}>Email<br/> incorrect</div></div>: null}
                        {error ?<div className={style.errorMessage}><div className={style.errorText}>{error}</div></div>: null}
                    </form>
                </div>
                <div className={style.rules}>Правила  регистрации:<br/><br/>
                    Пример Email`a : test@test.ru<br/>
                    Пароль: от 8 символов,прописные буквы и цифры обязательно</div>
            </div>

        </div>
    )}

export default RegisterPage;