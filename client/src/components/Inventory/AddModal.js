import React, { Component } from 'react';
import{Button,Collapse,Media} from 'react-bootstrap';
import InsertItem from './InventoryInsertForm';

 class AddModal extends Component {
constructor(props, context) {
    super(props, context);

    this.state = {
      open: false,
    };
  }

  render() {
    const { open } = this.state;
    return (
      <>
        <Button variant="danger"
                className="item-details-button"

          onClick={() => this.setState({ open: !open })}
          aria-controls="example-collapse-text"
          aria-expanded={open}
        >
         {open === false? `ADD NEW ITEM STOCK  `: `CLOSE `} 
              

        </Button>
        <Collapse in={open}>
          <div id="example-collapse-text">
         <Media>
         
    <Media.Body>
		<br/>
    
    <InsertItem/>
    
    </Media.Body>
         </Media>
          </div>
        </Collapse>
      </>
    );
  }
}

export default AddModal