import React from "react";
import Welcome from "./components/Welcome";
import { Paper, withStyles } from "@material-ui/core";
import Form from "./components/Form";
import Todos from "./components/Todos";

const styles = {
  paper: {
    padding: 30,
    maxWidth: 500,
    margin: "auto"
  }
};

const App = ({ classes }) => (
  <div style={{ display: "flex" }}>
    <div style={{ margin: "auto", width: 400 }}>
      <Welcome />
      <Paper elevation={1} className={classes.paper}>
        <Form />
        <Todos />
      </Paper>
    </div>
  </div>
);

export default withStyles(styles)(App);
