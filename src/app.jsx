import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountDue: 0,
      amountReceived: 0,
      changeDue: 0,
      twenties: 0,
      tens: 0,
      fives: 0,
      ones: 0,
      quarters: 0,
      dimes: 0,
      nickels: 0,
      pennies: 0,
      alertDefault: 'alert alert-secondary text-center d-block',
      alertSuccess: 'alert alert-success text-center d-none',
      alertDanger: 'alert alert-danger text-center d-none'
    };
    this.handleChange = this.handleChange.bind(this);
    this.calculateChange = this.calculateChange.bind(this);
  }
  handleChange(key) {
    return event => this.setState({ [key]: event.target.value });
  }
  calculateChange() {
    const due = parseFloat(this.state.amountDue) * 100;
    const received = parseFloat(this.state.amountReceived) * 100;
    let tChange = received - due;
    const change = tChange / 100;
    this.setState({ changeDue: change.toFixed(2) });
    const twenty = Math.floor(tChange / 2000);
    tChange %= 2000;

    const ten = Math.floor(tChange / 1000);
    tChange %= 1000;

    const five = Math.floor(tChange / 500);
    tChange %= 500;

    const one = Math.floor(tChange / 100);
    tChange %= 100;

    const quarter = Math.floor(tChange / 25);
    tChange %= 25;

    const dime = Math.floor(tChange / 10);
    tChange %= 10;

    const nickel = Math.floor(tChange / 5);
    tChange %= 5;

    const penny = Math.round(tChange);
    tChange %= 1;
    if (received < due) {
      this.setState({
        alertDefault: 'alert alert-secondary text-center d-none',
        alertSuccess: null,
        alertDanger: 'alert alert-danger text-center',
      });
    } else if (received > due) {
      this.setState({
        twenties: twenty,
        tens: ten,
        fives: five,
        ones: one,
        quarters: quarter,
        dimes: dime,
        nickels: nickel,
        pennies: penny,
        alertDefault: 'alert alert-secondary text-center d-none',
        alertSuccess: 'alert alert-success text-center',
        alertDanger: null,
      });
    }
  }
  render() {
    const showSuccess = {
      display: this.state.alertSuccess
        ? 'block' : 'none'
    };
    const showDanger = {
      display: this.state.alertDanger
        ? 'block' : 'none'
    };
    const showDefault = {
      display: this.state.alertDefault
        ? 'none' : 'block'
    };
    return (
      <div className='container'>
        <div id='header'>
          <h1><strong>Change Calculator</strong></h1>
        </div>
        <div className='row'>
          <div className='col-md-4'>
            <div className='card'>
              <div className='card-header'>Enter Information</div>
              <div className='card-body'>
                <label htmlFor='amountDue'><strong>How much is due?</strong></label>
                <input className='form-control' name='amountDue' type='text' pattern='[-+]?[0-9]*[.,]?[0-9]+' value={ this.state.amountDue } onChange={ this.handleChange('amountDue') } />
                <br />
                <label htmlFor='amountReceived'><strong>How much was received?</strong></label>
                <input className='form-control' name='amountReceived' type='text' pattern='[-+]?[0-9]*[.,]?[0-9]+' value={ this.state.amountReceived } onChange={ this.handleChange('amountReceived') } />
              </div>
              <div className='card-footer'>
                <button className='btn btn-primary btn-block' onClick={ this.calculateChange } >
                Calculate</button>
              </div>
            </div>
          </div>
          <div className='col-md-8'>
            <div className='card'>
              <div className={ this.state.alertDefault } style={ showDefault } role='alert'>
              Make a transaction</div>
              <div className={ this.state.alertSuccess } style={ showSuccess } role='alert'>
              The total change due is ${this.state.changeDue}</div>
              <div className={ this.state.alertDanger } style={ showDanger } role='alert'>
              ${this.state.changeDue} is due from the customer.</div>
              <br /><br />
              <div className='card-body'>
                <div className='flex-row'>
                  <div className='p-2'>
                    <label htmlFor='twenties'><strong>Twenties</strong></label>
                    <div className='change'>
                      <span>{ this.state.twenties }</span>
                    </div>
                  </div>
                  <div className='p-2'>
                    <label htmlFor='tens'><strong>Tens</strong></label>
                    <div className='change'>
                      <span>{ this.state.tens }</span>
                    </div>
                  </div>
                  <div className='p-2'>
                    <label htmlFor='fives'><strong>Fives</strong></label>
                    <div className='change'>
                      <span>{ this.state.fives }</span>
                    </div>
                  </div>
                  <div className='p-2'>
                    <label htmlFor='ones'><strong>Ones</strong></label>
                    <div className='change'>
                      <span>{ this.state.ones }</span>
                    </div>
                  </div>
                </div>
                <br />
                <div className='d-flex flex-row'>
                  <div className='p-2'>
                    <label htmlFor='quarters'><strong>Quarters</strong></label>
                    <div className='change'>
                      <span>{ this.state.quarters }</span>
                    </div>
                  </div>
                  <div className='p-2'>
                    <label htmlFor='dimes'><strong>Dimes</strong></label>
                    <div className='change'>
                      <span>{ this.state.dimes }</span>
                    </div>
                  </div>
                  <div className='p-2'>
                    <label htmlFor='nickels'><strong>Nickels</strong></label>
                    <div className='change'>
                      <span>{ this.state.nickels }</span>
                    </div>
                  </div>
                  <div className='p-2'>
                    <label htmlFor='pennies'><strong>Pennies</strong></label>
                    <div className='change'>
                      <span>{ this.state.pennies }</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
