import React, { Component } from 'react';
import axios from 'axios';
class PaymentBoard2 extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
        pounds: 0,
        ppp: 2.10,
        total: 0
      };
  
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
      this.handlePoundsChange = this.handlePoundsChange.bind(this);
      this.handlePPPChange = this.handlePPPChange.bind(this);
      //this.handleTotalChange = this.handleTotalChange.bind(this);
    }
  
    componentWillMount(){}
  
    handlePoundsChange(event) {
      this.setState(...this.state, {pounds: event.target.value});
    }
  
    handlePPPChange(event) {
      this.setState(...this.state, {ppp: event.target.value});
    }
  
    handleTotalChange(event) {
      //this.setState({value: event.target.value});
    }
  
    handleFormSubmit(event) {
      event.preventDefault();
      let pounds = this.state.pounds;
      let ppp = this.state.ppp;
      let total = ppp * pounds;
      console.log(total);
      const self = this;
      axios.post('/api/add/transaction', {
        pounds: pounds,
        ppp: ppp,
        total: total
      })
        .then(function (response) {
          console.log(response);
          self.setState({pounds: '', ppp: '', total: ''});
          // $("#pounds").val('');
          // $("#ppp").val('');
          // $("#total").val('');
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    }
  
  
    render() {
      const total = this.state.pounds * this.state.ppp;
      return (
        <div className="container">
          <form className="container" onSubmit={this.handleFormSubmit}>
            <table className="table table-bordered">
              <tbody>
              <tr>
                <td>Pounds</td>
                <td>
                  <input type="text" name="pounds" id="pounds" className="form-control" placeholder="Enter Pounds..." value={this.state.pounds} onChange={this.handlePoundsChange} required />
                </td>
              </tr>
              <tr>
                <td>Price</td>
                <td>
                  <input type="text" name="ppp" id="ppp" className="form-control" value={this.state.ppp} onChange={this.handlePPPChange} required />
                </td>
              </tr>
              <tr>
                <td>Total</td>
                <td>
                  <input type="text" name="total" id="total" className="form-control" value={total} />
                </td>
              </tr>
              </tbody>
            </table>
            <div className="col-xs-12">
              <input
                type="submit"
                className="btn btn-block btn-primary"
                value="Customer Checkout"/>
            </div>
          </form>
        </div>
      )
    }
  }


export default PaymentBoard2