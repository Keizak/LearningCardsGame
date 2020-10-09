import React, {useState} from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {TextField} from "@material-ui/core";
import {Rating} from "@material-ui/lab";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";

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
            display:"flex",
            flexDirection:"column",
            justifyContent: "space-around",
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }),
);

export default function SimpleUpdatePackInput({text, open, setModalOpen, onButtonClick}:
    { text: string, open: boolean, setModalOpen: (value: boolean) => void,
        onButtonClick: (name: string, rating:number, grade:number, deckCover:string) => void }) {
    const classes = useStyles();
    let [deckCover, setDeckCover] = useState<string>("My deck Cover")

    const [modalStyle] = React.useState(getModalStyle);
    const confirm = (data: any) => {
        setModalOpen(false);
        onButtonClick(name, rating, grade, deckCover)
        setName("")
    }
    const cancel = () => {
        setModalOpen(false)
    }
    let [grade, setGrade] = useState<number>(0)
    let [rating, setRating] = useState<number>(0)
    let [name, setName] = useState<string>("")
    const body = (
        <div  style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">{text}</h2>
            <p id="simple-modal-description">
                New name:
            </p>
            <TextField name={"Name"} onChange={(event) => setName(event.currentTarget.value)}/>
            <p id="simple-modal-description">
                Rating:
            </p>
            <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                    if (newValue)
                        setRating(newValue);
                }}
            />
            <InputLabel id="demo-simple-select-label">Grade</InputLabel>
            <input value={grade} type="number" onChange={event => setGrade(Number(event.currentTarget.value))}/>
            <input type={"file"}/>
          <div style={{display:"flex", justifyContent:"space-around"}}>
              <Button size={"small"} style={{margin:"5px", height:" 20px"}} variant="contained" color="primary" onClick={confirm}>
                  Confirm
              </Button>
              <Button  size={"small"} style={{margin:"5px", height:" 20px"}} variant="contained" color="primary" onClick={cancel}>
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