import React, {useState} from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {TextField} from "@material-ui/core";
import {Rating} from "@material-ui/lab";

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

export default function SimpleModalGrade({text, open, setModalOpen, onButtonClick}: { text: string, open: boolean, setModalOpen: (value: boolean) => void, onButtonClick: (grade: number) => void }) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const confirm = (data: any) => {
        setModalOpen(false);
        onButtonClick(value)
    }
    const cancel = () => {
        setModalOpen(false)
    }
    let [value, setValue] = useState<number>(0)
    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">{text}</h2>
            <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                    if (newValue)
                    setValue(newValue);
                }}
            />
            <p id="simple-modal-description">

            </p>
            <button type="button" onClick={confirm}>
                Add
            </button>
            <button type="button" onClick={cancel}>
                Cancel
            </button>
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