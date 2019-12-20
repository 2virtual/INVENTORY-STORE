import React, { Component } from 'react';
import{Container} from 'react-bootstrap';
import SideDrawer from './SideDrawer'





export default class AppName2 extends Component {
    render() {
        return (
            <Container className="App-header">
             <div className="jumbotron"></div>
                      <br/>
                      <div class="shadow-lg p-3 mb-5 bg-white rounded"></div>
                      <SideDrawer/>
                      </Container>
        )
    }
}
