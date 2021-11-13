import React, { Component } from 'react';
import { Domicilio, Empresa, Representante, Cuenta } from './index';
import { Step } from './Common';
import Util from '../Helpers/Util';

export default class Registro extends Component {
  constructor() {
    super();
    this.language = localStorage.language;
    this.lastStep = 5;
    this.state = {
      tStep: 1,
      disableNext: false,
    };
  }

  /**
   * Funcion que invoca los pasos a seguir para captura de informacion, asi como de ejecutar el metodo de validacion
   */
  nextStep = (isNext, nStep = 0, pagination = false) => {
    const { tStep, disableNext, data: D } = this.state;
    const { callback } = this.props;
    if (tStep == nStep) return;
    if (!isNext && nStep == 0) return this.setState({ tStep: tStep - 1 });
    if (tStep > nStep && pagination) return this.setState({ tStep: nStep });
    // Se verifica si se esta en el paso uno o en algun otro y se obtiene la información del componente Step
    const stepRef = this[`step${tStep}Ref`];
    if (!stepRef)
      return Util.getMsnDialog('warning', 'Imposible to get Stepper Instance!');
    const { data, error } = stepRef.getDataForm();
    if (error) return;
    if (this.lastStep == tStep)
      return this.setState({ tStep: 1 }, () => {
        this.resetForm();
        return typeof callback == 'function' && callback(true);
      });
    this.setState({ tStep: tStep + 1 });
  };

  /**
   * Funcion que resetea todos los forumarios
   */
  resetForm = () => {
    this.step1Ref && this.step1Ref.resetForm();
    this.step2Ref && this.step2Ref.resetForm();
    this.step3Ref && this.step3Ref.resetForm();
    this.step4Ref && this.step4Ref.resetForm();
    this.step5Ref && this.step5Ref.resetForm();
  };

  render() {
    let { tStep, disableNext } = this.state;
    let { show } = this.props;
    return (
      <div className={show ? 'show' : 'hide'}>
        <div className="header">
          <ul className="pagination">
            <Step
              onClick={() => this.nextStep(false, 1, true)}
              icon="business"
              active={tStep == 1}
            />
            <Step
              onClick={() => this.nextStep(false, 2, true)}
              icon="place"
              active={tStep == 2}
            />
            <Step
              onClick={() => this.nextStep(false, 3, true)}
              icon="account_balance"
              active={tStep == 3}
            />
            <Step
              onClick={() => this.nextStep(false, 4, true)}
              icon="map"
              active={tStep == 4}
            />
            <Step
              onClick={() => this.nextStep(false, 5, true)}
              icon="monetization_on"
              active={tStep == 5}
            />
          </ul>
        </div>
        <div className="row">
          <div className="col s12 m3"></div>
          <div className="col s12 m6">
            <div className="card">
              <div className="card-content">
                <Empresa
                  onRef={(ref) => (this.step1Ref = ref)}
                  show={tStep == 1}
                />
                <Domicilio
                  title="Dirección Empresa"
                  onRef={(ref) => (this.step2Ref = ref)}
                  show={tStep == 2}
                />
                <Representante
                  onRef={(ref) => (this.step3Ref = ref)}
                  show={tStep == 3}
                />
                <Domicilio
                  title="Dirección Representante"
                  id="2"
                  onRef={(ref) => (this.step4Ref = ref)}
                  show={tStep == 4}
                />
                <Cuenta
                  onRef={(ref) => (this.step5Ref = ref)}
                  show={tStep == 5}
                />
              </div>
              <p>
                {tStep} de {this.lastStep}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col s12 m12">
              {tStep > 1 && (
                <a
                  className="btn-floating btn-small"
                  onClick={() => this.nextStep(false)}
                >
                  <i className="material-icons prefix">arrow_back</i>
                </a>
              )}
              <span> </span>
              <a
                className="btn-floating btn-small"
                onClick={() => this.nextStep(true)}
              >
                <i className="material-icons prefix">
                  {tStep == this.lastStep ? 'send' : 'arrow_forward'}
                </i>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
