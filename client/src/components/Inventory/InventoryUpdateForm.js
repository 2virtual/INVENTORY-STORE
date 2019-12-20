import React, { Component } from 'react';
// import DatePicker from 'react-datepicker';
import axios from 'axios';
import moment from 'moment';
import { BarLoader } from 'react-spinners';
import DatePicker from '../common/DatePicker/DatePickerIndex';
import Button from '../common/Button/ButtonIndex';
import TextBox from '../common/TextBox/TextBoxIndex';



class InventoryUpdateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.match.params._id,
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      supplier: "",
      taxable: false,
      loading: true,
      date: moment(new Date()).format("YYYY-MM-DD"),
    };
    this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleSupplierChange = this.handleSupplierChange.bind(this);
    this.handleTaxableChange = this.handleTaxableChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentWillMount() {
    axios.get("/api/v1/jdb/inventory/" + this.state._id)
      .then(
        (res) => {
          var newState = {
            name: res.data.name,
            description: res.data.description,
            price: res.data.price,
            quantity: res.data.quantity,
            supplier: res.data.supplier,
            taxable: res.data.taxable,

          };
          this.setState(newState);
          this.setState({ loading: false });
        },
        (err) => {
          alert('An error occured! Try refreshing the page.', err);
        }
      );
  }

  handleDatePickerChange(date) {
    this.setState({ date: moment(date).format("YYYY-MM-DD") });
  }
  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }
  handleDescriptionChange(event) {
    this.setState({ description: event.target.value });
  }
  handlePriceChange(event){
    this.setState({ price: +event.target.value });
  }
  handleQuantityChange(event){
    this.setState({ quantity: +event.target.value });
  }
  handleSupplierChange(event) {
    this.setState({ supplier: event.target.value });
  }
  handleTaxableChange(event) {
    this.setState({ taxable: event.target.value });
  }

  submitForm() {
    const { _id, name, description, price, quantity,supplier,taxable} = this.state;
    var inventory = {
      _id, name, description, price, quantity,supplier,taxable 
    };
  
    axios.post('/api/v1/inventory/update', inventory)
    .then(
      (res) => {
        alert('Updated successfully!');
      },
      (err) => {
        alert('An error occured! Try submitting the form again.', err);
      }
    );
  }
  renderForm() {
    if (!this.state.loading) {
      return (
        <div className="form-container">
          <div className="form">
            Name <br />
            <TextBox
              value={this.state.name}
              onChange={this.handleNameChange}
              placeholder="Ex: Products,Items" /> <br />

            Description <br />
            <TextBox
              value={this.state.description}
              onChange={this.handleDescriptionChange}
              placeholder="Ex: Printing material,safety material" /> <br />

            Price <br />
            <TextBox
              value={this.state.price}
              onChange={this.handlePriceChange}
              placeholder="Ex: 0000" /> <br />
            Quantity <br />
            <TextBox
              value={this.state.quantity}
              onChange={this.handleQuantityChange}
              placeholder="Ex: 00 " /> <br />
            Product Supplier <br />
            <TextBox
              value={this.state.supplier}
              onChange={this.handleSupplierChange}
              placeholder="Ex: Johnsons & sons" /> <br />
            Taxable <br />
            <TextBox
              value={this.state.taxable}
              onChange={this.handleTaxableChange}
              placeholder="Ex: True/False" /> <br />

            <div className="date-picker-container">
              Date of Product entry
              <DatePicker
                className="flex"
                value={this.state.date}
                placeholderText="Click to select a date"
                onChange={this.handleDatePickerChange} />
            </div>

            <br />

            <Button onClick={this.submitForm} className="btn btn-success">Save changes</Button>

          </div>

        </div>
      );
    }
  }
  render() {
    return (
      <div className="container">
        <div className="heading">
          Update inventory information
        </div>
        <div className="loader-container">
          <BarLoader
            color={'#444'}
            loading={this.state.loading}
          />
        </div>
        {this.renderForm()}
      </div>
    );
  }
}

export default InventoryUpdateForm;