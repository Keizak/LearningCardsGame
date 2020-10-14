import React from 'react';
import './App.css';
import { Switch, Route, Redirect} from "react-router-dom";
import ProfilePage from "./f5-profile/ProfilePage";
import HeaderNavbar from "./common/header/HeaderNavbar";
import Files from "./f6-files/File/Files";
import Play from "./f3-play/a1-PlayPage/Play";
import SettingsPage from "./f4-settings/SettingPage";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../m2-bll/store";
import PackPage from "./f2-table/a1-TableOfPacks/PacksPage";
import CardPage from "./f2-table/a2-TableOfCards/CardsPage";

function Content() {
    const dispatch = useDispatch()
    const isLoginIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoginIn);
    const isInitialized = useSelector<AppRootStateType, boolean>(state=>state.profilePage.isInitialized);
    if (!isLoginIn && isInitialized) return <Redirect to="/login"/>
    return (
        <div className="App">
            <div className="Container">
            <HeaderNavbar/>
                <Switch>
                <Route exact path="/settings" render={() => (<SettingsPage/>)}/>
                <Route exact path={"/profile"} render={() => (<ProfilePage/>)}/>
                <Route exact path="/Cards/:id" render={() => (<CardPage/>)}/>
                <Route exact path="/Packs" render={() => (<PackPage/>)}/>
                <Route exact path="/files" render={() => (<Files/>)}/>
                <Route exact path="/play/:id" render={() => (<Play/>)}/>
                </Switch>
            </div>
        </div>
    );
}

export default Content;
