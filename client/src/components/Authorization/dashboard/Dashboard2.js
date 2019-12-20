import React, { Component } from 'react'
import ViewStatus from '../../../components/ViewStatus';
import { Container,Col,Row } from 'react-bootstrap';
import WeekNum from '../../../components/ShowDate';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authAction";
import {Link} from 'react-router-dom';
import AppName2 from '../../AppName2';
import WorkForce from '../../workForce';
import RedundantNos  from  '../../RedundantNos';
import GhostWorker from '../../GhostWorker'




 class FormInput extends Component {
 state={

  hour:null,
  
 }

 componentDidMount(){
   this.getHour()
 }

 getHour=()=>{
   const date = new Date();
   const hour = date.getHours();
   this.setState({
     hour
   })
 }

 greetUser(){
  const { user } = this.props.auth;
  const {hour}=this.state;
if(hour < 12){
  return `Good morning ${user.name.split(" ")[0]}`
} if (hour < 17){
  return `Good afternoon ${user.name.split(" ")[0]}`
} return `Good evening ${user.name.split(" ")[0]}`
 }
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
      };
    render() {
       
        
        return (
            <Container classMame=" purchase-card">
              

           <AppName2/>
               <br/>
                   <div><ViewStatus/></div>
                <Row>
                    <Col> <WeekNum/></Col>
                    <Col xs={5}><div class="card">
  <h3 class="card-header"><h4>
    <h3>
    {this.greetUser()}
    </h3>  
              <p className="flow-text grey-text text-darken-1">
                You are logged into your account{" "}<br/>
                
                
              </p>
            </h4></h3>
  <div className="card-body">
  <p class="font-weight-normal">Here are some quick stats</p>
<table class="table table-reflow" className="table-info">
  <thead>
    <tr>
      <th></th>
      <th>Total work force</th>
      <th>Redundant workers</th>
      <th>Ghost workers</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td><WorkForce/></td>
      <td><RedundantNos/></td>
      <td><GhostWorker/></td>
    </tr>
   
   
  </tbody>
</table>
<Link to="/notice">
    <a href="#!" class="btn btn-primary">View complete records</a>{" "}
    </Link>
    <button
              style={{
                width: "150px",
                height:'36px',
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
                marginBottom: "1rem",
                color:'white'
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
            <hr/>
  </div>
</div></Col></Row>
<br/>

<br/>



</Container>
            
        )
    }
}
FormInput.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
  )(FormInput);
