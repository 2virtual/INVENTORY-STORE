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
    <div>
   <h3>{list.length}</h3>
  
  </div>
);
  }
}
NoticeBoard.propTypes ={
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
    {getStats})(NoticeBoard)
