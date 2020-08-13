import React, { useState, useEffect } from "react";
import "./App.css";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
function App() {
  const [todos, setTodos] = useState([
    //Prevent hard code and get it from the database
  ]);
  //when the app loads, we need to listen to the database and fetch new todos as they get added/remove
  useEffect(() => {
    //this code here...fires when the app.js loads
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snaphot) => {
        setTodos(
          snaphot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        ); //bublle up to an array
      });
  }, []);

  const [input, setInput] = useState(""); //pass the empty string
  //when you click the input button
  const addTodo = (event) => {
    event.preventDefault(); //will stop the refresh

    //adding the input to the database
    db.collection("todos").add({
      todo: input,

      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setTodos([...todos, input]); //appending into the current state
    //{'previous already exist', 'what you want to append'}
    setInput(""); //clear the input after clicking submit
  };
  const theme = createMuiTheme();

  theme.typography.h3 = {
    fontSize: "1.2rem",
    "@media (min-width:600px)": {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2rem",
    },
  };

  return (
    <div className="App">
      <form>
        {/*wrap it into a form so that you can submit by the enter button  */}
        <ThemeProvider theme={theme} className="app_header">
          <Typography variant="h3">To-do List</Typography>
        </ThemeProvider>
        <h3> </h3> 
        <FormControl>
          <InputLabel>✅ Write a todo</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>
        <Button
          disabled={!input}
          type="submit"
          onClick={addTodo}
          variant="contained"
          color="primary"
        >
          Do It Right Now
        </Button>
      </form>

      <ul>
        {todos.map((todo) => (
          /* so we take the const function and then map it( loop through it and use the arrow function right here and pass the element inside with the normal parethesis)  */
          <Todo todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
