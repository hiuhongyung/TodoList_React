import React, { useState } from "react";
import "./Todo.css";
import db from "./firebase.js";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import {
  ListItem,
  ListItemText,
  List,
  ListItemAvatar,
  Avatar,
  Button,
  Modal,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AssignmentIcon from "@material-ui/icons/Assignment";
import FolderIcon from "@material-ui/icons/Folder";
import PageviewIcon from "@material-ui/icons/Pageview";
import green  from "@material-ui/core/colors";
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();
  const handleOpen = () => {
    setOpen(true);
  };
  const updatetodo = () => {
    //upadate the todo with the new input text
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    //prevent for overriding the element that has already inside the db
    setOpen(false);
  };
  return (
    <div className="todo_list">
      <Modal
        className="todo_modal"
        open={open}
        onClose={(element) => setOpen(false)}
      >
        <div className={classes.paper}>
          <h1> I am a Modal </h1>
          <input
            placeholder={props.todo.todo}
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button onClick={updatetodo}>update the item</Button>
        </div>
      </Modal>

      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar className={classes.green}>
              <AssignmentIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={props.todo.todo}
            secondary="📅 Deadline : Today"
          ></ListItemText>
        </ListItem>
        <button onClick={(element) => setOpen(true)}>Edit </button>

        <DeleteForeverIcon
          onClick={(event) =>
            db.collection("todos").doc(props.todo.id).delete()
          }
        ></DeleteForeverIcon>
      </List>
    </div>
  );
}

export default Todo;
