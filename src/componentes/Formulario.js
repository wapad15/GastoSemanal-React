import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FormularioGasto extends Component {
  //refs para los campos del formulario
  nombreGasto = React.createRef();
  cantidadGasto = React.createRef();

  crearGasto = e => {
    //prevenir el default
    e.preventDefault();

    //crear el objeto co los gastos
    const gasto = {
      nombreGasto: this.nombreGasto.current.value,
      cantidadGasto: this.cantidadGasto.current.value,
    };

    //agregarlo y enviarlo por props
    this.props.agregarGasto(gasto);
    //resetar el formulario (opcional)
    e.currentTarget.reset();
  };
  render() {
    return (
      <form onSubmit={this.crearGasto}>
        <h2>Agrega tus gastos aqui</h2>
        <div className="campo">
          <label>Nombre Gasto</label>
          <input
            ref={this.nombreGasto}
            className="u-full-width"
            type="text"
            placeholder="Ej. Transporte"
          />
        </div>

        <div className="campo">
          <label>Cantidad</label>
          <input
            ref={this.cantidadGasto}
            className="u-full-width"
            type="text"
            placeholder="Ej. 300"
          />
        </div>

        <input
          className="button-primary u-full-width"
          type="submit"
          value="Agregar"
        />
      </form>
    );
  }
}

FormularioGasto.propTypes = {
  agregarGasto: PropTypes.func.isRequired,
};
