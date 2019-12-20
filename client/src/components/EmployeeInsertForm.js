import React, { Component } from 'react';
// import DatePicker from 'react-datepicker';
import axios from 'axios';
import moment from 'moment';
import DatePicker from './common/DatePicker/DatePickerIndex';
import Button from './common/Button/ButtonIndex';
import TextBox from './common/TextBox/TextBoxIndex';




class EmployeeInsertForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      department: "",
     origin: "",
     wages: "",
      joinDate: moment(new Date()).format("YYYY-MM-DD"),
    };
    this.handleDatePickerChange = this.handleDatePickerChange.bind(this); 
    this.handleNameChange = this.handleNameChange.bind(this); 
    this.handleDepartmentChange = this.handleDepartmentChange.bind(this); 
    this.handleOriginChange = this.handleOriginChange.bind(this); 
    this.handleWagesChange = this.handleWagesChange.bind(this); 
    this.submitForm = this.submitForm.bind(this); 
  }

  handleDatePickerChange(date){
    this.setState({ joinDate: moment(date).format("YYYY-MM-DD") });
  }
  handleNameChange(event){
    this.setState({ name: event.target.value });
  }
  handleDepartmentChange(event){
    this.setState({ department: event.target.value });
  }
  handleOriginChange(event){
    this.setState({ origin: event.target.value });
  }
  handleWagesChange(event){
    this.setState({ wages: event.target.value });
  }

  submitForm(){
    var { name, department, origin, wages,joinDate } = this.state;
    var employee = {
      name, department, origin,wages, joinDate
    };
    axios.post('/api/v1/employee/add', employee)
    .then(
      (res) => {
        alert('Submitted successfully!');
        var clearState = {
          name: "",
          department: "",
          origin: "",
          wages: "",
          joinDate: moment(new Date()).format("YYYY-MM-DD"),
        };
        this.setState( clearState );
      },
      (err) => {
        alert('An error occured! Try submitting the form again.', err);
      }
    );
  }

  render() {
    return (
      <div className="container">
        <div className="heading">
          Add a new employee
        </div>
        <div className="form-container">
          <div className="form">
            Name <br/>
            <TextBox 
              value={this.state.name}
              onChange={this.handleNameChange}
              placeholder="Ex: Budi Budianto Budiantoro, etc"/> <br/>
            
            Unit <br/>
            <TextBox
              value={this.state.department}
              onChange={this.handleDepartmentChange}
              placeholder="Ex: Technology, Product, Marketing, etc"/> <br/>
            
            Origin <br/>
            <TextBox 
              value={this.state.origin}
              onChange={this.handleOriginChange} 
              placeholder="Ex: Jakarta, Pekanbaru, Medan, etc"/> <br/>
             Wages/hr<br/>
            <TextBox 
              value={this.state.wages}
              onChange={this.handleWagesChange} 
              placeholder="Ex: 200, 100"/> <br/>

            <div className="date-picker-container">
              Joined on
              
              <DatePicker
                className="flex"
                value={this.state.joinDate}
                placeholderText="Click to select a date" 
                onChange={this.handleDatePickerChange} />
            </div>

            <br/>

            <Button onClick={this.submitForm} className="btn btn-success">Add new employee</Button>

          </div>

        </div>
      </div>
    );
  }
}

export default EmployeeInsertForm;