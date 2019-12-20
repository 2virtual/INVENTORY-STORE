import React, { Component } from 'react';
import HomeTable from './HomeTableIndex';
import '../index.css'

class Home extends Component {
  render() {
    return (
      <div className="container">
        <div className="heading">
          {/* Home */}
        </div>
        <div className="content">
          <HomeTable />
        </div>
      </div>
    );
  }
}

export default Home;