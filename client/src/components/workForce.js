import React, { Component } from 'react'
import {connect} from 'react-redux';
import {getWorkForce} from '../actions/workForceAction';
import PropTypes from 'prop-types';

 class WorkForce extends Component {

  
   componentWillMount(){
    this.props.getWorkForce();
  }

  render() {
    const{data}=this.props.workForce
    return (
     
   
    
      <div>
   <h3>{data}</h3>

   </div>
  
    )
  }
}
WorkForce.propTypes ={
    getWorkForce:PropTypes.func.isRequired,
    workForce:PropTypes.object.isRequired
}
const mapStateToprops=(state)=>({
workForce: state.workForce
});

export default connect(mapStateToprops,
    {getWorkForce})(WorkForce)
