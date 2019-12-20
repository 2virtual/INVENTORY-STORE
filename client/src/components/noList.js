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
  return numberofPresentAttendances < 1  ;
});
 return (
    <div className="display-card">
   <h3>You have {list.length} redundant worker on your payroll</h3>
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