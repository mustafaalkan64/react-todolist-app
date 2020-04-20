import React, { Component } from "react";
import { Link, withRouter  } from "react-router-dom";
import API from "./api";
import getToken from "./token";

class NaviComponent extends Component {
  state = {
    currentUser: {}
  };

  getCurrentUser =() => {
    API.get(`User/currentUser`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        const result = res.data;
        this.setState({
          currentUser: result
        });
        this.props.setLoginState(true);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          this.setState({currentUser: null});
          this.props.setLoginState(false);
        }
      });
  }

  Logout =() => {
    localStorage.removeItem("auth_token");
    this.props.setLoginState(false);
    this.props.history.push("/login");
  }

  componentDidMount() {
    this.getCurrentUser();
  }

  renderWithoutUser =() => {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item active">
                      <Link className="nav-link" to={"/create-user"}>
                        Create User
                      </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={"/login"}>
            Login
          </Link>
        </li>
        </ul>
     );
  }

  renderLoggedInUser =() => {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item active">
        <Link className="nav-link">
            Welcome {this.state.currentUser.firstName} {this.state.currentUser.lastName} 
          </Link>
        </li>
        <li className="nav-item active">
          <Link className="nav-link" onClick={() => this.Logout()}>
            Logout
          </Link>
        </li>
      </ul>
    );
  }
  render() {
    const isLoggedIn = this.props.isLoggedIn;
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
          <a className="navbar-brand">TodoList</a>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {isLoggedIn? this.renderLoggedInUser() : this.renderWithoutUser()}

          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(NaviComponent);

