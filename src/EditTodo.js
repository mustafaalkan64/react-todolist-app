import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Badge } from "reactstrap";
import API from "./api";
import getToken from "./token";
import alertify from "alertifyjs";
import { Link } from "react-router-dom";


class EditTodoComponent extends Component {
  state = {
    name: "",
    desc: "",
    id: 0,
  };
  componentDidMount() {
    const { id } = this.props.match.params;
    this.getTodoValues(id);
  }

  getTodoValues =(id) => {
    API.get(`TodoListApi/getById?id=${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        const result = res.data;
        this.setState({
          id: result.id,
          name: result.name,
          desc: result.desc,
        });
      })
      .catch((error) => {
        if (error.response.status === 401) {
          this.props.history.push("/login");
          alertify.error(
            "You Haven't Access to Edit This Todo Item. Please Login With Your Account"
          );
        } else {
          alertify.error("Todo Item Not Found");
        }
      });
  }

  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const todoModel = {
      Name: this.state.name,
      Desc: this.state.desc,
    };
    API.put(`TodoListApi?id=${this.state.id}`, todoModel, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        alertify.success("You have Updated Todo Item Successfuly!");
        this.props.history.push("/");
        this.setState({ name: "", desc: "" });
      })
      .catch((error) => {
        if (error.response.status === 401) {
          this.props.history.push("/login");
          alertify.error(
            "You Haven't Access to Edit This Todo Item.Please Login With Your Account"
          );
        } else if (error.response.status === 404) {
          alertify.error("Todo Item Could Not Found");
        } else {
          alertify.error("An Error Occured During Todo Update Operation");
        }
      });
  };

  render() {
    return (
      <div>
        <h3>
          <Badge color="warning">Edit Todo</Badge>
        </h3>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label className="font-weight-bold float-left" for="name">
              Name
            </Label>
            <Input
              type="name"
              name="name"
              id="name"
              value={this.state.name}
              required
              placeholder="Name"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label className="font-weight-bold float-left" for="desc">
              Description
            </Label>
            <Input
              type="textarea"
              name="desc"
              id="desc"
              required
              value={this.state.desc}
              placeholder="description"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Button color="success" className="btn btn-success btn-block">
              Submit
            </Button>
          </FormGroup>
        </Form>
        <Link to="/">Back To Todo List</Link>
      </div>
    );
  }
}

export default EditTodoComponent;
