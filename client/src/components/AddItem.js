
import React, { Component } from 'react';
import DatePicker from './common/DatePicker/DatePickerIndex';
import moment from 'moment'; 
import {Button} from 'react-bootstrap';




// round date to nearest day 
const key = function(d) {
  function two(n) {
    return (n < 10 ? '0' : '') + n;
  }

  return two(d.getDate()) + '/' + two(d.getMonth() + 1) + '/' + d.getFullYear();
};

const getInitialValues = function (){
    
    return {
        name: '',
        description: '',
        price: '',
        quantity: '',
        supplier:'',
        taxable: '', 
        date: moment() 
    }; 

}

class AddItem extends Component {
    constructor (props) {
    super(props)
    this.state =  { 
      newStockItem: getInitialValues(),
    }
  }

  handleInputChange = event =>{

    // sanitize html 
    function encodeHTML(s) {
        return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
    }

    let inputValue = encodeHTML(event.target.value), 
    targKey = event.target.name, 
    tempObj = this.state.newStockItem; 

    // switch statement for validation purposes 

    switch (event.target.name) {
        
        // make sure input is a number 
        case 'price':             
            if (isNaN(inputValue) || inputValue == '') {
                tempObj[targKey] = '';       
            } else {
                tempObj[targKey] = parseInt(inputValue, 10);       
            }
            break; 
        // make sure input is boolean
        case 'taxable':             
            tempObj[targKey] = inputValue === 'true';        
            break; 
        default:
            tempObj[targKey] = inputValue; 
            break; 
    }

    this.setState({
        newStockItem: tempObj 
    });

  } // close handleInputChange method 

  handleDateChange = event => {
    let tempDate = this.state.newStockItem;  
    tempDate.date = event; 

    this.setState({
        newStockItem: tempDate
    }); 

  }

  onClickAddNewItem = event => {
    let newItem = this.state.newStockItem; 
console.log(this.state.newStockItem)
    // see if the fields have been filled out 
    
    if (newItem.name === '' ){
        alert('Please input name of product');
    } else if (newItem.description === '' ){
        alert('Please input a description of product');
    } else if (newItem.price === ''){
        alert('Please input a price');
    } else if (newItem.quantity === ''){
        alert('Please input quantity');
    } else if (newItem.supplier === '') {
        alert('Please input suppliers name');
    }else if (newItem.taxable === '') {
        alert('Please select taxability');
    } else {

        // convert date from moment to JS date object and round 
        newItem.date = key(newItem.date.toDate());

        // send the form data to the store 
        
        
        //   clear form data  to make way for additional item
        this.setState({
            newStockItem: getInitialValues()
        })

        // alert message saying new stock item added 
        alert(newItem.name+' added to stock tracking table'); 
    }
  }

  render() {
       

    

    return (
      <div className="display-card">
          <div>
            
            <label>
                <span>{'Product Name'}</span>
                <input name={'name'} value={this.state.newStockItem.name} onChange={this.handleInputChange}/>
            </label>
            <label>
                <span>{'Product Description'}</span>
                <input name={'description'} value={this.state.newStockItem.description} onChange={this.handleInputChange}/>
            </label>
            <label>
                <span>{'Product supplier'}</span>
                <input name={'supplier'} value={this.state.newStockItem.supplier} onChange={this.handleInputChange}/>
            </label>
            <label>
                <span>{'Price'}</span>
                <input name={'price'} value={this.state.newStockItem.price} onChange={this.handleInputChange}/>
            </label>
            <label>
                <span>{'Quantity'}</span>
                <input name={'quantity'} value={this.state.newStockItem.quantity} onChange={this.handleInputChange}/>
            </label>
            <label>
                <span>{'Taxable?'}</span><br/>
                <Button name={'taxable'} value={true} 
                 onClick={this.handleInputChange} >True</Button>
                <Button name={'taxable'} value={false}  
                 onClick={this.handleInputChange}>False</Button>
            </label>
            <label>
                <span>{'Date Available'}</span><br/>
                <DatePicker selected={this.state.newStockItem.date} onChange={this.handleDateChange}/>
            </label>
            <Button  onClick={this.onClickAddNewItem}>Add New Stock Item</Button> 
          </div>
          <div>
          </div>

      </div>
    
    );
  }

}

export default AddItem;
