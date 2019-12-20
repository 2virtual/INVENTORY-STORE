import React, { Component } from 'react';
import{Collapse,Media} from 'react-bootstrap';
import HomeTableIndex from './HomeTableIndex';
import EmployeeTable from './EmployeeTable';




 class ViewStatus extends Component {
constructor(props, context) {
    super(props, context);

    this.state = {
      open: false,
      utc:new Date().toJSON().slice(0,10).replace(/-/g,'/')
    };
  }

  render() {
   
    const { open } = this.state;
   
    return (
      <>
<button 
type="button" 
onClick={() => this.setState({ open: !open })}
aria-controls="example-collapse-text"
aria-expanded={open}
class="btn btn-primary btn-lg btn-block">
           {open === false? `Open attendance register `: `Close attendance register`} 
</button>
        <Collapse in={open}>
          <div id="example-collapse-text">
         <Media>
         
    <Media.Body>
    <br/>
    <br/>
    <HomeTableIndex/>
    <EmployeeTable/>
    
    
    <br/>
    

    </Media.Body>
         </Media>
          </div>
        </Collapse>
      </>
    );
  }
}

export default ViewStatus;