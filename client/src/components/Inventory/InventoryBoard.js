import React, { Component } from 'react';
import axios from 'axios';
// import { Table, Column, Cell } from 'fixed-data-table';
import { BarLoader } from 'react-spinners';
import AddModal from './AddModal';
import Button from '../../components/common/Button/ButtonIndex';
import TextBox from '../../components/common/TextBox/TextBoxIndex';
import Delete from '@material-ui/icons/DeleteTwoTone';
import Create from '@material-ui/icons/Create';
import { Link } from 'react-router-dom';


class InventoryBoard extends Component {
  constructor(props){
    super(props);

    this.state = {
      descriptionFilter: "",
      data: [],
      currentPage: 1,
      totalPage: 1,
      limitPage: 10,
      shownCount: 0,
      totalCount: 0,
      loading: true,
       count: 1
    };

    this.onFilterChange = this.onFilterChange.bind(this);
  }

  componentWillMount(){
    // fetch data from an API here 
    if(!this.state.data.length){
      axios.get('api/v1/inventory')
      
      .then(
        (res) => {    
          this.setState( { data: res.data} );
          this.setState( { currentPage: 1 })
          this.setState( { totalPage: Math.ceil(res.data.length / this.state.limitPage) })
          this.setState( { loading: false} );
        }, 
        (err) => {
          alert('An error occured! Try refreshing the page.', err);
        }
      );
    }
  }

  onFilterChange(event){
    var newFilter = event.target.value.toLowerCase();
    this.setState( { descriptionFilter: newFilter });
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
  deleteInventory(index){
    // delete data to API here
    axios.get("/api/inventory/delete/"+this.state.data[index]._id)
    .then(
      (res) => {    
        alert('Deleted successfully!');
        var temp = this.state.data;
        temp.splice(index, 1);
        this.setState( { data: temp });
      }, 
      (err) => {
        alert('An error occured! Try again.', err);
      }
    );
  }
  IncrementInventory(index){
    // Increment 
    axios.get("/api/v1/inc/inventory/"+this.state.data[index]._id)
    .then(
      (res) => {    
        alert('Deleted successfully!');
        var temp = this.state.data;
        temp.splice(index, 1);
        this.setState( { data: temp });
      }, 
      (err) => {
        alert('An error occured! Try again.', err);
      }
    );
  }

  

  renderData(){
    var filtered = [];

    filtered = this.state.data.map( (row, i) => {
      if(row.description.toLowerCase().indexOf(this.state.descriptionFilter) > -1){
        return (
          <tr key={"InventoryData"+i}>
            <td>{i+1}</td>
            <td>{row.name}</td>
            <td>{row.supplier}</td>
            <td>{row.price}</td>
            <td>{row.quantity}</td>
            <td>{row.updatedAt}</td>
            <td>{row.taxable}</td>
         
            <td>
              <Button className="btn btn-info">Edit</Button>
              <Button onClick={() => this.deleteInventory(i)} className="btn btn-danger">Delete</Button>
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
          <td colSpan="6"><em>No product found</em></td>
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

    filtered = this.state.data.map( (row, i) => {
      if(row.description.toLowerCase().indexOf(this.state.descriptionFilter) > -1){
        return (
          <tr key={"inventoryData"+i}>
            <td>{i+1}</td>
        
            <td>{row.name}</td>
            <td>{row.description}</td>
            <td>{row.supplier}</td>
            <td>{row.price}</td>
            <td>{row.quantity}</td>
            <td>{row.updatedAt}</td>
            <td>{row.taxable}</td>
            <td></td>
            
          
            <td>
              <Link to={"/inventory/edit/"+row._id}>
                <Button className="btn btn-light"><Create/></Button>
              </Link>
              <Button onClick={() => this.deleteInventory(i)} class="btn btn-light"><Delete/></Button>
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
          <td colSpan="6"><em>No product found</em></td>
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
            
           
            <TextBox placeholder="filter by description..." onChange={this.onFilterChange} value={this.state.departmentFilter}/>
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
              <th>Product Name</th>
              <th>Product Description</th>
              <th>Supplier Detail</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Date modified </th>
              <th></th>
             <th>Action</th>
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
        <div className="loader-container">
          <BarLoader
            color={'#444'} 
            loading={this.state.loading} 
          />
          <div>
        
      </div>
        </div>
        <div><AddModal/></div>
        {this.renderTable()}
      </div>
      
    );
  }
}

export default InventoryBoard;
