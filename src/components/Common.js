import React from 'react';

export const MsgValidate = () => (
  <span
    className="helper-text"
    data-error="Error"
    data-success="Correcto"
  ></span>
);

export const Step = ({ active, onClick, icon }) => (
  <li className={active ? 'active' : 'waves-effect'}>
    <a onClick={onClick}>
      <i className="material-icons prefix">{icon}</i>
    </a>
  </li>
);

export const Message = ({ show, title, btnLabel, children, onClick }) => {
  return (
    <div className={show ? `section no-pad-bot` : 'hide'}>
      <div className="container">
        <br></br>
        <h1 className="header center orange-text">{title}</h1>
        <div className="row center">
          <h5 className="header col s12 light">{children}</h5>
        </div>
        <div className="row center">
          <a
            onClick={onClick}
            className="btn-large waves-effect waves-light orange"
          >
            {btnLabel}
          </a>
        </div>
        <br></br>
      </div>
    </div>
  );
};
