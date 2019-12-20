import React, { Component } from 'react'

import Womanimg from './img/asset_woman.png';


import {Container,Row,Col} from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import { Link } from "react-router-dom";
import styled, {css} from 'styled-components';
import ShowTiles from '../../MenuPath/ShowTiles'
import GoogleSignIn from '../../GoogleButton';





 





const JoinButton3 = styled.button`
    font-size: 14px;
    letter-spacing: 1.9px;
    font-weight: 100;
    margin: 0.5em 0.5em 0.5em 1.7em;
    padding: 16px 1.5em;
    color: white;
    background-color: #e50914;
    cursor: pointer;
    text-decoration: none;
    vertical-align: middle;
    font-family: Arial, sans-serif;
    border-radius: 2px;
    user-select: none;
    text-align: center;
    border: 0;

    &:hover {
        background-color: #E53935;
    }

    ${props => props.column && css`
        /* display: block; */
        flex-basis: 0;
        flex-grow: 1;
        flex-shrink: 1;
    `}

    ${props => props.narrow && css`
        flex: none;
    `}
`;






export default class Landing extends Component {
    render() {
        return (
            
             <Container>
  <Row>
    <Col xs={6} md={4}>
    <ShowTiles/>
    </Col>
    <Col xs={6} md={6}>
        <div className="img-woman">
      <Image src={Womanimg} rounded  />
      </div>
    </Col>
    
  </Row>

  <Row>
  <Col>
  <h1 style={{fontSize :"100px"}}>WORKAMAN{""}<h5  class="font-italic">the art of smart work...
  </h5></h1>
  </Col>
  </Row>
  <Link to="/register">
     <JoinButton3 type="button">
          REGISTER TO MANAGE YOUR EMPLOYEE
     </JoinButton3>
 </Link>
                   
                    <Link to="/login">
     <JoinButton3 type="button">
          ALREADY HAVE AN ACTIVE ACCOUNT
     </JoinButton3>
 </Link><GoogleSignIn/>


</Container>
        )
    }
}
