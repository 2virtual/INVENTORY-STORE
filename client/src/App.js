import React, { Component } from "react";
import "./App.css";

import {BrowserRouter as Router, Route} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import InventoryIndex from './components/Inventory/inventoryIndex';
import InventoryUpdateForm from './components/Inventory/InventoryUpdateForm';



class App extends Component {
  
  render() {
  
    return (
      <div className="App" >
    

          <Router>
  
          <Route exact path="/" component={InventoryIndex} />
          <Route exact path="/inventory/edit/:_id" component={InventoryUpdateForm} />
        
       </Router>
      
    </div>
      
    );
  }
}
export default App;