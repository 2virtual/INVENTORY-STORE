import React, { Component } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom'

const TileWrapper = styled.div`
  background: #fff;
  max-width: 500px;
  margin: 2rem auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  transform: ${props => `scale(${props.scale})`};
`;

export default class Tiles extends Component {
    
  render() {
    const { scale } = this.props;
    return (
      <TileWrapper scale={scale}>
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">
                <Link to="/register">
                  FREE EMPLOYEE MANAGEMENT SUITE
                  </Link>
                </h5>
                <p className="card-text">
                    Manage wages,attendance on the go
                </p>
            </div>
        </div>
        <div className="card">
        <div className="card-body">
        <h5 className="card-title">GET HIRED IN MINUTES</h5><p className="card-text">
                    Get hired without a resume
                </p></div>
            </div>
        <div className="card">
        <div className="card-body">
        <h5 className="card-title">COMPARE COST OF SERVICES</h5><p className="card-text">
                    Get the best cost of services closest to you
                </p></div>
            </div>
      </TileWrapper>
    );
  }
}