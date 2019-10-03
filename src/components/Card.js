import React, { Component } from "react";
import { GoTrashcan } from "react-icons/go";
import { FiEdit } from "react-icons/fi";

import "../style/card.css";

export class Card extends Component {
  onDelete = item => {
    const stresses = this.props.userInfoArray;
    const filterStress = stresses.filter(filtered => {
      return filtered.id !== item.id;
    });

    stresses.splice(0, stresses.length);

    for (let i = 0; i < filterStress.length; i++) {
      stresses.push(filterStress[i]);
    }

    if (filterStress.length === 0) {
      localStorage.removeItem("userInfo");
    } else {
      localStorage.setItem("userInfo", JSON.stringify(stresses));
    }

    this.setState({
      userInfoArray: JSON.parse(localStorage.getItem("userInfo"))
    });
  };

  render() {
    const items = this.props.userInfoArray;

    if (localStorage.getItem("userInfo") != null) {
      return (
        <div className="list-component">
          <div className="title-list">
            <h1> Histórico dos seus níveis</h1>
          </div>

          <div className="row">
            {items.map((stress, i) => (
              <div className="col-md-12" key={i}>
                <div
                  className="line"
                  style={{
                    backgroundColor:
                      stress.StressLevel >= 7
                        ? "red"
                        : stress.StressLevel <= 4
                        ? "green"
                        : stress.StressLevel > 4 && stress.StressLevel < 7
                        ? "yellow"
                        : null
                  }}
                ></div>
                <div className="cards">
                  <p className="text">
                    O seu nível de estresse no dia{" "}
                    <strong>{stress.StressDate}</strong> chegou ao nível{" "}
                    <strong>{stress.StressLevel}</strong>!
                    {stress.StressLevel >= 7 ? (
                      <span>
                        {" "}
                        <br />
                        Estava bem estressado &#128545;
                      </span>
                    ) : stress.StressLevel <= 4 ? (
                      <span>
                        {" "}
                        <br /> Estava de boa! &#128522;
                      </span>
                    ) : stress.StressLevel > 4 && stress.StressLevel < 7 ? (
                      <span>
                        <br /> Estava neutro! &#128528;
                      </span>
                    ) : null}
                  </p>
                  <div className="card-button-div">
                    <button
                      className="card-button"
                      onClick={() => this.onDelete(stress)}
                    >
                      <GoTrashcan className="card-icon" />
                    </button>
                  </div>
                  <div className="card-button-div">
                    <button className="card-button" onClick={() => ""}>
                      <FiEdit className="card-icon" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div className="empty-list">
          Não existe nenhum card!
          <p>Cadastre o seu primeiro card logo acima! &#128578;</p>
        </div>
      );
    }
  }
}

export default Card;
