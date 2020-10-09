import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../main/m2-bll/store";
import {useFormik} from "formik";
import {loginTC} from "../../../main/m2-bll/auth-reducer";
import {NavLink, Redirect} from "react-router-dom";
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    TextField
} from "@material-ui/core";
import {ErrorSnackbar} from "../../../main/m1-ui/common/ErrorSnackbar/ErrorSnackbar";
import React from "react";

const Login = () => {


    const dispatch = useDispatch();
    const isLoginIn = useSelector<AppRootStateType,boolean>(state => state.auth.isLoginIn);

    const formik = useFormik({
        validate:(values)=>{
            if (!values.email){
                return {
                    email:'Please enter your email'
                }
            }
            if (!values.password){
                return {
                    password: 'Please enter your password'
                }
            }
        },
        initialValues: {
            email: '',
            password:'',
            rememberMe: false,
            verified:false
        },
        onSubmit: values => {
            dispatch(loginTC(values));
        },
    });

    if(isLoginIn === true){
        return <Redirect to={'/profile'}/>
    }

    return <Grid container justify="center">
        <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>
                            To log in get registered <a href={'/registration'}
                                                        target={'_blank'}>here</a>
                        </p>
                        <p>
                            or use common test account credentials:
                        </p>
                        <p> Email: nya-admin@nya.nya
                        </p>
                        <p>
                            Password: 1qazxcvBG
                        </p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            {...formik.getFieldProps('password')}
                        />
                        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox />}
                            {...formik.getFieldProps('rememberMe')}
                            checked={formik.values.rememberMe}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                        <ErrorSnackbar/>

                    </FormGroup>
                </FormControl>


            </form>
            <NavLink to={"/password-reset"}>Forgot password?</NavLink>
        </Grid>
    </Grid>
}
export default Login;