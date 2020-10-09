import React from 'react';
import './App.css';
import { Switch, Route, Redirect} from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import HeaderNavbar from "./header/HeaderNavbar";
import CardsPage from "./pages/CardsPage";
import PacksPage from "./pages/PacksPage";
import Files from "./pages/File/Files";
import Play from "../../features/f3-play/Play";
import SettingsPage from "./pages/SettingPage";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../m2-bll/store";

function Content() {
    const dispatch = useDispatch()
    const isLoginIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoginIn);
    const isInitialized = useSelector<AppRootStateType, boolean>(state=>state.profilePage.isInitialized);
    if (!isLoginIn && isInitialized) return <Redirect to="/login"/>
    return (
        <div className="App">
            <div className="Container"></div>
            <HeaderNavbar/>
                <Switch>
                <Route exact path="/settings" render={() => (<SettingsPage/>)}/>
                <Route exact path={"/profile"} render={() => (<ProfilePage/>)}/>
                <Route exact path="/Cards/:id" render={() => (<CardsPage/>)}/>
                <Route exact path="/Packs" render={() => (<PacksPage/>)}/>
                <Route exact path="/files" render={() => (<Files/>)}/>
                <Route exact path="/play/:id" render={() => (<Play/>)}/>
                </Switch>
        </div>
    );
}

export default Content;
