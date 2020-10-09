import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../main/m2-bll/store";
import {useFormik} from "formik";
import {ErrorSnackbar} from "../../../main/m1-ui/common/ErrorSnackbar/ErrorSnackbar";

import {Preloader} from "../../../main/m1-ui/common/Preloader/Preloader";
import {resetPasswordTC} from "../../../main/m2-bll/password-reset-reducer";

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

export default function ResetPasswordNew() {
    const classes = useStyles();
    let dispatch = useDispatch()
    let loading = useSelector<AppRootStateType, boolean>(state => state.passwordResetPage.loading)


    const formik = useFormik({
        validate:(values)=>{
            if (!values.email){
                return {
                    email: 'Please enter your new email'
                }
            }
        },
        initialValues: {
            email:'',
        },
        onSubmit: values => {
            dispatch(resetPasswordTC(values.email));
        },
    });


    return (loading ? <Preloader/> :
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Email for password recovery
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
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                   Send
                    </Button>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
            <ErrorSnackbar/>
        </Container>
    );
}