import React, { Component } from "react";
import "./App.css";
import TodoList from "./TodoList";
import UserLoginComponent from "./UserLogin";
import UserRegisterComponent from "./UserRegister";
import CreateTodoComponent from "./CreateTodo";
import EditTodoComponent from "./EditTodo";
import Navi from "./Navi";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
    this.setLoginState = this.setLoginState.bind(this)
}
  setLoginState(value) {
    this.setState({ isLoggedIn: value });
  }

  render() {
    return (
      <Router>
        <div>
          <div className="App">
            <header>
              <Navi
                isLoggedIn={this.state.isLoggedIn}
                setLoginState={this.setLoginState}
              />
            </header>

            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <Switch>
                    <Route exact path="/" component={TodoList} />
                    <Route
                      path="/create-user"
                      render={(props) => (
                        <UserRegisterComponent
                          {...props}
                          setLoginState={this.setLoginState}
                        />
                      )}
                    />
                    <Route
                      path="/login"
                      render={(props) => (
                        <UserLoginComponent
                          {...props}
                          setLoginState={this.setLoginState}
                        />
                      )}
                    />
                    <Route
                      path="/create-todo"
                      component={CreateTodoComponent}
                    />
                    <Route
                      exact
                      path="/edit-todo/:id"
                      component={EditTodoComponent}
                    />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}