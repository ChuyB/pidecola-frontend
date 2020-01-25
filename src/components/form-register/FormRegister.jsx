import React, { Component } from "react";
import { NavLink } from "react-router-dom";

//Internal Components
import InputSign from "components/imput-sign/ImputSign";
import Button from "components/button/Button";
import logo from "assets/images/logo.png";

//Services
import { createUser } from "services/userServices";

//Assets
import "./FormRegister.css";

const initialState = {
  isMobile: window.ismobile(),
  email: "",
  phoneNumber: "",
  password: "",
  passwordConfirmation: "",
  emailError: "",
  phoneNumberError: "",
  passwordError: "",
  passwordConfirmationError: ""
};

class FormRegister extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleRegister = event => {
    event.preventDefault();
    let required = { ...this.state };
    delete required.passwordConfirmation;
    delete required.isMobile;
    createUser(required)
      .then(response => {
        console.log(response, this);
      })
      .catch(error => {
        console.log(error);
      });
  };

  validate = () => {
    let emailError = "";
    let phoneNumberError = "";
    let passwordError = "";
    let passwordConfirmationError = "";

    console.log("STATE");
    console.log(this.state);

    if (this.state.email === "") {
      emailError = "Introduzca una dirección de correo";
    } else if (!this.state.email.includes("@")) {
      emailError = "Dirección de correo inválida";
    } else if (this.state.email.split("@")[1] !== "usb.ve") {
      emailError = "Debe ser un correo: usb.ve";
    }

    if (this.state.phoneNumber === "") {
      phoneNumberError = "Introduzca un número de teléfono";
    } else if (isNaN(this.state.phoneNumber) === true) {
      phoneNumberError = "Introduzca un número de teléfono válido";
    } else if (this.state.phoneNumber.toString().length !== 11) {
      phoneNumberError = "Introduzca un número de teléfono válido";
    }

    if (this.state.password === "") {
      passwordError = "Introduzca una contraseña";
    }

    if (this.state.passwordConfirmation === "") {
      passwordConfirmationError = "Introduzca una contraseña";
    }

    if (
      emailError ||
      phoneNumberError ||
      passwordError ||
      passwordConfirmationError
    ) {
      this.setState({
        emailError,
        phoneNumberError,
        passwordError,
        passwordConfirmationError
      });
      return false;
    }

    return true;
  };

  handleChange = event => {
    const isCheckbox = event.target.type === "checkbox";
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      console.log("FUNCIONA REGISTER");
      this.setState(initialState);
    }
  };

  render() {
    return (
      <div className="FormRegister">
        <div className="Container-Img">
          <img className="Logo" src={logo} alt="logo pidecola" />
        </div>
        <form className="Form" onSubmit={this.handleSubmit}>
          <InputSign
            name={"email"}
            type="text"
            className="email"
            placeholder="Correo"
            onChange={this.handleChange}
          />
          <div style={{ color: "red", fontWeight: "bold" }}>
            {this.state.emailError}
          </div>
          <InputSign
            name={"phoneNumber"}
            type="text"
            className="phoneNumber"
            placeholder="Telefono"
            onChange={this.handleChange}
          />
          <div style={{ color: "red", fontWeight: "bold" }}>
            {this.state.phoneNumberError}
          </div>
          <InputSign
            name={"password"}
            type="password"
            className="password"
            placeholder="Contraseña"
            onChange={this.handleChange}
          />
          <div style={{ color: "red", fontWeight: "bold" }}>
            {this.state.passwordError}
          </div>
          <InputSign
            name={"passwordConfirmation"}
            type="password"
            className="password"
            placeholder="Confirmar Contraseña"
            onChange={this.handleChange}
          />
          <div style={{ color: "red", fontWeight: "bold" }}>
            {this.state.passwordConfirmationError}
          </div>
          <Button
            className={this.state.isMobile ? "blue" : "yellow"}
            text="Registrate"
            onClick={event => this.handleRegister(event)}
          />
        </form>
        <div className="msg-footer">
          <p>
            ¿Ya tienes una cuenta?{" "}
            <NavLink to={{ pathname: "/login" }}>
              <span>Inicia sesion.</span>
            </NavLink>
          </p>
        </div>
      </div>
    );
  }
}

export default FormRegister;
