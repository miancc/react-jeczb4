import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Util from '../Helpers/Util';
import { MsgValidate } from './Common';

export default class Domicilio extends Component {
  constructor(props) {
    super(props);
    this.idForm = `form-direccion-${this.props.id}`;
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
          <h4>{title}</h4>
        </span>
        <form id={this.idForm} className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <input
                id="calle"
                name="calle"
                type="text"
                className="validate"
                minLength={5}
                required
              />
              <label for="calle">Calle</label>
              <MsgValidate />
            </div>
          </div>
          <div className="row">
            <div className="input-field col s4">
              <input
                id="num_ext"
                name="num_ext"
                type="text"
                className="validate"
                minLength={1}
                required
              />
              <label for="num_ext">Num Ext</label>
              <MsgValidate />
            </div>

            <div className="input-field col s4">
              <input
                id="num_int"
                name="num_int"
                type="text"
                className="validate"
                minLength={1}
              />
              <label for="num_int">Num Int</label>
              <MsgValidate />
            </div>

            <div className="input-field col s4">
              <input
                id="cp"
                name="cp"
                type="number"
                className="validate"
                min={1}
                required
              />
              <label for="cp">C.P</label>
              <MsgValidate />
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input
                id="colonia"
                name="colonia"
                type="text"
                className="validate"
                minLength={5}
                required
              />
              <label for="colonia">Colonia</label>
              <MsgValidate />
            </div>

            <div className="input-field col s6">
              <input
                id="ciudad"
                name="ciudad"
                type="text"
                className="validate"
                minLength={5}
                required
              />
              <label for="ciudad">Ciudad</label>
              <MsgValidate />
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input
                id="estado"
                name="estado"
                type="text"
                className="validate"
                minLength={5}
                required
              />
              <label for="estado">Estado</label>
              <MsgValidate />
            </div>
            <div className="input-field col s6">
              <input
                id="pais"
                name="pais"
                type="text"
                className="validate"
                minLength={5}
                required
              />
              <label for="pais">Pais</label>
              <MsgValidate />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

Domicilio.defaultProps = {
  id: 1,
  title: '',
  show: false,
};
