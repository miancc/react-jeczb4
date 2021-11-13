import React, { Component } from 'react';
import Registro from './components/Registro';
import { Message } from './components/Common';
import Util from './Helpers/Util';

export default class App extends Component {
  constructor() {
    super();
    this.language = localStorage.language;
    this.state = {
      showForm: false,
      isFinished: false,
    };
  }

  /**
   * Funcion que ejecuta el lanzamiento del proceso de registro de datos
   */
  showForm = (showForm) => {
    this.setState({ showForm, isFinished: false });
  };

  /**
   * Funcion que se ejecuta al guardar los datos
   */
  callback = (isFinished) => {
    let { showForm } = this.state;
    this.setState({ isFinished, showForm: !showForm });
  };

  render() {
    let { showForm, isFinished } = this.state;
    return (
      <>
        <Message
          show={!showForm}
          title={isFinished ? 'Gracias' : 'Bienvenido'}
          btnLabel={isFinished ? 'Cerrar' : 'Registrarme'}
          onClick={() => this.showForm(!isFinished)}
        >
          {isFinished
            ? 'Se han guardado satisfactoriamente tus datos'
            : 'Para iniciar su registro haga click en el boton REGISTRARME'}
        </Message>
        <Registro callback={this.callback} show={showForm} />
      </>
    );
  }
}
