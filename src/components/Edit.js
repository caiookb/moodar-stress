import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FiEdit } from "react-icons/fi";

export class DialogBox extends Component {
  state = {
    isOpen: false
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleClickOpen = () => {
    this.setState({
      isOpen: true
    });
  };

  handleClose = () => {
    this.setState({
      isOpen: false,
      userInfoArray: JSON.parse(localStorage.getItem("userInfo"))
    });
  };

  onEdit = event => {
    event.preventDefault();
    const item = this.props.item;
    const stresses = this.props.state.userInfoArray;

    const filteredItem = stresses.filter(filtered => {
      return filtered.id !== item.id;
    });

    stresses.splice(0, stresses.length);

    for (let i = 0; i < filteredItem.length; i++) {
      stresses.push(filteredItem[i]);
    }

    stresses.push({
      id: item.id,
      StressDate: item.StressDate,
      StressLevel: this.state.stressLevel
    });

    localStorage.setItem("userInfo", JSON.stringify(stresses));

    this.props.state.updateList(stresses);
  };

  render() {
    return (
      <div>
        <FiEdit onClick={this.handleClickOpen} />
        <Dialog
          open={this.state.isOpen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>
            {"Qual novo nível de estresse deste dia?"}
          </DialogTitle>
          <DialogContent>
            <form className="form" onSubmit={this.onEdit}>
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
              <button className="button-stress" onClick={this.handleClose}>
                Enviar
              </button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default DialogBox;
