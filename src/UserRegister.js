import React, { Component } from "react";
import API from "./api";
import { Button, Form, FormGroup, Label, Input, Badge } from "reactstrap";
import alertify from "alertifyjs";
import { Link } from "react-router-dom";

export default class UserRegisterComponent extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    userName: ""
  };

  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      Email: this.state.email,
      Password: this.state.password,
      FirstName: this.state.firstName,
      LastName: this.state.lastName,
      UserName: this.state.userName,
    };
    API.post(`User/register`, user)
      .then((res) => {
        localStorage.setItem("auth_token", res.data.response);
        alertify.success("You've Registered Successfuly!");
        this.props.history.push("/");
        this.setState({ email: "", password: "" });
        this.props.setLoginState(true);
      })
      .catch((error) => {
        alertify.error(error.response.data.message);
      });
  };

  render() {
    return (
      <div>
          <h3>
            <Badge color="warning">Register</Badge>
          </h3>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label className="font-weight-bold" for="firstName">First Name</Label>
              <Input
                type="text"
                name="firstName"
                id="firstName"
                required
                placeholder="First Name"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label className="font-weight-bold" for="lastName">Last Name</Label>
              <Input
                type="text"
                name="lastName"
                id="lastName"
                required
                placeholder="Last Name"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label className="font-weight-bold" for="userName">UserName </Label>
              <Input
                type="text"
                name="userName"
                id="userName"
                required
                placeholder="UserName (Should be Unique)"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label className="font-weight-bold" for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Email Address"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label className="font-weight-bold" for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                required
                placeholder="Password"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Button color="success" className="btn btn-success btn-block">
                Submit
              </Button>
            </FormGroup>
          </Form>
          <Link to="/login">Do You Have Any Account? Login!</Link>
        </div>
    );
  }
}
