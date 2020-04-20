import React, { Component } from "react";
import { Table, Badge, Button } from "reactstrap";
import alertify from "alertifyjs";
import API from "./api";
import getToken from "./token";

class TodoListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
  }

  deleteFromTodoList =(todo) => {
    const confirm = window.confirm("Do you really want to delete this item?");
    if (confirm) {
        API.delete(`TodoListApi?id=${todo.id}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          this.setState({
            todos: this.state.todos.filter((item) => item.id !== todo.id),
          });
          alertify.success("Todo Item Deleted Successfuly");
        })
        .catch((error) => {
          if (error.response.status === 401) {
            this.props.history.push("/login");
            alertify.error("You Haven't Access to Delete This Todo Item. Please Login With Your Account");
          } else {
            alertify.error(error.response.data);
          }
        });
    }
  }

  getTodos =() => {
      API.get(`TodoListApi`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const todos = res.data;
        this.setState({ todos });
      })
      .catch((error) => {
        if (error.response.status === 401) {
          this.props.history.push("/login");
          // alertify.error("You Haven't Access to View Todo List. Please Login With Your Account");
        } else {
          alertify.error("An Error Occured While Getting Todo List");
        }
      });
  }

  componentDidMount() {
    if (getToken() == null || getToken() === "")
      this.props.history.push("/login");
    this.getTodos();
  }

  formatDateTime(datetime) {
    if (datetime === "" || datetime == null) return null;
    var d = new Date(datetime);
    return d.toLocaleString();
  }

  shortDescField(desc) {
    return desc.substring(0, 20) + "..";
  }

  combineName(user) {
    return `${user.firstName} ${user.lastName}`;
  }

  render() {
    return (
      <div>
        <h3>
          <Badge color="warning">Todo List</Badge>
        </h3>
        <Button color="info" style={{marginBottom: "5px"}} 
              className="btn btn-success float-left "
              onClick={() => { this.props.history.push(`/create-todo`);}}>
              Create New Todo Item
            </Button>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Desc</th>
              <th>Create Date</th>
              <th>Update Date</th>
              <th>Created By</th>
              <th>Updated By</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.todos.map((todo) => (
              <tr key={todo.id}>
                <th scope="row">{todo.id}</th>
                <td>{todo.name}</td>
                <td>{this.shortDescField(todo.desc)}</td>
                <td>{this.formatDateTime(todo.createDate)}</td>
                <td>{this.formatDateTime(todo.updateDate)}</td>
                <td>
                  {todo.createdByUser == null
                    ? ""
                    : this.combineName(todo.createdByUser)}
                </td>
                <td>
                  {todo.updatedByUser == null
                    ? ""
                    : this.combineName(todo.updatedByUser)}
                </td>
                <td>
                  <Button
                    color="primary"
                    onClick={() => this.props.history.push(`/edit-todo/${todo.id}`)}
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <Button
                    color="danger"
                    onClick={() => this.deleteFromTodoList(todo)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default TodoListComponent;
