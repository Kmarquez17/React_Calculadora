import React, { Component } from "react";
import "./App.css";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { ClearButton } from "./components/ClearButton";
// import * as math from "mathjs";
import io from "socket.io-client";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      contador: 0,
      estado: false
    };
  }

  componentDidMount = () => {
    //Conectamos con el puerto que estamos corriendo en el servidor
    this.socket = io('localhost:5000');
    //Recibimos el operacion ya evaluada desde el servidor
    this.socket.on('RECEIVE_MESSAGE', (data) => {
      //Se evalua el data que viene de la respuesta del servidor
      //si esta null la respuesta se pone automaticamente cero
      this.setState({ input: data ? data : "0" })

    });
  }

  //Aqui comparamos varios criterios
  addToInput = val => {
    //si el estado es falso, se va estar contatenado la expresion desde pantalla
    if (this.state.estado === false) {
      this.setState({ input: this.state.input + val });
      //si el estado es verdadero pero lo si presionan los operadores igualmente se va a concatenar
    } else if ((val === '/') || (val === '*') || (val === '-') || (val === '+') || (val === '%')) {
      //Y pasamos al estado a false para concatenar todo aquello que no sea operadores, osea numeros
      this.setState({ input: this.state.input + val, estado: false });
      //Si el estado es verdader pero se presiona un numero, reiniciamos la calculadora  
    } else {
      this.setState({ input: "" + val, contador: 0, estado: false });
    }


  };

  //se quita el ultimo valor presionado 
  removeToInput = () => {
    if (this.state.contador === 0) {
      this.setState({ input: this.state.input.slice(0, -1) });
    }
  }

  handleEqual = () => {
    console.log(this.state.input)
    if ((this.state.input === "") || (this.state.input === null)) {
      this.setState({ input: "0", estado: true })
    } else {
      this.socket.emit('SEND_MESSAGE', {
        value: this.state.input,
      })
      this.setState({ contador: this.state.contador + 1, estado: true })
    }

  };

  render() {
    return (
      <div className="app">
        <div className="calc-wrapper">
          <Input input={this.state.input} />
          <div className="row">
            <ClearButton handleClear={() => this.setState({ input: "", contador: 0 })}>
              C
            </ClearButton>
            <Button handleClick={this.removeToInput}>x</Button>
            <Button handleClick={this.addToInput}>%</Button>
            <Button handleClick={this.addToInput}>/</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>7</Button>
            <Button handleClick={this.addToInput}>8</Button>
            <Button handleClick={this.addToInput}>9</Button>
            <Button handleClick={this.addToInput}>*</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>4</Button>
            <Button handleClick={this.addToInput}>5</Button>
            <Button handleClick={this.addToInput}>6</Button>
            <Button handleClick={this.addToInput}>-</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>1</Button>
            <Button handleClick={this.addToInput}>2</Button>
            <Button handleClick={this.addToInput}>3</Button>
            <Button handleClick={this.addToInput}>+</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>.</Button>
            <Button handleClick={this.addToInput}>0</Button>
            <Button handleClick={() => this.handleEqual()}>=</Button>
            <Button handleClick={this.addToInput}> </Button>
          </div>
        </div>
      </div>

    );
  }
}

export default App;
