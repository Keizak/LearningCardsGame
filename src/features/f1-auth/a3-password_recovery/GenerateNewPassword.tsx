import React, { useState} from "react";
import {Input} from "../../../main/m1-ui/common/Input/Input";
import {Button} from "../../../main/m1-ui/common/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {InitialStateType, setNewPasswordTC} from "../../../main/m2-bll/password-gereration-reducer";
import {useParams, Redirect, useHistory} from "react-router"
import {Preloader} from "../../../main/m1-ui/common/Preloader/Preloader";
import {AppRootStateType} from "../../../main/m2-bll/store";


function GenerateNewPassword() {

    const {id} = useParams();
    const history = useHistory()
    let dispatch = useDispatch()

    let state = useSelector<AppRootStateType, InitialStateType>(state => state.passwordGenerationPage)
    let [password, setPassword] = useState<string>("")


    const onInputChange = (value: string) => setPassword(value)
    const resetPass = () => {
        dispatch(setNewPasswordTC({password: password, resetPasswordToken: id}, history))
        setPassword("")
    }

   // if (state.response !== null) {
   //     return <Redirect to={"/login/"}/>
   // }

    return (state.loading ? <Preloader/> :
            <div>
                <h1>Password Generation Page</h1>
                <h3>Change password:</h3>
                <h4>Please enter your new password.</h4>
                <Input onChange={onInputChange} error={false} value={password} placeholder={"Please set new password"}/>
                <Button onClick={resetPass} text={"Set new password"}/>
            </div>
    );
}

export default GenerateNewPassword;