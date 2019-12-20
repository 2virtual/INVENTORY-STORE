import React, { Component } from 'react';
// import DatePicker from 'react-datepicker';
import axios from 'axios';
import moment from 'moment';
import { BarLoader } from 'react-spinners';
import Button from '../common/Button/ButtonIndex';
import TextBox from '../common/TextBox/TextBoxIndex';



class Orders extends Component {
  constructor(props){
    super(props);
    this.state = {
      _id: this.props.match.params._id,
      name: "",
      quantity :"",
      issuedBy :"",
      collectedBy :"",
      department: "",
      
      loading: true,
      
      
    };
   
    this.handleNameChange = this.handleNameChange.bind(this); 
    this.handleQuantityChange = this.handleQuantityChange.bind(this); 
    this.handleIssuedByChange = this.handleIssuedByChange.bind(this); 
    this.handleCollectedByChange = this.handleCollectedByChange.bind(this); 
    this.handleDepartmentChange = this.handleDepartmentChange .bind(this); 
    this.submitForm = this.submitForm.bind(this); 
  }

  componentWillMount(){
    axios.get("/api/v1/inventory/one/"+this.state._id)
    .then(
      (res) => {    
        var newState = {
          name: res.data.name,
          department: res.data.department,
          origin: res.data.origin,
          wages: res.data.wages,
          overtime: res.data.overtime,
          joinDate: res.data.joinDate,
         
        
        }
        this.setState( newState );
        this.setState( { loading: false } );
      }, 
      (err) => {
        alert('An error occured! Try refreshing the page.', err);
      }
    );
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
  handleOvertimeChange(event){
    this.setState({ overtime: event.target.value });
  }
  


  submitForm(){
    var { _id, name,department, origin,wages,overtime, joinDate } = this.state;
    var employee = {
      _id, name, department, origin, wages, overtime,joinDate
    };
    axios.post('/api/v1/employee/update', employee)
    .then(
      (res) => {
        alert('Overtime added successfully!');
      },
      (err) => {
        alert('An error occured! Try submitting the form again.', err);
      }
    );
  }
  renderForm(){
    if(!this.state.loading){
      return (
        <div className="form-container">
          <div className="form">
            Name <br/>
            <TextBox 
              value={this.state.name}
              onChange={this.handleNameChange}
              placeholder="Ex: Budi Budianto Budiantoro, etc"/> <br/>
          
               overtime/hr <br/>
            <TextBox 
              value={this.state.overtime}
              onChange={this.handleOvertimeChange} 
              placeholder="Ex: 200, 100"/> <br/>


            <Button onClick={this.submitForm} className="btn btn-success">Add Overtime</Button>

          </div>

        </div>
      );
    }
  }
  render() {
    return (
      <div className="container">
        <div className="heading">
          Employee Overtime 
        </div>
        <div className="loader-container">
          <BarLoader
            color={'#444'} 
            loading={this.state.loading} 
          />
        </div>
        <div className="display-card"> {this.renderForm()}</div>
       
      </div>
    );
  }
}

export default Orders;