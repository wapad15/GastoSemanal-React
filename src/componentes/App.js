import React, { Component } from 'react';
import '../css/App.css';
import Header from './Header';
import FormularioGasto from './Formulario';
import Listado from './Listado';
import { validarPresupuesto } from '../helper';
import ControlPresupuesto from './ControlPresupuesto';

export default class App extends Component {
  state = {
    presupuesto: '',
    restante: '',
    gastos: {},
  };

  componentDidMount() {
    this.obtenetPresupuesto();
  }

  obtenetPresupuesto = () => {
    let presupuesto = prompt('Cual es el presupuesto');

    let resultado = validarPresupuesto(presupuesto);
    if (resultado) {
      this.setState({
        presupuesto: presupuesto,
        restante: presupuesto,
      });
    } else {
      this.obtenetPresupuesto();
    }
  };

  //agregar  neuvo gasto al state
  agregarGasto = gasto => {
    //tomar una copia del state actual
    const gastos = { ...this.state.gastos };

    //agregar el gasto al objeto del state
    gastos[`gastos${Date.now()}`] = gasto;
    this.restarPresupuesto(gasto.cantidadGasto);
    //ponerlo en el state
    this.setState({
      gastos,
    });
  };

  //restar del presupuesto cuando un gasto se crea
  restarPresupuesto = cantidad => {
    //leer el gasto
    let restar = Number(cantidad);

    //tomar una copua del state actual
    let restante = this.state.restante;

    //lo restamos
    restante -= restar;
    restante = String(restante);

    //agregamos el nuevo state
    this.setState({
      restante,
    });
  };

  render() {
    return (
      <div className="App container">
        <Header titulo="Gasto Gemanal" />
        <div className="contenido-principal contenido">
          <div className="row">
            <div className="one-half column">
              <FormularioGasto agregarGasto={this.agregarGasto} />
            </div>
            <div className="one-half column">
              <Listado gastos={this.state.gastos} />
              <ControlPresupuesto
                presupuesto={this.state.presupuesto}
                restante={this.state.restante}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
