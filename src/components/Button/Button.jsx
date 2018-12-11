import React from "react";
import "./Button.css";

//Evaluamos el operador, si el valor que entra es numero, los simbolos de punto y igual
//no entraran como operadores
const isOperator = val => {
  console.log(val === ".")
  return !isNaN(val) || val === "." || val === "=";
  
};

export const Button = props => (
  
  <div
    //se declara una funcion dinamica, que va a depender las propiedasdes hijas que entran al componente
    //Se le activa la clase operator todo aquello que no sea numero, el simbolo de igual y el punto
    //si la propiedad evaluada es false se le activa la clase operator
    className={`button-wrapper ${  isOperator(props.children) ? null : "operator"}`}
    onClick={() => props.handleClick(props.children)}
  >
    {props.children}
  </div>
);
