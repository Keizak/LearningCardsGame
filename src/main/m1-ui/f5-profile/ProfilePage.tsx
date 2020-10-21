import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../m2-bll/store";
import {userDate} from "../../m2-bll/auth-reducer";
import style from "./styleProfilaPage.module.css"
import TableForProfile from "../f2-table/a3-TableOfProfile/TableProfile";
import {PackType} from "../../m2-bll/table-reduser";
import {getMyPacksTC} from "../../m2-bll/profile-reducer";

function ProfilePage() {
    const {name, email, avatar, publicCardPacksCount, _id} = useSelector<AppRootStateType, userDate>((state) => state.auth.UserData)
    const PacksData = useSelector<AppRootStateType, Array<PackType> | null>(state => state.profilePage.myPacks);
    const dispatch = useDispatch();
    const defaultAvatar = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAilBMVEX///8CAgD+/v6oqKgDAwH7+/v9/fsDAwD///0GBgb19fXNzc3h4eGysrL6+vhnZ2fp6ek5OTeLi4mGhoa+vr7j4+NOTk5JSUmXl5fCwsLc3NqkpKLU1NQgICB2dnZra2uUlJQqKipgYGCurqx/f30uLixXV1USEhInJyU6OjoXFxQPDw3IyMZBQT/MR/68AAAJqElEQVR4nO2dCVviOhSG09gCraKAqLhv49w73vH//72bk4CWNklPThLa8uRzA5rlvM2+NDJ2ZOI19W1LHCXC8YtGqPPBPWWzbHe967XOffMvDnNIhJjwxk1oivt4CG3h6f6Gq25M1ndZovOne2/zp4uz/ndQhK20S4QjI2x8PizCpKSkuApZYm01UVd8ulql+XnrNckqHx2akGaVjxKhLb54uTQpKWm86qugHy7eRDj+eI+fMCkp6eh1/LVJIsQ7GqqIhLbxceiWlDek+9zkvisso8NEmAiddHjC0ATNsAtYfGHbP70oKqH64Yqurzo8JiHby4THmIYQfLU4uzs7W1SjboX3VIikOp9MGKtuN8/LrKbl8+a2AheFKJWFS5hdqdCqnQh241WwQkRwt/lQWPk0375Qfz42d9KiEROC7e8y7UpBlSuyXP6IL3ixfIeq1SnMYRGy+ZYp//mR3/ByqiDnjmEOhnAiyt9ir+yZtFxIxwZTItd+HppN2LvMnh0qZTKeT+rNSV0DJmQvwvwy7yKcloJxxWambsBwCdlKFLUy707DHO7CJTPVN8MkhCbuHpFDdxKI97Lx9JDpTsS5PaKJe3AAzCClHxzbxXachyQUpgIgGlFmZumNrsMSMnaZTbPuWuaHULSMl34xHo4QIpos0Bm0psWMG1qMgQkQf2Xo9Nspz55Yb4MqR4nxhEs186NqLLObXLQU3e1gKw3z7CQOYX3CxlhaXWZ+hNOleyYFwqVoSMMrPCFjC1GREhBFXQPN/uAJ5ZBJDo9cAUvRAw/OFycNnwjFEPqwojaNgNi5K9ymutvda9ExeXTG2+qRmeOv22Zz03IbnpBzKmCWFebthMMh5OyMTnjGUTsv+yZc0wnXduv9CG0+XcTZCZ3w3b7plWZfaEIGsxdUbcZAyMXIiazVOAif6IRPMQhDi7NnOuFF39ZjlAgT4bCkK/kwhUHW09AG+fq6zau1GJj0hB4t/v0Y0tCr13bSB4WrvHrejqulOHvCh3hKJzwNbk4Uwis64VV4g6LMT9IJPVfYtNZY3hFVMMp8t1QZfd0iRPDCxt9Uwt9jIVxRCS/HQjinEs5HsTQjCO/U7iB3PYwBUG71yjLCusU0ywSg10r3YcTV2pMz4RTWnkaxRFqIrxUkiKPkviHHXXw4NXvPvrM94H1NSEPhYx2njxWDsCKUwzzSKncUQs4+CNk0+4hSDCMRrihpuIpEuLPKtjrTnDHWud/ze+q+F6PM/rbC1cVV/wxlUxRCzlz5QO1gh0vIKDOKF3aaYRGSZjI02xTCENrImoTNz7QByvaiUJsrkMp3bYXGDqPlDTfmlIpCKCe+8XsT4V5cNPbSDJyQ8VsXQEjuW9YMZ7CE8EtuoXVoEtUG2siEOjKMDDGKRr/Et4mlau4pdnTbH4tw4dD7zmEekY2MkLNrl7r0+scfMX4fF7gYWoQOPbdSTnabdwth4vdxYfdreg8jfbRe3XKoi808GmGh+jW4sjhXFalLvP0TihbjEUv4CM+Sjo6wgM4pchy8ZjHTMJpE0H8QbaJw8er6zJPT3XC33CFozEpimW0rUpegB0Iown7D5NE359UKn9YtnGQJrzA1zYLUBsaw2V2cvcMQw0wJNdF9w89grMdImHpj757m2U2jqIyLUNSRlXUdSj1FMmJCGCjeWgjhQtU4NWJkhOLnzFrZ5NmZ8RnnMQhMX1t7brAcM2JAxtSTelbCE+fWcFiSGzOshG9Rux3RJYYMncOLcZfDAp7U6xjrz8ewdm+SIPync0Lqdcy5VD57Yeu1ZWoisX/tWmFMa7wbnZ7Pztn5M2I2agpnDUwm8jQ3x9aeI3p8uAAJhOLVZIN5aB0S+HPNZjWPaPVJyNjVKlPHQ3Uiwl34970gzAj3RSh+VSd/lO3dyzPlrir69bDzjRaO0DabhI5Jrn9AF7oQ2a2aE7dffm7u2EwEAt/f/92qbld9Bqr5Xuc2JKGsJ6Dprt6vM3lYiSueesD9Ux3hJs9BGxIh22XO+bU0lvY8/rTMYcz/CJDt4tMzIXjZ4gHd9+F6bohSUO+8bhYsbC6t+8JDqaw5m8HBiJM5aloNr+VJJftEe+WRVIK8CEXBKyazGXuQD3M5rIh2Sabn2y1EU3gSMr80hAqhuv/M1FI8aV+wAVCdO3F5BlEV9TgPSyiifpB7g6DsEXc+awlFXVzmMk9cr1nIXIolg6wzmYnit3ZYI6Tq855tl6b27MTYrDxQCKFRFnzzR8p+bkdBQr5U7NvUwxDK/Dn/DwyITygz/8vkp8frRui2FrfzJfj+vqpj1qITTrfdh/tG240nrL/C+DqfiYHfgvzgD12Pf5loes+dU8SZcHYOM4SHl0jH39UMRsqxCSezxVfQ1h2NmMOs1QEIYWE3R5y8Gh4QoryYuM4FuDWghdwIFL/+NKrMluoEbeQuBfcuQiEACed4BQMUWee1UhtR4xDCfrw+iuA3IRTGG47emeJOWMD+kby/RISJnzJ7Rs/mOBLCWOmSdKZlWJVyj5hTyqDvB7ujPOwTWHLdOMqKHHTVvlw2b8dSmRN24KAIObsVpaD3XJrDuPE0xnpVUbB/+6b71ld7NjgAoUjCoUg+BRackLObvsG+VWY3MQiveuytNVRu9/YHpINf5JMSIkg9jomqbZBrT/BNO8E6iiAzYWtTLCFnTv8KILLAkAek8diszNlLwPlQb+XqmMxwhBDWn76pGvpifv8tokEIhwP3OKbQCl+H4JydUs8riabTkOVQuLqnrHpGFfL0OvvTVD8zVD7HPUbSU7u94DX92I8hFGF99A3Ukma3mAch7QiByApJyDnp36pE1kJrr56weaXt0+OkwEjK4VQpw0z2HiWO0Oe0x0iSO8QDEnqc2BlJaod4OMJN30AabVCE7RVSHaXHMXoRtWrtstAJS+hx+nE0/QpIyHxOko+kXM7uhyMcXqctIxPqddE3jkYXqgBptEeOIuR8fTI8rXlAwmE+8xGUMMZKiJ+2NiEIvWOy3J3u8t12X685XOPX+UmEbjG4XDO5T4S2OFzjC6vBVVXBlQjHr+Mn7EvHf2cT4fh1/IRJSUn96/hrmkQ4fg2PsN9R7CEUmnB4tysROodnjCH0DJOrv6Zb24yT9RrJmkRICbMrjkRovEaahd25barLTf0zmxuTO1u8us/VxUSYCIdP2PSNJWzGjL0jJj9aSosbU1j6O5YIuyzHukuE8QipqsfiSmqi1Fmts9wWZzjERNgVuy08q9WJcN9BzZl8t+2sMs4bl7RBaS/wnfvmHdA411lst3x33XBDmwH+D99Tg1bgalCnAAAAAElFTkSuQmCC"
    useEffect(() => {
        dispatch(getMyPacksTC({user_id: _id}))
    }, [])
    return (
        <div className={style.MainContainer}>
            <div className={style.profileInfo}>
                <div className={style.Photo}>
                    {avatar.length >= 4 ? <img src={avatar}/> : <img src={defaultAvatar}/> }
                </div>
                <div className={style.Info}>
                    <div className={style.InfoItem}>Name: {name}</div>
                    <div className={style.InfoItem}>Email: {email} </div>
                    <div className={style.InfoItem}>Count of your Packs: {publicCardPacksCount} </div>
                </div>
            </div>
            <div className={style.table}>
                <div className={style.title}><h1>Your best packs</h1></div>
                <TableForProfile columnsName={["Name", "Cards", "Grade"]}
                                 buttonsData={[]}
                                 rowContent={PacksData}/>
            </div>
        </div>
    );
}

export default ProfilePage;