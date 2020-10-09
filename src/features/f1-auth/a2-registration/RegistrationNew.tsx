import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../main/m2-bll/store";
import {useFormik} from "formik";
import {NavLink, Redirect} from "react-router-dom";
import {ErrorSnackbar} from "../../../main/m1-ui/common/ErrorSnackbar/ErrorSnackbar";
import {registrationTC, setIsLoadingAC} from "../../../main/m2-bll/registration-reducer";
import {Preloader} from "../../../main/m1-ui/common/Preloader/Preloader";

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

export default function RegistrationNew() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const isRegistered = useSelector<AppRootStateType, boolean>(state => state.registrationPage.isRegistered);
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.registrationPage.isLoading);
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error);

    const checkEmail = /\S+@\S+\.\S+/
    const checkPassword = /(?=.*[0-9])(?=.*[a-z])[0-9a-z]{8,}/

    const formik = useFormik({validate: (values) => {
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
    return (isLoading === true ? <Preloader/>:
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
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

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <NavLink to={"/login"} >
                                Already have an account? Sign In
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
    );
}