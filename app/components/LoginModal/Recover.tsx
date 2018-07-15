import React from "react";

const RecoverAccount = () => (
  <>
    <h5>Recover Account</h5>
    <hr />
    <form className="col s12">
      <div className="row">
        <div className="input-field col s12">
          <input id="email" type="email" className="validate" />
          {/* eslint-disable-next-line jsx-a11y/label-has-for */}
          <label htmlFor="email">Email</label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          {/* TODO: work on accessibility */}
          <button type="button" className="waves-effect waves-light btn-large">
            Recover
          </button>
        </div>
      </div>
    </form>
  </>
);

export default RecoverAccount;
