import React, { Component } from "react";
import Moment from "moment";

import Card from "./Card";
import "../style/user.css";
import "../style/range.css";

class User extends Component {
  state = {
    userInfoArray:
      localStorage.getItem("userInfo") !== null
        ? JSON.parse(localStorage.getItem("userInfo"))
        : []
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  updateList = event => {
    this.setState({ this: JSON.parse(localStorage.getItem("userInfo")) });
  };

  onSubmit = async event => {
    event.preventDefault();
    const userInfoStorage = await localStorage.getItem("userInfo");

    if (!userInfoStorage) {
      localStorage.setItem("userInfo", this.state.userInfoArray);
    }

    this.state.userInfoArray.push({
      id:
        this.state.userInfoArray[0] != null
          ? this.state.userInfoArray.slice(-1)[0].id + 1
          : 1,
      StressDate: Moment(this.state.stressDate).format(),
      StressLevel: this.state.stressLevel
    });

    localStorage.setItem("userInfo", JSON.stringify(this.state.userInfoArray));

    this.setState({
      this: JSON.parse(localStorage.getItem("userInfo"))
    });
  };

  cleanStorage = () => {
    localStorage.removeItem("userInfo");
    this.setState({
      userInfoArray: []
    });
  };

  componentDidUpdate() {
    console.log("did updated: ", this.state.userInfoArray);
  }

  render() {
    const username = JSON.parse(localStorage.getItem("UserName"));
    const userInfoStorage = localStorage.getItem("userInfo");
    console.log("actual state : ", this.state);
    console.log("actual state info: ", this.state.userInfoArray);

    return (
      <div className="container-user">
        <div className="welcome">
          <div className="first-message">
            <h4>Olá, {username}!</h4>
            <h4>Como está seu nível de estresse?</h4>
          </div>
        </div>

        <div className="content">
          <form className="form" onSubmit={this.onSubmit}>
            <br />
            <label> Data</label>
            <input
              type="date"
              name="stressDate"
              className="form-control"
              value={this.stressDate}
              onChange={this.handleChange}
              required
            />

            <label> Nível de Estresse</label>
            <input
              type="range"
              name="stressLevel"
              min="0"
              max="10"
              className="form-control range"
              id="stressLevelInput"
              value={this.stressLevel}
              onChange={this.handleChange}
              required
            />
            <button className="button-stress">Enviar</button>
          </form>

          <Card {...this.state} updateList={this.updateList} />

          <div style={{ display: !userInfoStorage ? "none" : "unset" }}>
            <button className="button-stress" onClick={this.cleanStorage}>
              Apagar todos os cards
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default User;
