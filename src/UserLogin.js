import React, { Component } from "react";
import API from "./api";
import { Button, Form, FormGroup, Label, Input, Badge } from "reactstrap";
import alertify from "alertifyjs";
import { Link } from "react-router-dom";

export default class UserLoginComponent extends Component {
  state = { email: "", password: ""};

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
    };
    API.post(`User/authenticate`, user)
      .then((res) => {
        localStorage.setItem("auth_token", res.data);
        alertify.success("You have Logined Successfuly!");
        this.props.setLoginState(true);
        this.setState({ email: "", password: "" });
        this.props.history.push("/");
      })
      .catch((error) => {
        alertify.error(error.response.data);
      });
  };

  render() {
    return (
      <div>
        <h3>
          <Badge color="warning">Login</Badge>
        </h3>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label className="font-weight-bold float-left" for="email">
              Email
            </Label>
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
            <Label
              className="font-weight-bold float-left"
              for="examplePassword"
            >
              Password
            </Label>
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
        <Link to="/create-user">Don't You Have An Account Yet? Register!</Link>
      </div>
    );
  }
}
