import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getStats} from '../actions/statAction';


import PropTypes from 'prop-types';

 class NoticeBoard extends Component {
 

// initialising data fetching from API
 componentWillMount(){

this.props.getStats();
  }


  render() {
    const{ displayStatsData }=this.props.stats
// get all attendances with male >= 2
const list= displayStatsData.filter(({ numberofPresentAttendances }) => {
  return numberofPresentAttendances  > 1 && numberofPresentAttendances <=2 ;
});

 return (
  <div className="card">
  <div className="card-body">
   <bold><h1 class="card-title">Notice Board</h1></bold> 
  
    <p class="card-text">
  <h5>You have {list.length} redundant worker on your payroll</h5>
    </p>
      <h6 class="card-subtitle mb-2 text-muted">Record is based on the last 7 days</h6>
    <ul>
  
      {list.map(({ name,_id, numberofPresentAttendances}) => {
        return (
          <div key={_id}>
            <br />
            <hr />
            <li>{name}</li>
        
            
        
          </div>
          
        )
      })}
  </ul>
  <hr/>
<h1>Action</h1>
    <a href="#!" class="card-link">FIRE WORKER</a>
    <a href="#!" class="card-link">HIRE WORKER</a>
    <a href="#!" class="card-link">PRINT PAGE</a>
  </div>
</div>
);
 }

 
}
NoticeBoard.propTypes ={
    getStats:PropTypes.func.isRequired,
    stats:PropTypes.object.isRequired,
     
}
const mapStateToprops=(state)=>({
stats: state.stats,


});

export default connect(mapStateToprops,
    {getStats})(NoticeBoard)