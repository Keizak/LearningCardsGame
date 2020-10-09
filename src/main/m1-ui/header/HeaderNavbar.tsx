import React, {useCallback} from "react";
import style from "./headerNavbar.module.css"
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logoutTC, setIsLoggedInAC} from "../../m2-bll/auth-reducer";

function HeaderNavbar() {
    const dispatch = useDispatch();
    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
        dispatch(setIsLoggedInAC(false))
    }, [])
    return (
        <div className={style.Navbar}>
            <div >
                <NavLink className={style.NavbarItem} activeClassName={style.Active} to="/profile" >My Profile</NavLink></div>
            <div>
                <NavLink className={style.NavbarItem} activeClassName={style.Active} to="/Packs">Packs</NavLink>
            </div>
            <div>
                <NavLink className={style.NavbarItem} activeClassName={style.Active} to="/settings">Settings</NavLink>
            </div>
            <div>
                <NavLink className={style.NavbarItem} activeClassName={style.Active} to="/files">Upload Files</NavLink>
            </div>
            <div>
                <NavLink className={style.NavbarItem} activeClassName={style.Active} to="/login" onClick={logoutHandler}>GetOut</NavLink>
            </div>
        </div>

    )

}

export default HeaderNavbar;
