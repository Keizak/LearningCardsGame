import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../main/m2-bll/store";
import {useFormik} from "formik";
import {ErrorSnackbar} from "../../../main/m1-ui/common/ErrorSnackbar/ErrorSnackbar";
import {userDate} from "../../m2-bll/auth-reducer";
import {Preloader} from "../../../main/m1-ui/common/Preloader/Preloader";
import {changeUserDataTC} from "../../m2-bll/profile-reducer";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: '15vh',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function SettingsPage() {
    const classes = useStyles();
    let dispatch = useDispatch()
    const loading = useSelector<AppRootStateType, boolean>(state => state.passwordResetPage.loading)
    const isLoginIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoginIn);
    const {name,avatar} = useSelector<AppRootStateType,userDate>(state => state.auth.UserData);

    const updateProfile = (name: string, newAvatar: string) => {
        dispatch(changeUserDataTC({name: name, avatar: newAvatar}))
    }
    const formik = useFormik({
        validate: (values) => {
            if (!values.name) {
                return {
                    email: 'Please enter your new name'
                }
            }
        },
        initialValues: {
            name: name,
            avatar: avatar,
        },
        onSubmit: values => {
            debugger
            dispatch(changeUserDataTC({name: values.name, avatar: values.avatar}))
        },
    });
    return (loading ? <Preloader/> :
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h6">
                        Change your name
                    </Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="name"
                            name="name"
                            autoComplete="name"
                            label="Name"
                            margin="normal"
                            {...formik.getFieldProps('name')}
                        />
                        {formik.errors.name ? <div>{formik.errors.name}</div> : null}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Change
                        </Button>
                    </form>
                </div>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h6">
                        Change your avatar
                    </Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="avatar"
                            name="avatar"
                            autoComplete="avatar"
                            label="Url for your avatar"
                            margin="normal"
                            {...formik.getFieldProps('avatar')}
                        />
                        {formik.errors.name ? <div>{formik.errors.avatar}</div> : null}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Change
                        </Button>
                    </form>
                </div>
                <ErrorSnackbar/>
            </Container>
    );
}

export default SettingsPage;