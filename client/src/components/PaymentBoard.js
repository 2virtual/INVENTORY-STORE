import React, { Component } from 'react';
import axios from 'axios';
// import { Table, Column, Cell } from 'fixed-data-table';
import { BarLoader } from 'react-spinners';
import Button from '../components/common/Button/ButtonIndex';
import TextBox from '../components/common/TextBox/TextBoxIndex';
import {connect} from 'react-redux';
import {getStats} from '../actions/statAction';
import PropTypes from 'prop-types';
import Overtime from '@material-ui/icons/AccessTimeTwoTone';
import { Link } from 'react-router-dom';


class PaymentBoard extends Component {
  constructor(props){
    super(props);

    this.state = {
      departmentFilter: "",
      data: [],
      currentPage: 1,
      totalPage: 1,
      limitPage: 10,
      shownCount: 0,
      totalCount: 0,
      loading: true
    };

    this.onFilterChange = this.onFilterChange.bind(this);
    this.handleOvertimeChange = this.handleOvertimeChange.bind(this);
    
   
    
  }

  componentWillMount(){
   // fetching numberOfAttendances 
this.props.getStats();

    // fetch data from an API here 
    if(!this.state.data.length){
      axios.get('/api/v1/employee/attendance')
     
      .then(
        (res) => {    
          this.setState( { data: res.data});
          this.setState( { currentPage: 1 })
          this.setState( { totalPage: Math.ceil(res.data.length / this.state.limitPage) })
          this.setState( { loading: false} );
          this.setState( { numberofPresentAttendances: false} );

        }, 
        (err) => {
          alert('An error occured! Try refreshing the page.', err);
        }
      );
    }
  }
  handleOvertimeChange = (row) => (event) => {
    this.setState({ totalWages: event.target.value});
  }
  submitForm(){
    var { overtime} = this.state;
    var employee = {
      overtime
    };
    axios.post('/api/employee/add', employee)
    .then(
      (res) => {
        alert('overtime hours successfully added!');
       
      },
      (err) => {
        alert('An error occured! Try adding overtime hours again.', err);
      }
    );
  }

  onFilterChange(event){
    var newFilter = event.target.value.toLowerCase();
    this.setState( { departmentFilter: newFilter });
    this.setState( { currentPage: 1 });
  }

  decreasePage(){
    var currentPage = this.state.currentPage;
    currentPage--;
    if(currentPage > 0){
      this.setState( { currentPage: currentPage });
    }
  }

  increasePage(){
    var currentPage = this.state.currentPage;
    currentPage++;
    if(currentPage <= this.state.totalPage){
      this.setState( { currentPage: currentPage });
    }
  }

resetOvertime=()=>{
  
  axios.put().then(()=>console.log('Overtime Reset Successful'))
  .catch(err=>console.log(err))
}

  renderData(){
    var filtered = [];

    filtered = this.state.data.map( (row, i) => {
      if(row.department.toLowerCase().indexOf(this.state.departmentFilter) === -1){
        return (
          <tr key={"employeeData"+i}>
            <td>{i+1}</td>
            <td>{row.joinDate}</td>
            <td>{row.name}</td>
            <td>{row.numberofPresentAttendances}</td>
            <td>{row.department}</td>
            <td>{row.wages}</td>
            <td>{row.overtime}</td>
            <td>{row.totalWages}</td>
            <td>{ row.numberofPresentAttendances * row.wages* 8}</td>
           
        
            <td>
              <Button className="btn btn-info">Edit</Button>
             
            </td>
          </tr>
        );
      } else {
        return undefined;
      }
    });
    

    filtered = filtered.filter((row) => row !== undefined);
    if(filtered.length > 0) {
      if(filtered.length > this.state.limitPage){
        var totalCount = filtered.length;
        this.setState( { totalCount: totalCount} );
        var lowerBound = (this.state.currentPage-1) * this.state.limitPage;
        var upperBound = (this.state.currentPage) * this.state.limitPage;
        console.log("getting from index", lowerBound, "to", lowerBound+this.state.limitPage);
        filtered = filtered.slice(lowerBound, upperBound);
      }
      var shownCount = filtered.length;
      this.setState( { shownCount: shownCount} );
      return filtered;
    } else {
      return (
        <tr>
          <td colSpan="6"><em>No overtime found</em></td>
        </tr>
      )
    }
  }

