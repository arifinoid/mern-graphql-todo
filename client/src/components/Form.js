import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { TextField } from "@material-ui/core";

const createTodo = gql`
  mutation createTodo($text: String!) {
    createTodo(text: $text) {
      id
      text
      complete
    }
  }
`;

const TodosQuery = gql`
  {
    todos {
      id
      text
      complete
    }
  }
`;

class Form extends Component {
  state = {
    text: ""
  };

  handleChange = ({ target: { value: text } }) =>
    this.setState({
      text
    });

  render() {
    const { text } = this.state;

    return (
      <Mutation
        mutation={createTodo}
        update={(cache, { data: { createTodo } }) => {
          const { todos } = cache.readQuery({ query: TodosQuery });
          cache.writeQuery({
            query: TodosQuery,
            data: {
              todos: [...todos, createTodo]
            }
          });
        }}
      >
        {createTodo => (
          <form
            onSubmit={e => {
              e.preventDefault();

              const { text } = this.state;

              if (text) {
                createTodo({
                  variables: { text }
                });

                this.setState({ text: "" });
              }
            }}
          >
            <TextField
              value={text}
              label="Add Todo..."
              margin="normal"
              onChange={this.handleChange}
              fullWidth
              padding="10px"
            />
          </form>
        )}
      </Mutation>
    );
  }
}

export default Form;
