import React, {useState} from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }),
);

export default function SimpleModalInput({text, open, setModalOpen, onButtonClick}: { text: string, open: boolean, setModalOpen: (value: boolean) => void, onButtonClick: (name: string) => void }) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const confirm = (data: any) => {
        setModalOpen(false);
        onButtonClick(title)
        setTitle("")
    }
    const cancel = () => {
        setModalOpen(false)
    }
    let [title, setTitle] = useState<string>("")

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">{text}</h2>
            <p id="simple-modal-description">New title:</p>
            <TextField style={{width:"100%"}} value={title} name={"Name"} onChange={(event) => setTitle(event.currentTarget.value)}/>

            <div style={{display: "flex", justifyContent: "space-around"}}>
                <Button size={"small"} style={{margin: "5px", height: " 20px"}} variant="contained" color="primary"
                        onClick={confirm}>
                    Confirm
                </Button>
                <Button size={"small"} style={{margin: "5px", height: " 20px"}} variant="contained" color="primary"
                        onClick={cancel}>
                    Cancel
                </Button>
            </div>
        </div>
    );

    return (
        <div>

            <Modal
                open={open}
                onClose={() => setModalOpen(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}