  renderTable() {
   
  
    var totalCount = 0;
    var shownCount = 0;
    var lowerBound = 0;
    var upperBound = 0;
    var filtered = [];

    filtered = this.state.data.map( (row, i,) => {
      if(row.department.toLowerCase().indexOf(this.state.departmentFilter) > -1){
        return (
          <tr key={"employeeData"+i}>
            <td>{i+1}</td>
           
            <td>{row.name}</td>
            <td>{row.numberofPresentAttendances}</td>
            <td>{row.department}</td>
            <td>{row.wages}</td>
            
            <td>
            <Link to={"/employee/overtime/"+row._id}>
                <Button className="btn btn-light"><Overtime/></Button>
              </Link>
             
            </td>
            <td>{row.overtime}</td>
            <td>{row.totalWages}</td>
            <td>{row.overtime<1? row.numberofPresentAttendances * row.wages* 8
            : row.numberofPresentAttendances * [row.wages* 8]+[row.wages*1.5]*row.overtime}</td>
           


            <td>
        
           
            </td>
          </tr>
        );
      } else {
        return undefined;
      }

    });
   
    var filteredTotalPage = this.state.totalPage;
    var filteredCurrentPage = this.state.currentPage;
    filtered = filtered.filter((row) => row !== undefined);
    totalCount = filtered.length;
    if(filtered.length > 0) {
      if(filtered.length > this.state.limitPage){
        lowerBound = (this.state.currentPage-1) * this.state.limitPage;
        upperBound = (this.state.currentPage) * this.state.limitPage;
        // console.log("getting from index", lowerBound, "to", lowerBound+this.state.limitPage);
        filtered = filtered.slice(lowerBound, upperBound);
      }
      filteredTotalPage = Math.ceil(totalCount / this.state.limitPage)
      shownCount = filtered.length;
      // return filtered;
    } else {
      filteredTotalPage = 1;
      filteredCurrentPage = 1;
      filtered = (
        <tr>
          <td colSpan="6"><em>No employee present for work </em></td>
        </tr>
      );
    }

    if(this.state.currentPage > filteredTotalPage) filteredCurrentPage = filteredTotalPage;

    var buttonIncrease = <Button className="btn" onClick={() => this.increasePage()}>&gt;</Button>;
    var buttonDecrease = <Button className="btn" onClick={() => this.decreasePage()}>&lt;</Button>;
    

    if(!this.state.loading)
      return (
        <div className="container">
          <div className="table-controls">
            
           
            <TextBox placeholder="filter by department..." onChange={this.onFilterChange} value={this.state.departmentFilter}/>
          </div>
          <div className="table-pagination">
            <div className="results">
              Showing {lowerBound+1}-{shownCount ? (lowerBound+shownCount) : 1} result from {totalCount} total results
            </div>
            <div className="pagination-buttons">
              {(this.state.currentPage > 1) ? buttonDecrease : ""}
              Page {filteredCurrentPage || this.state.currentPage} of { filteredTotalPage || this.state.totalPage}
              {(this.state.currentPage < filteredTotalPage) ? buttonIncrease : ""}
            </div>
          </div>
          <table className="employee-table">
            <tbody>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Attendance in the last 7days</th>
              <th>Department</th>
              <th>Wage/hr</th>
              <th>Overtime Adder</th>
              <th>Overtime</th>
              <th></th>
              <th>Total Wages</th>
              <th></th>
            
             
              
           <th></th>
             
            </tr>
            { filtered }
            </tbody>
          </table>
        </div>
      );
  }

  render() {
    return (
      <div className="main-container">
        <div className="heading">
          Employee Wages Calculator
        </div>
        
        <div className="loader-container">
          <BarLoader
            color={'#444'} 
            loading={this.state.loading} 
          />
          <div>
        
      </div>
        </div>
        <Button onClick={this.resetOvertime()} className="btn btn-success"><Overtime/></Button>
        {this.renderTable()}
      </div>
      
    );
  }
}

PaymentBoard.propTypes ={
  getStats:PropTypes.func.isRequired,
  stats:PropTypes.object.isRequired,
   getWorkForce:PropTypes.func.isRequired,
    workForce:PropTypes.object.isRequired,
}
const mapStateToprops=(state)=>({
stats: state.stats,
workForce: state.workForce,

});

export default connect(mapStateToprops,
  {getStats})(PaymentBoard)
