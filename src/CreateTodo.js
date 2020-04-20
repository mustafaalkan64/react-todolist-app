import React, { Component } from "react";
import API from "./api";
import { Button, Form, FormGroup, Label, Input, Badge } from "reactstrap";
import alertify from "alertifyjs";
import { Link } from "react-router-dom";
import getToken from "./token";

export default class CreateTodoComponent extends Component {
  state = { name: "", 
            desc: "", 
  };

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
    API.post(`TodoListApi`, todoModel, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        alertify.success("You have Created Todo Item Successfuly!");
        this.props.history.push("/");
        this.setState({ name: "", desc: "" });
      })
      .catch((error) => {
        if (error.response.status === 401) {
          this.props.history.push("/login");
          alertify.error("You Haven't Access to Create New Todo Item.Please Login With Your Account");
        } else {
          alertify.error(error.response.data);
        }
      });
  };

  render() {
    return (
      <div>
        <h3>
          <Badge color="warning">Creat Todo</Badge>
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
