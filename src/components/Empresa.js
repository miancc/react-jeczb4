import React, { Component, Fragment } from 'react';
import Util from '../Helpers/Util';
import { MsgValidate } from './Common';

export default class Empresa extends Component {
  constructor(props) {
    super(props);
    this.formId = 'form-empresa';
    this.form = null;
  }

  // #region ------------------------------------------------> "COMPONENT" //
  componentDidMount() {
    this.form = document.getElementById(this.formId);
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
    const data = Util.getValidateDataForm(this.form, true);
    if (!Util.isValidEmail(data.data.correo)) {
      Util.getMsnDialog('warning', 'El correo no es valido');
      return { data: {}, error: true };
    }
    return data;
  };
  render() {
    let { show } = this.props;
    return (
      <div className={`row ${show ? 'show' : 'hide'}`}>
        <span className="card-title">
          <h4>Empresa</h4>
        </span>
        <form id={this.formId} className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <input
                id="razon_social"
                name="razon_social"
                type="text"
                className="validate"
                minLength={5}
                required
              />
              <label for="razon_social">Razon Social</label>
              <MsgValidate />
            </div>
          </div>
          <div className="row">
            <div className="input-field col s8">
              <input
                id="nombre_comercial"
                name="nombre_comercial"
                type="text"
                className="validate"
                minLength={5}
                required
              />
              <label for="nombre_comercial ">Nombre Comercial </label>
              <MsgValidate />
            </div>

            <div className="input-field col s4">
              <input
                id="nacionalidad"
                name="nacionalidad"
                type="text"
                className="validate"
                minLength={2}
                required
              />
              <label for="nacionalidad">Nacionalidad</label>
              <MsgValidate />
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input
                id="fecha_constitución"
                name="fecha_constitución"
                type="date"
                className="validate"
                minLength={5}
                required
              />
              <label for="fecha_constitución">Fecha de Constitución</label>
              <MsgValidate />
            </div>

            <div className="input-field col s6">
              <input
                id="rfc"
                name="rfc"
                type="text"
                className="validate"
                minLength={5}
                required
              />
              <label for="rfc">RFC</label>
              <MsgValidate />
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input
                id="regimen_fiscal"
                name="regimen_fiscal"
                type="text"
                className="validate"
                minLength={5}
                required
              />
              <label for="regimen_fiscal ">Régimen Fiscal</label>
              <MsgValidate />
            </div>
            <div className="input-field col s6">
              <input
                id="industria"
                name="industria"
                type="text"
                className="validate"
                minLength={5}
                required
              />
              <label for="industria">Industria</label>
              <MsgValidate />
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input
                id="telefono"
                name="telefono"
                type="number"
                min={1}
                className="validate"
                required
              />
              <label for="telefono">Telefóno</label>
              <MsgValidate />
            </div>
            <div className="input-field col s6">
              <input
                id="correo"
                name="correo"
                type="email"
                className="validate"
                minLength={5}
                required
              />
              <label for="correo">Correo</label>
              <MsgValidate />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

Empresa.defaultProps = {
  show: false,
};
