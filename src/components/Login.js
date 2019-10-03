import React, { Component } from "react";
import User from "./User";
import "../bootstrap.min.css";
import "../style/login.css";

class Login extends Component {
  state = {
    userName: "",
    isLogged: false
  };

  setUser = event => {
    event.preventDefault();
    this.setState({ isLogged: true });
    localStorage.setItem("UserName", JSON.stringify(this.state.userName));
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return localStorage.getItem("UserName") !== null ||
      localStorage.getItem("userInfo") !== null ? (
      <User />
    ) : (
      <div className="container ">
        <div className="title">
          <h1> Moodar App </h1>
        </div>

        <div className="row">
          <form className="form-group">
            <input
              type="text"
              name="userName"
              className="form-control"
              value={this.state.userName}
              onChange={this.handleChange}
              placeholder="Nome"
              required
            />
            <div className="buttonDiv">
              <button className="button" onClick={this.setUser}>
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
