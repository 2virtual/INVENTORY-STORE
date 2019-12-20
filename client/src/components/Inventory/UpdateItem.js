import React, { Component } from 'react';
// import DatePicker from 'react-datepicker';
import axios from 'axios';
import moment from 'moment';
import DatePicker from './common/DatePicker/DatePickerIndex';
import Button from './common/Button/ButtonIndex';
import TextBox from './common/TextBox/TextBoxIndex';




class UpdateItem extends Component {
  constructor(props){
    super(props);
    this.state = {
         _id: this.props.match.params._id,
      name: "",
     description: "",
      price: "",
      quantity: "",
      supplier: "",
      taxable: "",
       date:  moment(new Date()).format("YYYY-MM-DD"),

    
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

  handleDatePickerChange(date){
    this.setState({ date: moment(date).format("YYYY-MM-DD") });
  }
  handleNameChange(event){
    this.setState({ name: event.target.value });
  }
  handleDescriptionChange(event){
    this.setState({ description: event.target.value });
  }
  handlePriceChange(event){
    this.setState({ price: event.target.value });
  }
  handleQuantityChange(event){
    this.setState({ quantity: event.target.value });
  }
  handleSupplierChange(event){
    this.setState({ supplier: event.target.value });
  }
  handleTaxableChange(event){
    this.setState({ taxable: event.target.value });
  }

  submitForm(){
    const { name, description, price, quantity,supplier,taxable,date } = this.state;
    const  inventory = {
    name, description, price, quantity,supplier,taxable,date
    };
    axios.post("/api/inventory", inventory)
    .then(
      (res) => {
        alert('Product Added Successfully!');
        const clearState = {
          name: "",
      description: "",
      price: "",
      quantity: "",
      supplier: "",
      taxable: "",
       date:  moment(new Date()).format("YYYY-MM-DD"),

        };
        this.setState( clearState );
      },
      (err) => {
        alert('Product failed to save! Try Adding the Product again.', err);
      }
    );
  }


  render() {
    return (
        <div className="display-card">
      <div className="container">
        <div className="heading">
          Add New Stock Item
        </div>
        <div className="form-container">
          <div className="form">
            Name <br/>
            <TextBox 
              value={this.state.name}
              onChange={this.handleNameChange}
              placeholder="Ex: Products,Items"/> <br/>
            
            Description <br/>
            <TextBox
              value={this.state.description}
              onChange={this.handleDescriptionChange}
              placeholder="Ex: Printing material,safety material"/> <br/>
            
            Price <br/>
            <TextBox 
              value={this.state.price}
              onChange={this.handlePriceChange} 
              placeholder="Ex: 0000"/> <br/>
            Quantity <br/>
            <TextBox 
              value={this.state.quantity}
              onChange={this.handleQuantityChange} 
              placeholder="Ex: 00 "/> <br/>
            Product Supplier <br/>
            <TextBox 
              value={this.state.supplier}
              onChange={this.handleSupplierChange} 
              placeholder="Ex: Johnsons & sons"/> <br/>
            Taxable <br/>
            <TextBox 
              value={this.state.taxable}
              onChange={this.handleTaxableChange} 
              placeholder="Ex: True/False"/> <br/>

            <div className="date-picker-container">
              Date of Product entry
              <DatePicker
                className="flex"
                value={this.state.date}
                placeholderText="Click to select a date" 
                onChange={this.handleDatePickerChange} />
            </div>

            <br/>

            <Button onClick={this.submitForm} className="btn btn-success">Add new Item stock</Button>

          </div>

        </div>
      </div>
      </div>
    );
  }
}

export default UpdateItem;