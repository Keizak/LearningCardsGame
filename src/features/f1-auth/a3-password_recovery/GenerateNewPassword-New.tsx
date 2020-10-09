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
import {useHistory, useParams} from "react-router";
import {InitialStateType, setNewPasswordTC} from "../../../main/m2-bll/password-gereration-reducer";
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

export default function GenerateNewPasswordNew() {
    let state = useSelector<AppRootStateType, InitialStateType>(state => state.passwordGenerationPage)

    const classes = useStyles();
    const {id} = useParams();
    const history = useHistory()
    let dispatch = useDispatch()

    const formik = useFormik({
        validate:(values)=>{
            if (!values.password){
                return {
                    password: 'Please enter your new password'
                }
            }
        },
        initialValues: {
            password:'',
        },
        onSubmit: values => {
            dispatch(setNewPasswordTC({password: values.password, resetPasswordToken: id}, history));
        },
    });


    return (state.loading ? <Preloader/> :
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                </Avatar>
                <Typography component="h1" variant="h5">
                    New password
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="New password"
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
                        Set new password
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