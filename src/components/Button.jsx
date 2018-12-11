import React from "react";
import "./Button.css";

//Evaluamos el operador, si el valor que entra es numero, los simbolos de punto y igual
//no entraran como operadores
const isOperator = val => {
  return !isNaN(val) || val === "." || val === "=";
};

export const Button = props => (
  <div
    //Aqui mandamos a llamar a la funcion anteriormente declarada para ponerle una clase adicional, y adi
    //cambiarle el color al boton y poder diferenciar los operadores
    className={`button-wrapper ${  isOperator(props.children) ? null : "operator"}`}
    onClick={() => props.handleClick(props.children)}
  >
    {props.children}
  </div>
);
