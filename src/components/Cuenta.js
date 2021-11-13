import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Util from '../Helpers/Util';
import { MsgValidate } from './Common';

export default class Cuenta extends Component {
  constructor(props) {
    super(props);
    this.idForm = `form-cuenta`;
    this.form = null;
  }

  // #region ------------------------------------------------> "COMPONENT" //
  componentDidMount() {
    this.form = document.getElementById(this.idForm);
    if (typeof this.props.onRef === 'function') this.buildRef();
  }

  /**
   * Función que asigna las funciones a las que tendra acceso la referencia del componente
   **/
  buildRef = () => {
    const { onRef } = this.props;
    onRef({
      getDataForm: this.getDataForm,
      resetForm: () => this.form && this.form.reset(),
    });
  };
  // #endregion --------------------------------------------------------> //

  /**
   * Función que recupera la información del formulario y la retorna
   */
  getDataForm = () => {
    // Si no se encuentra forumlario, se informa y se retorna error
    if (!this.form) {
      Util.getMsnDialog('warning', 'Form not found');
      return { data: {}, error: true };
    }
    return Util.getValidateDataForm(this.form, true);
  };
  render() {
    let { title, show, id } = this.props;
    return (
      <div className={`row ${show ? 'show' : 'hide'}`}>
        <span className="card-title">
          <h4>Datos Bancarios</h4>
        </span>
        <form id={this.idForm} className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <input
                id="clave"
                name="clave"
                type="number"
                className="validate"
                minLength={5}
                required
              />
              <label htmlFor="clave">Clave</label>
              <MsgValidate />
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="banco"
                name="banco"
                type="text"
                className="validate"
                minLength={1}
                required
              />
              <label htmlFor="banco">Banco</label>
              <MsgValidate />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

Cuenta.defaultProps = {
  show: false,
};
