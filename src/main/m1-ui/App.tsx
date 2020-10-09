import React, {useEffect} from 'react';
import './App.css';
import {HashRouter, Switch, Route, Redirect} from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import PasswordResetPage from "./pages/PasswordResetPage";
import PasswordGenerationPage from "./pages/PasswordGenerationPage";
import LoginPage from "./pages/LoginPage";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../m2-bll/store";
import Content from "./Content";
import {} from "../m2-bll/profile-reducer";
import {Preloader} from "./common/Preloader/Preloader";
import {isInitializedTC} from "../m2-bll/auth-reducer";

function App() {
    const isInitialized = useSelector<AppRootStateType, boolean>(state=>state.auth.isInitialized);
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(isInitializedTC())
    },[])
    return (
        <div className="App">
            {isInitialized ? <Switch>
                <Route exact path="/registration" render={() => (<RegistrationPage/>)}/>
                <Route exact path="/password-reset" render={() => (<PasswordResetPage/>)}/>}
                <Route exact path="/password-generation/:id" render={() => (<PasswordGenerationPage/>)}/>
                <Route exact path="/password-generation" render={() => (<h1>We send to your mail link for password change. Use it!</h1>)}/>
                <Route exact path={["/login","/"]} render={() => (<LoginPage/>)}/>
                <Route path="/" render={() => (<Content/>)}/>
            </Switch>: <Preloader/>}

        </div>
    );
}

export default App;
