import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../m2-bll/store";
import {userDate} from "../../m2-bll/auth-reducer";
import style from "./styleProfilaPage.module.css"
import TableForProfile from "../f2-table/a3-TableOfProfile/TableProfile";
import {PackType} from "../../m2-bll/table-reduser";
import {getMyPacksTC} from "../../m2-bll/profile-reducer";
import {Preloader} from "../common/Preloader/Preloader";

function ProfilePage() {
    const {name, email, avatar, publicCardPacksCount, _id} = useSelector<AppRootStateType, userDate>((state) => state.auth.UserData)
    const PacksData = useSelector<AppRootStateType, Array<PackType> | null>(state => state.profilePage.myPacks);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMyPacksTC({user_id: _id}))
    }, [])
    return (
        <div className={style.MainContainer}>
            <div className={style.Photo}>
                <img src={avatar}/>
            </div>
            <div className={style.ProfileInfo}>
                <div className={style.InfoItem}>Name: {name}</div>
                <div className={style.InfoItem}>Email: {email} </div>
                <div className={style.InfoItem}>Count of your Packs: {publicCardPacksCount} </div>
                <div><TableForProfile columnsName={["Name", "Cards", "Grade"]}
                                       buttonsData={[]}
                                       rowContent={PacksData}/></div>
            </div>
        </div>
    );
}

export default ProfilePage;