import React, {useState} from "react";
import {Input} from "./../../../main/m1-ui/common/Input/Input";
import {Button} from "./../../../main/m1-ui/common/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {Preloader} from "./../../../main/m1-ui/common/Preloader/Preloader";
import {AppRootStateType} from "../../../main/m2-bll/store";
import {resetPasswordTC} from "../../../main/m2-bll/password-reset-reducer";


function ResetPassword() {

    let dispatch = useDispatch()
    let loading = useSelector<AppRootStateType, boolean>(state => state.passwordResetPage.loading)


    let [email, setEmail] = useState<string>("")

    const resetPass = () => {dispatch(resetPasswordTC(email)); setEmail("")}
    const onInputChange = (value: string) => setEmail(value)

    return (loading ? <Preloader/> :
            <div>
                <h1>Password Reset Page</h1>
                <div>Email for reset:</div>
                <Input onChange={onInputChange} error={false} value={email} placeholder={"Please set email"}/>
                <Button onClick={resetPass} text={"Reset password"}/>
            </div>
    )
}

export default ResetPassword;