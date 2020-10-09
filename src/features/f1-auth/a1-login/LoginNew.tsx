import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useDispatch, useSelector, useStore} from "react-redux";
import {AppRootStateType} from "../../../main/m2-bll/store";
import {useFormik} from "formik";
import {isInitializedTC, loginTC} from "../../../main/m2-bll/auth-reducer";
import {NavLink, Redirect} from "react-router-dom";
import {ErrorSnackbar} from "../../../main/m1-ui/common/ErrorSnackbar/ErrorSnackbar";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function LoginNew() {
    const classes = useStyles();
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
            email: 'Keizak@yandex.ru',
            password:'s12s12s12',
            rememberMe: false,
        },
        onSubmit: values => {
            dispatch(loginTC(values));
        },
    });
    if(isLoginIn){
        return <Redirect to={'/profile'}/>
    }

    return(<div><Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            id="password"
                            type="password"
                            {...formik.getFieldProps('password')}
                        />
                        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox color={"primary"}/>}
                            {...formik.getFieldProps('rememberMe')}
                            checked={formik.values.rememberMe}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <NavLink to={"/password-reset"} >
                                    Forgot password?
                                </NavLink>
                            </Grid>
                            <Grid item>
                                <NavLink to={"/registration"}>
                                    {"Don't have an account? Sign Up"}
                                </NavLink>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
                <ErrorSnackbar/>
            </Container>
        </div>
    );
}